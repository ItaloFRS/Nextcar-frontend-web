//import { useNavigate } from "react-router-dom";
import "../CSS/NavBar.css"
import "../CSS/Home.css"
import NavBar from "../Components/NavBar";
import Procura from "../Components/Procura";
import CardCarro from "../Components/CardCarro";
import { FaBolt, FaCheck } from "react-icons/fa";
import { GiJapan, GiMuscleUp } from "react-icons/gi";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";


export const Home: React.FC = () => {

const navigation = useNavigate();

  return (

<main className="bg">

    <NavBar />

    <section className="conteiner cont1">
      <div className="cont-destaque">

        <div className="txt-destaque">
          <h1>Qualidade, Segurança e Transparência.</h1> 
          <button onClick={() => navigation('/estoque')} className="button">Acessar estoque completo</button>
        </div>
        <div className="img-destaque"><img src="/porsche-model5 1.png" alt="" /></div>
      </div>
      
    </section> 

    <section className="cont2">
    
      <h2>Modelos</h2>
      
      <div className="btn-modelos">
        <CardCarro 
            nome="Muscle Cars" 
            imagem="/Cards/Mustang.png" 
            icone={<GiMuscleUp color="red" />} />

        <CardCarro 
            nome="JDM" 
            imagem="/Cards/R34.png" 
            icone={<GiJapan color="red" />} />

        <CardCarro 
            nome="Eletricos" 
            imagem="/Cards/seal.png" 
            icone={<FaBolt color="red" />} />  
      </div>
    </section>
  
    <Procura />

    <section className="destaque-semanal cont2">
      <h2>Destaque Semanal</h2>

      <div className="cont-destaque-semanal">
        
        <div className="img-destaque-semanal">
          <img src="/Cards/prelude.png" alt="" />
        </div>

        <div className="txt-destaque-semanal">

          <div className="txt">
            <h3>Novo Honda Prelude</h3>
            <span> Um dos grandes destaques apresentados durante no Salão do Automóvel deste ano, o Honda Prelude roubou a cena no palco da montadora japonesa. Só se falava dele. E até o principal novo produto da marca, o WR-V, acabou tendo que disputar as atenções.</span>
          </div>
          <div className="overlay"></div>
          <img src="/Cards/prelude-int.png" alt="" />
          
        </div>

      </div>

    </section>

    <section className="cont2">
    
      <h2>Ultimas vendas</h2>
      
      <div className="btn-modelos">
        <CardCarro 
            nome="RAM 1500 - 2021" 
            imagem="/Cards/RAM-1500.png" 
            icone={<FaCheck color="red" />} />

        <CardCarro 
            nome="Civic Type R - 2024" 
            imagem="/Cards/TypeR.png" 
            icone={<FaCheck color="red" />} />

        <CardCarro 
            nome="BYD Dolphin Mini - 2023" 
            imagem="/Cards/Dol-Mini.png" 
            icone={<FaCheck color="red" />} />  
      </div>
    </section>
    
    <Footer />
</main>

  )

}

export default Home