import { useState, useEffect } from 'react';
import SuperHeroIcon from '../../assets/icones/heroi/SuperHeroIcon.png';
import toggle from '../../assets/toggle/Group 2.svg';
import '../../App.css';
import Header from '../../components/header';
import heart from '../../assets/icones/heart/Path.svg';
import { getCharacters } from '../../services/api'; // Importe a função corretamente
import Card from '../../components/card.jsx'


function Home() {
    const [qtdHerois, setQtdHerois] = useState(0); // Estado para controlar a quantidade de heróis
    const [listaHerois, setHerois] = useState([]); // Estado para controlar a lista de heróis

    // UseEffect para chamar a API quando o componente for montado
    useEffect(() => {
        const fetchCharacters = async () => {
            const herois = await getCharacters();  

            setHerois(herois);  // Atualiza o estado com a lista de heróis
            setQtdHerois(herois.length);  // Atualiza o estado com a quantidade de heróis
        };

        fetchCharacters();
    }, []);

    

    return (
        <main>
            <Header />
            <section>
                <div className='F-sectionHeader'>
                    <p>Encontrados {qtdHerois} heróis</p>
                    <div className="F-section-headerFilters">
                        <img src={SuperHeroIcon} alt="Ícone de super herói" />
                        <p>ordenar por nome - A/Z</p>
                        <button className='F-section-headerFilters-toggle'>
                            <img src={toggle} alt="Botão de ordenar por caractere" />
                        </button>
                        <button className='F-section-headerFilters-toggle'>
                            <img src={heart} alt="Ícone de coração" />
                            <p>Somente favoritos</p>
                        </button>
                    </div>
                </div>

                <div className="hero-list">
                    {listaHerois.map(hero => (
                        <Card 
                            key={hero.id} 
                            id={hero.id} 
                            name={hero.name} 
                            thumbnail={hero.thumbnail} 
                        />
                    ))}
                </div>

            </section>


        <footer></footer>
        </main>
    );
}

export default Home;
