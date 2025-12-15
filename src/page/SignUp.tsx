/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../CSS/Auth.css'
import '../CSS/SingUp.css'

export const SignUp = () => {
  const navigation = useNavigate();

  // 1. Estados para armazenar os dados do formulário
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER"); // Valor padrão: Usuário comum

  const sendRequest = async (e: any) => {
    e.preventDefault();

    // Validação básica
    if(!login || !password) {
        alert("Preencha todos os campos!");
        return;
    }

    try {
      // 2. Chamada para a API (Endpoint /auth/register)
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // O corpo deve bater com o RegisterDTO do Java
        body: JSON.stringify({
          login: login,
          password: password,
          role: role 
        }),
      });

      // 3. Verificação da resposta
      if (response.ok) {
        alert("Conta criada com sucesso!");
        navigation('/login'); // Redireciona para o login após cadastro
      } else {
        // Se der erro (ex: 400 Bad Request se o usuário já existe)
        alert("Erro ao criar conta. Verifique se o email já está em uso.");
      }

    } catch (error) {
      console.error("Erro:", error);
      alert("Erro de conexão com o servidor.");
    }
  }

  return (
    <div className="bg page-login">
      <div className="login-conteiner">
        
        <div className="form-left">
          <div className="video-container">
            <div className="overlay-l"></div>
            <video autoPlay muted loop playsInline className="video-bg" id="myVideo">
              <source src="src/assets/Auth_.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        <div className="form-box efeito-vidro">
          <form onSubmit={sendRequest} className="form">
            <span className="title">Cadastro</span>
            <span className="subtitle">Crie sua conta.</span>
            
            <div className="form-container">
              {/* Input de Email */}
              <input 
                type="email" 
                className="input" 
                placeholder="Email" 
                required 
                value={login} 
                onChange={(e) => setLogin(e.target.value)}
              />

              {/* Input de Senha */}
              <input 
                type="password" 
                className="input" 
                placeholder="Password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* Seleção de Role (Permissão) */}
              <div className="radio-inputs">
                <label className="radio">
                  <input 
                    name="role-selection" // O 'name' deve ser igual para agrupar os radios
                    type="radio" 
                    value="USER"
                    checked={role === "USER"}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <span className="name">Usuario</span>
                </label>
                
                <label className="radio">
                  <input 
                    name="role-selection" 
                    type="radio" 
                    value="ADMIN"
                    checked={role === "ADMIN"}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <span className="name">Administrador</span>
                </label>
              </div>

            </div>
            
            <button type="submit" className="button">Cadastrar</button>
          </form>
          
          <div className="form-section">
            <p>Já tem uma conta ? <a className="hover-underline" onClick={() => navigation('/login')}>Login</a> </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp