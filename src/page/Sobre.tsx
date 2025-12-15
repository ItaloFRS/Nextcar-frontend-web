//CSS
import '../CSS/Sobre.css'

//Components 
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'

function Sobre() {
  return (
    <>
    <header><NavBar /></header>

    <main>
        <div className="cont-sobre">
            <div className="div1">
                <h2>Sobre Nós</h2>
                <p>A NextCar é especializada, principalmente, na venda de veículos de luxo e superesportivos. Com Segurança, transparência e qualidade, nossos veículos são verificados e certificados para garantir ao cliente uma compra completamente segura.<br /> Oferecemos exemplares especiais e exclusivos, além de um amplo estoque renovado diariamente para oferecer a melhor experiência e um alto padrão de qualidade.<br /> Contamos com Detail Center, frota própria para entrega em todo o Brasil, além de um show room premium dedicado aos carros superesportivos, especiais, personalizados e exclusivos.<br /> A NextCar se orgulha de firmar parcerias com os melhores fornecedores, lojas e centros técnicos do mundo, para juntos desenhar uma das melhores estruturas de comércio de carros de luxo no país.</p>
            </div>
            <div className="div2">
                <img src="/Cards/Mustang.png" alt="Mustang" />
            </div>
            <div className="div3">3</div>
            <div className="div4">4</div>
            <div className="div5">5</div>
        </div>
    </main>

    <footer><Footer /></footer>
    </>
  )
}

export default Sobre