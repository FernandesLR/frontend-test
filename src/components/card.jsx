import { useState } from 'react';
import heart from '../assets/icones/heart/heart.svg'; // Ícone de coração cheio
import heart2 from '../assets/icones/heart/Path.svg'; // Ícone de coração vazio
import './card.css'; // Estilos para o Modal

function Card({ id, name, thumbnail, favoritos, setFavoritos }) {
    const [showModal, setShowModal] = useState(false);
    const [disableHover, setDisableHover] = useState(false);

    // Função para adicionar ou remover o herói dos favoritos
    const handleFavorite = () => {
        const isFavorito = favoritos.some(hero => hero.id === id);

        if (isFavorito) {
            // Remover do favoritos
            setFavoritos(prevFavoritos => prevFavoritos.filter(hero => hero.id !== id));
        } else if (favoritos.length < 5) {
            // Adicionar aos favoritos
            setFavoritos(prevFavoritos => [...prevFavoritos, { id, name, thumbnail }]);
        } else {
            // Mostrar modal e desabilitar hover
            setShowModal(true);
            setDisableHover(true);
        }
    };

    // Função para fechar o modal
    const closeModal = () => {
        setShowModal(false);
        setDisableHover(false);
    };

    // Função para fechar o modal ao clicar fora da área do modal
    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal();
        }
    };

    const isFavorito = favoritos.some(hero => hero.id === id); // Verificação se está nos favoritos

    return (
        <div className={`card ${disableHover ? 'disable-hover' : ''}`}>
            <img 
                src={`${thumbnail.path}.${thumbnail.extension}`} 
                alt={name} 
                className="card-image"
            />
            <div className="card-header">
                <h3>{name}</h3>
                <button id="favoritar" onClick={handleFavorite}>
                    <img src={isFavorito ? heart2 : heart} alt="Favoritar" />
                </button>
            </div>

            {/* Modal de Limite de Favoritos */}
            {showModal && (
                <div className="modal" onClick={handleOverlayClick}>
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>Limite de Favoritos Atingido</h2>
                        <p>Você já pode favoritar no máximo 5 heróis!</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Card;
