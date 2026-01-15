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
    try {
        const dados_notion = await get_livro_notion(isbn);
        const dados_openlibrary = await get_livro_openlibrary(isbn);

        if(dados_notion == null || dados_openlibrary == null){
            console.log(dados_notion, dados_openlibrary);
            throw new Error('Dados não encontrados para o ISBN fornecido.');
        }

        return {
            ISBN: isbn,
            titulo: dados_notion.titulo || dados_openlibrary.title,
            autor_id: dados_notion.autor_id,
            datas_conclusao: dados_notion.datas_conclusao,
            status_leitura: dados_notion.status_leitura,
            avaliacao: dados_notion.avaliacao,
            resenha: dados_notion.resenha,
            formato: dados_notion.formato,
            idioma: dados_notion.idioma,
            capa_url: dados_openlibrary.capa_url || dados_openlibrary.cover_thumbnail
        };
    } catch (error) {
        console.error('Erro ao obter dados da leitura:', error);
    }
}

// Puxando todas as leituras que estão no Notion no formato completo
const get_estante = async () => {
    try {
        // Buscar todos os livros da estante do Notion
        const estante_notion = await get_estante_notion();
        
        if (!estante_notion || estante_notion.length === 0) {
            console.log('Estante vazia ou dados inválidos:', estante_notion);
            return [];
        }
        console.log(`Encontrados ${estante_notion.length} livros no Notion`);

        // Processar em paralelo para melhor performance
        const livrosCompletos = await Promise.all(
            estante_notion.map(async (livro_notion) => {
                try {
                    const isbn = livro_notion.ISBN || livro_notion.isbn;
                    
                    if (!isbn) {
                        console.warn('Livro sem ISBN:', livro_notion);
                        return null;
                    }

                    // Buscar dados da OpenLibrary em paralelo
                    const dados_openlibrary = await get_livro_openlibrary(isbn);
                    
                    if (!dados_openlibrary) {
                        console.warn(`Dados da OpenLibrary não encontrados para ISBN: ${isbn}`);
                    }

                    // Combinar os dados no formato desejado
                    return {
                        ISBN: isbn,
                        titulo: livro_notion.titulo || livro_notion.title || dados_openlibrary?.title || 'Título desconhecido',
                        autor_id: livro_notion.autor_id || 'Autor desconhecido',
                        datas_conclusao: livro_notion.datas_conclusao,
                        status_leitura: livro_notion.status_leitura,
                        avaliacao: livro_notion.avaliacao || 0,
                        resenha: livro_notion.resenha,
                        formato: livro_notion.formato,
                        idioma: livro_notion.idioma,
                        capa_url: 
                                dados_openlibrary?.cover_thumbnail || 
                                dados_openlibrary?.cover_url ||
                                'https://www.cranfield-colours.co.uk/wp-content/uploads/2022/01/cranfield-traditional-etching-ink-mid-black.jpg'
                    };
                } catch (error) {
                    console.error(`Erro ao processar livro ISBN ${livro_notion.ISBN}:`, error);
                    return null;
                }
            })
        );

        // Filtrar livros nulos (que tiveram erro)
        const livrosFiltrados = livrosCompletos.filter(livro => livro !== null);
        
        console.log(`${livrosFiltrados.length} livros processados com sucesso`);
        return livrosFiltrados;

    } catch (error) {
        console.error('Erro ao carregar a estante completa:', error);
        throw error;
    }
}

export { get_busca_openlibrary, get_estante, get_estante_notion };
export default get_leitura;