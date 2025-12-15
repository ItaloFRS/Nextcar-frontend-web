import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';
import '../CSS/Anuncie.css';

const Anuncie = () => {
  const navigate = useNavigate();

  const [dados, setDados] = useState({
    marca: '',
    modelo: '',
    versao: '',
    ano: '',
    km: '',
    preco: '',
    nomeVendedor: '',
    telefoneProprietario: '',
    emailProprietario: ''
  });

  const [fotosBase64, setFotosBase64] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const emailSalvo = sessionStorage.getItem('user_login');
    if (emailSalvo) {
      setDados(prev => ({ ...prev, emailProprietario: emailSalvo }));
    }
  }, []);

  // --- FUNÇÕES DE FORMATAÇÃO ---
  const formatarMoeda = (valor: string) => {
    if (!valor) return "";
    const apenasNumeros = valor.replace(/\D/g, "");
    const numero = Number(apenasNumeros) / 100;
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(numero);
  };

  const formatarKM = (valor: string) => {
    if (!valor) return "";
    const apenasNumeros = valor.replace(/\D/g, "");
    return new Intl.NumberFormat('pt-BR').format(Number(apenasNumeros));
  };
  // -----------------------------

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let novoValor = value;

    // Lógica condicional de formatação
    if (name === 'preco') {
      novoValor = formatarMoeda(value);
    } else if (name === 'km') {
      novoValor = formatarKM(value);
    }

    setDados(prev => ({ ...prev, [name]: novoValor }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const arquivos = Array.from(e.target.files);
      if (arquivos.length + fotosBase64.length > 5) {
        alert("Você pode enviar no máximo 5 fotos.");
        return;
      }
      arquivos.forEach(arquivo => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          setFotosBase64(prev => [...prev, base64String]);
        };
        reader.readAsDataURL(arquivo);
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = sessionStorage.getItem('token');
    if (!token) {
      alert("Sessão expirada. Faça login novamente.");
      navigate('/login');
      return;
    }

    // Função simples para limpar qualquer coisa que não seja número
    const limparFormatacao = (val: string) => val.replace(/\D/g, "");

    // Monta o objeto final para o Java
    const payload = {
      marca: dados.marca,
      modelo: dados.modelo,
      versao: dados.versao,
      ano: parseInt(dados.ano),
      
      // Limpa a formatação antes de converter para número
      km: parseInt(limparFormatacao(dados.km)), 
      
      // Limpa a formatação (vira centavos) e divide por 100 para voltar a decimal
      preco: parseFloat(limparFormatacao(dados.preco)) / 100,
      
      nomeVendedor: dados.nomeVendedor,
      telefoneContato: dados.telefoneProprietario,
      emailContato: dados.emailProprietario,
      fotoBase64: fotosBase64 
    };

    try {
      const response = await fetch('http://localhost:8080/carros', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert("Anúncio cadastrado com sucesso!");
        navigate('/estoque');
      } else {
        alert("Erro ao salvar. Verifique os dados.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro de conexão.");
    } finally {
      setLoading(false);
    }
  };

  const removerFoto = (index: number) => {
    setFotosBase64(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <header> <NavBar /> </header>
      <main className='main-anuncie'>
        <section className='anuncie'>
          <div className="anuncie-info">
            <h1>Anuncie seu veículo</h1>
            <p>Preencha os dados abaixo.</p>
          </div>

          <form onSubmit={handleSubmit} className="form-completo">
            <h2>Dados do veículo</h2>
            <div className='form-dados-veiculo'>
              <input type="text" name="marca" placeholder='Marca' required onChange={handleChange} value={dados.marca}/>
              <input type="text" name="modelo" placeholder='Modelo' required onChange={handleChange} value={dados.modelo}/>
              <input type="text" name="versao" placeholder='Versão' required onChange={handleChange} value={dados.versao}/>
              <input type="number" name="ano" placeholder='Ano' required onChange={handleChange} value={dados.ano}/>
              
              {/* Mudei o type para text para permitir pontos */}
              <input 
                type="text" 
                name="km" 
                placeholder='KM' 
                required 
                onChange={handleChange} 
                value={dados.km} 
                maxLength={10}
              />
              
              {/* Mudei o type para text para permitir R$, vírgula e pontos */}
              <input 
                type="text" 
                name="preco" 
                placeholder='Valor (R$)' 
                required 
                onChange={handleChange} 
                value={dados.preco}
              />
            </div>
            {/* ... Restante do form igual ... */}
             <h2>Dados de Contato</h2>
            <div className="form-dados-pessoais">
              <input type="text" name="nomeVendedor" placeholder='Nome' required onChange={handleChange} value={dados.nomeVendedor} />
              <input type="tel" name="telefoneProprietario" placeholder='Telefone / WhatsApp' required onChange={handleChange} value={dados.telefoneProprietario} />
              <input type="email" name="emailProprietario" value={dados.emailProprietario} disabled className="input-disabled" />
            </div>

            <h2>Fotos do veículo (Máx: 5)</h2>
            <div className="form-fotos">
              <input className="input-fotos" type="file" accept="image/*" multiple onChange={handleFileChange} disabled={fotosBase64.length >= 5} />
              <div className="preview-fotos" style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}>
                {fotosBase64.map((foto, index) => (
                  <div key={index} style={{ position: 'relative' }}>
                    <img src={foto} alt="preview" style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                    <button type="button" onClick={() => removerFoto(index)} style={{ position: 'absolute', top: -5, right: -5, background: 'red', color: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', fontSize: '12px' }}>X</button>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '0.8rem', color: '#666' }}>{fotosBase64.length} / 5 fotos selecionadas</p>
              <button type="submit" className='button btn-anunciar' disabled={loading}>{loading ? 'Enviando...' : 'Enviar anúncio'}</button>
            </div>
          </form>
        </section>
      </main>
      <footer> <Footer /> </footer>
    </>
  );
}

export default Anuncie;