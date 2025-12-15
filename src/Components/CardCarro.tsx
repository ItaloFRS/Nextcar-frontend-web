import React from 'react';
import '../CSS/CardCarro.css'; // Vamos criar esse CSS no passo 2
import { useNavigate } from 'react-router-dom';

interface CardCarroProps {
  nome: string;
  imagem: string;
  icone?: React.ReactNode; 
}

const CardCarro: React.FC<CardCarroProps> = ({ nome, imagem, icone }) => {

  const navigation = useNavigate();

  return (
    <button onClick={() => navigation('/estoque')} className="card-carro">
      <img src={imagem} alt={nome} className="card-img" />
      
      <div className="card-overlay"></div>

      <div className="card-content">
        <span className="card-title">{nome}</span>
        
        {/* Se o ícone foi passado, mostre ele dentro de um span para alinhar */}
        {icone && <span className="card-icon-slot">{icone}</span>}
      </div>
    </button>
  );
};

export default CardCarro;