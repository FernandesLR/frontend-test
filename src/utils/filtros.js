// Função para alternar entre mostrar todos os heróis ou apenas os favoritos
export const toggleFavoritos = (somenteFavoritos, setSomenteFavoritos) => {
    setSomenteFavoritos(!somenteFavoritos); // Alterna o estado
};

// Função para alternar a ordem de exibição dos heróis
export const toggleOrdenar = (mostrarSort, setMostrarSort) => {
    setMostrarSort(!mostrarSort); // Alterna entre ordenação ascendente/descendente
};

// Função para ordenar os heróis por nome
export const ordenarPorCaractere = (heroes, order = 'asc') => {
    return heroes.sort((a, b) => {
        if (order === 'asc') {
            return a.name.localeCompare(b.name);
        }
        return b.name.localeCompare(a.name);
    });
};

// Função para filtrar os heróis com base na opção "Somente Favoritos"
export const filtrarFavoritos = (heroes, favoritos, somenteFavoritos) => {
    return somenteFavoritos
        ? heroes.filter(hero => favoritos.some(fav => fav.id === hero.id))
        : heroes;
};
