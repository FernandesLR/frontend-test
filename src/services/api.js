import md5 from 'js-md5';

const API_URL = "https://gateway.marvel.com/v1/public/characters";
const API_PUBLIC_KEY = import.meta.env.VITE_API_PUBLIC_KEY;
const API_PRIVATE_KEY = import.meta.env.VITE_API_PRIVATE_KEY;


// Função para gerar o hash MD5
const gerarHash = () => {
    const ts = Date.now().toString(); // Timestamp único como string
    const hash = md5(ts + API_PRIVATE_KEY + API_PUBLIC_KEY);  // Concatenando como string
    return { ts, hash };
};

// Função para buscar personagens
export const getCharacters = async (limit = 20, offset = 0) => {
    try {
        const { ts, hash } = gerarHash();
        const response = await fetch(`${API_URL}?ts=${ts}&apikey=${API_PUBLIC_KEY}&hash=${hash}&limit=${limit}&offset=${offset}`)
        
        if (!response.ok) {
            throw new Error("Erro ao buscar dados da API")
        }

        const data = await response.json()
        //console.log(data.data)
        return data.data.results
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error.message || error)
        return []  // Retorna uma lista vazia caso haja erro
    }
}

export const getCharacter = async (id) => {
    try {
        const { ts, hash } = gerarHash()
        const response = await fetch(`${API_URL}/${id}?ts=${ts}&apikey=${API_PUBLIC_KEY}&hash=${hash}`)
        
        if (!response.ok) {
            throw new Error("Erro ao buscar dados da API")
        }

        const data = await response.json();
        return data.data.results[0]; // Retorna apenas o primeiro resultado
    } catch (error) {
        console.error('Erro ao buscar personagem da API:', error.message || error);
        return null
    }
}

export default { getCharacters, gerarHash };
