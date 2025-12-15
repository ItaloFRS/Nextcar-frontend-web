import type { JSX } from 'react';
import { Navigate } from 'react-router-dom';

// Defina a tipagem para as props (já que você está usando TypeScript)
interface RotaProtegidaProps {
  children: JSX.Element;
}

export const RotaProtegida = ({ children }: RotaProtegidaProps) => {
  // LÓGICA DE AUTENTICAÇÃO
  // Aqui você deve verificar se o usuário está logado.
  // Pode vir do sessionStorage, Context API, Redux, etc.
  const usuarioEstaLogado = sessionStorage.getItem('token'); // Exemplo simples verificando token

  if (!usuarioEstaLogado) {
    // Se não estiver logado, redireciona para /login
    // O 'replace' evita que o usuário volte para esta rota ao clicar em "Voltar" no navegador
    return <Navigate to="/login" replace />;
  }

  // Se estiver logado, renderiza o componente filho (a página Anuncie)
  return children;
};