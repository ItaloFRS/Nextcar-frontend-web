// Components
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'
import Procura from '../Components/Procura'

//Icons
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaWhatsapp , FaInstagram} from "react-icons/fa";

//Styles
import '../CSS/Contato.css'

const Contato = () => {
  return (
    <>
    <header> <NavBar /> </header>
    <main className='sec-contato'>
        <section className='contato'>
          <div className="contato-info">

            <h2>Contato</h2>
            <button className='button'><FaPhone className="icon-btn" />  Fale conosco</button>
            <button className='button'><MdEmail className="icon-btn" />  Enviar um email</button>
            <button className='button'><FaWhatsapp className="icon-btn" />  WhatsApp</button>
            <button className='button'><FaInstagram className="icon-btn" />  Instagram</button>

          </div>

          <div className="contato-img">
            <img src="public/BMW M2.SVG" alt="" />
          </div>
        </section>

        <Procura />
        
    </main>
    <footer> <Footer /> </footer>
    </>
  )
}

export default Contato