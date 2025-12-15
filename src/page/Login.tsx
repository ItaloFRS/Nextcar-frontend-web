/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import "../CSS/Auth.css";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../service/config";

export default function Login() {
  const navigation = useNavigate();

  // Estados para capturar o input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const sendRequest = async (e: any) => {
    e.preventDefault();

    // Validação simples de campos vazios
    if (!email || !password) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      // 1. Chamada para a sua API Spring Boot
  
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          login: email,
          password: password
        }),
      });

      // 2. Verifica se a resposta foi sucesso (Status 200 OK)
      if (response.ok) {
        const data = await response.json();
        
        // 3. O Java retorna LoginResponseDTO(token)
        // Salva o token vindo do backend
        sessionStorage.setItem("token", data.token);

        // 2. SALVA A ROLE
        sessionStorage.setItem("user_role", data.role);
        
        // Salvar o email para uso futuro
        sessionStorage.setItem("user_login", email);

        console.log("Login com sucesso. Role:", data.role);
        
        // Redireciona para a área logada
        navigation('/');

      } else {
        // Se der erro (ex: 403 Forbidden ou 400 Bad Request)
        alert("Login ou senha inválidos!");
      }

    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao conectar com o servidor. Verifique se o backend está rodando.");
    }
  }

  return (
    <main className="page-login">
      <section className="login-conteiner">

        <div className="form-left">
          <div className="video-container">
            <div className="overlay-l"></div>
            <video autoPlay muted loop playsInline className="video-bg" id="myVideo">
              <source src="/Auth_.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        <div className="form-box efeito-vidro">
          <form onSubmit={sendRequest} className="form">
            <span className="title">Login</span>
            <span className="subtitle">Acesse sua conta.</span>

            <div className="form-container">
              <input
                id="email-login"
                type="email"
                className="input"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                id="pass-login"
                type="password"
                className="input"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="button">Login</button>
          </form>
          <div className="form-section ">
            <p>
              Ainda não tem uma conta?{" "}
              <a className="hover-underline" onClick={() => navigation('/sign-up')}>
                Registre-se
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}