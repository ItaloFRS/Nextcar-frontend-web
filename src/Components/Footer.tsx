import "../CSS/Footer.css"

import { AiFillInstagram , AiFillFacebook } from "react-icons/ai";
import { FaYoutube , FaWhatsapp } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="footer">
        <div className="footer-cont">

            <div className="footer-social">
                <img src="src\assets\Logo-Dark.png" alt="Logo da NextCar" />
                <h3>Qualidade, Segurança, Transparência.</h3>
                <div className="footer-icons">
                    <a href=""><AiFillInstagram /></a>
                    <a href=""><AiFillFacebook /></a>
                    <a href=""><FaYoutube /></a>
                    <a href=""><FaWhatsapp /></a>
                </div>
            </div>

            <div className="footer-contato">

                <h2>Contato</h2>
                <p>contato@nextcar.com</p>
                <p>(83) 99999-9999</p>

            </div>
            
            <div className="footer-inscreva-se">
                <h2>Inscreva-se</h2>
                <p>Informe seu email para receber as últimas novidades da NextCar.</p>
                <form>
                    <input type="email" name="Email" placeholder='Email' />
                    <button className='button'>
                        <FaArrowRight/>
                    </button>
                </form>
            </div>
        </div>
        
        <div className="Copyright">
            <p>© 2025 NextCar. Todos os direitos reservados.</p>
        </div>
    </div>
  )
}

export default Footer