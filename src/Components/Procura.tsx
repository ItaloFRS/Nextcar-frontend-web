
import "../CSS/Procura.css"

const Procura = () => {
  return (
    <section className='procurar'>
        <h2>Você está procurando <br /> algum modelo em específico?</h2>
        <p>Deixe seu contato para que a nossa equipe entre em contato com você!</p>

        <form>
            <input type="text" placeholder='Modelo'/>
            <input type="text"placeholder='Ano'/>
            <input type="email" id= "email-procura" placeholder="Email" />
            <input type="text" id="numero-procura" placeholder="Número"/>
            <button type="submit" className='button'>Enviar</button>
        </form>
    </section>
  )
}

export default Procura