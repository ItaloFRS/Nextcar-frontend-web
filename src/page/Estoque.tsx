import { useEffect, useState } from "react";
import "../CSS/Estoque.css";

import Footer from "../Components/Footer";
import Procura from "../Components/Procura";
import NavBar from "../Components/NavBar";
import CardEstoque from "../Components/CardEstoque";

// Definição do tipo de dado que vem do Java
interface CarroData {
  id: string;
  marca: string;
  modelo: string;
  versao: string;
  ano: number;
  km: number;
  preco: number;
  fotoBase64: string[]; // Lista de strings Base64
}

export const Estoque = () => {
  // Estado para armazenar os carros vindos da API
  const [carros, setCarros] = useState<CarroData[]>([]);
  const [loading, setLoading] = useState(true);

  // Paginação
  const itensPorPagina = 15;
  const [paginaAtual, setPaginaAtual] = useState(1);

  // 1. Busca os dados no Backend ao carregar a página
  useEffect(() => {
    const fetchCarros = async () => {
      try {
        const response = await fetch("http://localhost:8080/carros");
        if (response.ok) {
          const data = await response.json();
          setCarros(data);
        } else {
          console.error("Erro ao buscar carros");
        }
      } catch (error) {
        console.error("Erro de conexão:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarros();
  }, []);

  // 2. Funções auxiliares de formatação (Backend -> Visual)
  const formatarPreco = (valor: number | null | undefined) => {
    if (valor === null || valor === undefined) {
      return "0,00"; // Ou "Sob Consulta" se preferir
    }
    return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const formatarKM = (valor: number | null | undefined) => {
    if (valor === null || valor === undefined) {
      return "0 KM";
    }
    return valor.toLocaleString('pt-BR') + " KM";
  };
  
  // 3. Lógica de Paginação (agora usando o estado 'carros' real)
  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const itensPagina = carros.slice(inicio, fim);
  const totalPaginas = Math.ceil(carros.length / itensPorPagina);

  return (
    <>
      <header> <NavBar /> </header>

      <main className="estoque-sec">
        <h1 className="estoque-titulo">Nosso estoque</h1>
        
        {loading ? (
          <p style={{textAlign: 'center', padding: '50px'}}>Carregando estoque...</p>
        ) : (
          <section className="estoque">
            {itensPagina.length > 0 ? (
              itensPagina.map((carro) => {
                
                // Lógica para pegar a primeira imagem ou uma padrão
                const imagemCapa = (carro.fotoBase64 && carro.fotoBase64.length > 0)
                  ? carro.fotoBase64[0] 
                  : "src/assets/Logo-Dark.png"; // Tenha uma imagem padrão na pasta public

                return (
                  <CardEstoque
                    key={carro.id}
                    marca={carro.marca}
                    modelo={`${carro.modelo} ${carro.versao}`} // Juntei modelo e versão para ficar bonito
                    ano={carro.ano.toString()}
                    km={formatarKM(carro.km)}
                    valor={formatarPreco(carro.preco)}
                    imagem={imagemCapa}
                  />
                );
              })
            ) : (
              <p style={{textAlign: 'center', width: '100%'}}>Nenhum veículo encontrado.</p>
            )}
          </section>
        )}

        {/* Paginação só aparece se tiver itens */}
        {!loading && carros.length > 0 && (
          <div className="paginacao">
            <button
              disabled={paginaAtual === 1}
              onClick={() => setPaginaAtual(paginaAtual - 1)}
            >
              {"<"}
            </button>

            {[...Array(totalPaginas)].map((_, num) => (
              <button
                key={num}
                className={paginaAtual === num + 1 ? "ativo" : ""}
                onClick={() => setPaginaAtual(num + 1)}
              >
                {num + 1}
              </button>
            ))}

            <button
              disabled={paginaAtual === totalPaginas}
              onClick={() => setPaginaAtual(paginaAtual + 1)}
            >
              {">"}
            </button>
          </div>
        )}

        <Procura />
      </main>

      <footer> <Footer /> </footer>
    </>
  );
};

export default Estoque;