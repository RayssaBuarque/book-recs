// Puxando dados da Database no Notion
const get_livro_notion = async (id) => {

    // Coletando a URL do servidor da API:
    const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL || "http://localhost:3001";

    try{
        const response = await fetch(`${SERVER_URL}/api/notion/read/${id}`);
        if (!response.ok || !response) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    }
    catch(e){
        console.log(`ERRO: ${e}`);
    }
}

// Puxando todos os livros da Database no Notion
const get_estante_notion = async () => {
    // Coletando a URL do servidor da API:
    const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL || "http://localhost:3001";

    try{
        const response = await fetch(`${SERVER_URL}/api/notion/reads`);
        
        if (!response.ok || !response) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    }
    catch(e){
        console.log(`ERRO: ${e}`);
    }
}

// Puxando dados da OpenLibrary
const get_livro_openlibrary = async (isbn) => {
    // Coletando a URL do servidor da API:
    const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL || "http://localhost:3001";

    try{
        const response = await fetch(`${SERVER_URL}/api/openlibrary/book/${isbn}`);
        if (!response.ok || !response) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    }
    catch(e){
        console.log(`ERRO: ${e}`);
    }
}

const get_busca_openlibrary = async (query, pagina) => {
    // Coletando a URL do servidor da API:
    const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL || "http://localhost:3001";
    try {
        const response = await fetch(`${SERVER_URL}/api/openlibrary/search?titulo=${query}&pagina=${pagina}`);
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();
        return data;
    }
    catch (error) {
      console.error('Erro na busca:', error);
    }
}

// Puxando dados compeltos de uma leitura:
const get_leitura = async (isbn) => {
    const dados_notion = await get_livro_notion(isbn);
    const dados_openlibrary = await get_livro_openlibrary(isbn);

    return {
        ...dados_notion,
        ...dados_openlibrary
    };
}

export { get_busca_openlibrary, get_estante_notion, get_leitura };
export default get_leitura;