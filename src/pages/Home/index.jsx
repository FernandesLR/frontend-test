import { useState, useEffect } from 'react';
import SuperHeroIcon from '../../assets/icones/heroi/SuperHeroIcon.png';
import toggle from '../../assets/toggle/Group 2.svg';
import './home.css';
import Header from '../../components/header';
import heart from '../../assets/icones/heart/Path.svg';
import { getCharacters } from '../../services/api';
import Card from '../../components/card.jsx';
import { toggleFavoritos, toggleOrdenar, ordenarPorCaractere, filtrarFavoritos } from '../../utils/filtros';
import { usePaginaAnterior, useProximaPagina } from '../../utils/pagination';

const LIMIT = 20; // Número de heróis por página
const TOTAL_HEROIS = 1000; // Total de heróis na API (fixo na documentação da Marvel)

function Home() {
    const [qtdHerois, setQtdHerois] = useState(0);
    const [listaHerois, setHerois] = useState([]);
    const [favoritos, setFavoritos] = useState([]);
    const [somenteFavoritos, setSomenteFavoritos] = useState(false);
    const [mostrarSort, setMostrarSort] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [paginaAtual, setPaginaAtual] = useState(1);  // Estado da página
    const [totalPaginas, setTotalPaginas] = useState(Math.ceil(TOTAL_HEROIS / LIMIT));  // Total de páginas baseado no total fixo de heróis


    useEffect(() => {
        const fetchCharacters = async () => {
            const offset = (paginaAtual - 1) * LIMIT; // Calcular o offset com base na página atual
            const herois = await getCharacters(LIMIT, offset);  // Passa o limite e o offset para a API
            setHerois(herois);
            setQtdHerois(herois.length);
        };
        fetchCharacters();
    }, [paginaAtual]); // A dependência agora é apenas a página atual

    const heroisFiltrados = filtrarFavoritos(listaHerois, favoritos, somenteFavoritos);
    const heroisOrdenados = ordenarPorCaractere(heroisFiltrados, mostrarSort ? 'asc' : 'desc');
    const heroisPesquisados = heroisOrdenados.filter(hero =>
        hero.name.toLowerCase().includes(searchTerm.toLowerCase()) // Filtro da busca
    );

    // Usando as funções importadas
    const handlePaginaAnterior = usePaginaAnterior(paginaAtual, setPaginaAtual);
    const handleProximaPagina = useProximaPagina(paginaAtual, totalPaginas, setPaginaAtual);

    return (
        <main>
            <Header setSearchTerm={setSearchTerm} className={'homePage-header'} /> {/* Passa a função de busca para o Header */}
            <section>
                <div className='F-sectionHeader'>
                    <p>Encontrados {qtdHerois} heróis</p>
                    <div className="F-section-headerFilters">
                        <img src={SuperHeroIcon} alt="Ícone de super herói" />
                        <p>Ordenar por nome - A/Z</p>
                        <button 
                            className='F-section-headerFilters-toggle' 
                            onClick={() => toggleOrdenar(mostrarSort, setMostrarSort)}
                        >
                            <img src={toggle} alt="Botão de ordenar por caractere" />
                        </button>

                        <button 
                            className='F-section-headerFilters-toggle' 
                            id='showFavorites' 
                            onClick={() => toggleFavoritos(somenteFavoritos, setSomenteFavoritos)}
                        >
                            <img src={heart} alt="Ícone de coração" />
                            <p>{somenteFavoritos ? 'Mostrar todos' : 'Somente favoritos'}</p>
                        </button>
                    </div>
                </div>

                <div className="hero-list">
                    <div className="wrap">
                        {heroisPesquisados.map(hero => (
                            <Card
                                key={hero.id}
                                id={hero.id}
                                name={hero.name}
                                thumbnail={hero.thumbnail}
                                favoritos={favoritos}
                                setFavoritos={setFavoritos}
                            />
                        ))}
                    </div>
                </div>

                {/* Adicionando navegação de páginas */}
                <div className="pagination">
                    <button onClick={handlePaginaAnterior} disabled={paginaAtual === 1}>Anterior</button>
                    <span>{paginaAtual} / {totalPaginas}</span>
                    <button onClick={handleProximaPagina} disabled={paginaAtual === totalPaginas}>Próxima</button>
                </div>
            </section>

            <footer></footer>
        </main>
    );
}

export default Home;
