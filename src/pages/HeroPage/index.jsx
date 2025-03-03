import Header from "../../components/header";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCharacter } from "../../services/api";
import './hero.css';
import quadrinhoIcon from '../../assets/icones/book/Group@1,5x.svg';
import filmeIcon from '../../assets/icones/video/Shape@1,5x.svg';

function Hero() {
    const { id } = useParams();
    const [hero, setHero] = useState(null);
    const [comics, setComics] = useState([]);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchHero = async () => {
            const data = await getCharacter(id);
            if (data) {
                setHero(data.character);
                setComics(data.comics);

                // Buscar filmes (se existirem)
                if (data.character.events) {
                    setMovies(data.character.events.items); // Ajustar de acordo com a resposta da API para eventos relacionados a filmes/séries
                }
            }
        };

        fetchHero();
    }, [id]);

    if (!hero) {
        return <p>Carregando...</p>;
    }

    return (
        <main className="heroPage">
            <Header mostrarDescricao={false} className={'heroPage-header'} setSearchTerm={hero.name} />
            <section className="heroPage-Fsection">
                <div className="textWrapper">
                    <h1>{hero.name}</h1>
                    <p>{hero.description || 'Sem descrição disponível'}</p>

                    <div className="heroPage-Fsection-info">
                        <p>Quadrinhos</p>
                        <p>Filmes</p>
                        <div className="icons-wraper">
                            <div>
                                <img src={quadrinhoIcon} alt="Icone de quadrinhos" style={{width: '20px'}}/>
                                <p>{comics.length}</p>

                            </div>

                            <div>
                                <img src={filmeIcon} alt="Icone de filmes" style={{width: '20px'}}/>
                                <p>{movies.length}</p>

                            </div>


                        </div>
                    </div>
                </div>
                <img src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`} alt={hero.name} className="heroImage" />
            </section>




            <section className="heroPage-Ssection">
                {/* Exibir os últimos 10 quadrinhos */}
                <h2>Últimos Quadrinhos</h2>
                <div className="comics-list">
                    {comics.length > 0 ? (
                        comics.map(comic => (
                            <div key={comic.id} className="comic-card">
                                <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} />
                                <p>{comic.title}</p>
                            </div>
                        ))
                    ) : (
                        <p>Sem quadrinhos disponíveis</p>
                    )}
                </div>

            </section>
            <footer></footer>
        </main>
    );
}

export default Hero;
