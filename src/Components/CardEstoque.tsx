import React from 'react';
import '../CSS/CardEstoque.css';
import { PiArrowSquareRightLight } from "react-icons/pi";

interface CardEstoqueProps {
  marca: string;
  modelo: string;
  ano: string;
  km: string;
  imagem: string;
  valor: string;
}

const CardEstoque: React.FC<CardEstoqueProps> = ({ imagem, marca, modelo, km, ano, valor }) => {
  return (

        <button className="card-carro-estoque">
      {/* IMAGEM */}
      <div className="card-img-wrapper">
        <img src={imagem} alt={`${marca} ${modelo}`} className="card-img" />
      </div>

      {/* TITULO + ANO + KM */}
      <div className="card-info">
        <h2 className="card-titulo">
          {marca} {modelo}
        </h2>

        <p className="card-sub">
          {ano} • {km}
        </p>
      </div>

      {/* VALOR */}
      <div className="card-preco">
        <span className="preco-prefixo">R$</span>
        <span className="preco-valor">{valor}</span>
      </div>

      {/* ÍCONE */}
      <div className="card-arrow">
        <PiArrowSquareRightLight />
      </div>
    </button>
    
  )
};

export default CardEstoque;