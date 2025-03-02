import heart from '../assets/icones/heart/Path Copy 2@1,5x.svg';

function Card(){
    const name = 'Homem Aranha'
    const img = 'https://www.nerdsite.com.br/wp-content/uploads'

    return(
        <div className="card">
            <img src={img} alt="" />
            <div>
                <p>{name}</p>
                <img src={heart} alt="Favoritar" />
            </div>
        </div>
    )
}

export default Card