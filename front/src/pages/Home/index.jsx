import { useState } from 'react'
import SuperHeroIcon from '../../assets/icones/heroi/SuperHeroIcon.png'
import toggle from '../../assets/toggle/btn.svg'
import '../../App.css'
import Header from '../../components/header'
import heart from '../../assets/icones/heart/Path.svg'

function Home(){
    const [qtdHerois, setQtdHerois] = useState(0)
    return (
        <main>
            <Header />
    
            <section>
            <div className='F-sectionHeader'>
                <p>Encontrados {qtdHerois} heróis</p>
                
                <div className="F-section-headerFilters">
                <img src={SuperHeroIcon} alt="Icone de super herói" />
                <p>ordenar por nome - A/Z</p>
    
                <button className='F-section-headerFilters-toggle'>
                    <img src={toggle} alt="Botão de ordenar por caractere" />
                </button>
    
                <button className='F-section-headerFilters-toggle'>
                    <img src={heart} alt="Icone de coração" />
                    <p>Somente favoritos</p>
                </button>
                </div>
    
    
            </div>
            </section>
      </main>
    )
}

export default Home