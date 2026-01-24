import cors from "cors";
import { config } from "dotenv";
import express from "express";

import format_body from './services/notion/create_data.js';
import { get_leitura, get_multiplas_leituras } from './services/notion/read_data.js';
import get_livro from './services/open_library/get_data.js';

const app = express();
app.use(cors());
app.use(express.json());

config(); // Carregando variáveis do ENV
const NOTION_KEY = process.env.NOTION_KEY;
const DATABASE_ID = process.env.NOTION_DATABASE_ID;

app.get('/test', async(req, res) => {
    res.json({message: `Backend funcionando!`});
})

///////////////////////////////////////
// Rotas Notion
///////////////////////////////////////

// Teste de conexão (notion db)
app.get('/api/notion/test', async(req, res) => {
  try {
    
    // Passando o ID da base
    const response = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_KEY}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json'
      } 
    });

    const data = await response.json();
    return res.json(data)
  } catch{
      res.json({message: "Teste bem sucedido!"});
  }
  }
);

// Informações sobre Múltiplas Leituras
// Para pegar uma 'nova página', utilizar:
// /api/notion/reads?start_cursor=2d4bbd5b-c2b8-802d-8edb-f959c2206a6c
app.get('/api/notion/reads', async(req, res) => {
    try {
        const startCursor = req.query.start_cursor; // Puxando 'início' da lista do cursor
        
        const requestBody = {
            page_size: 16,
            sorts: [
                {
                    property: "datas_conclusao",
                    direction: "descending"
                }
            ]
        };
        
        if (startCursor) {
            requestBody.start_cursor = startCursor;
        }

        const response = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${NOTION_KEY}`,
                'Notion-Version': '2022-06-28',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        const treated_data = get_multiplas_leituras(data);
        return res.json(treated_data); // A resposta conterá os N resultados, `has_more` e `next_cursor`
    } catch (e){
        res.json({message: `ERRO: ${e}`});
    }
})

// Informações sobre Leitura
app.get('/api/notion/read/:ISBN', async(req, res) => {
    try {
        const livro_ISBN = req.params.ISBN; // Puxando o identificador do livro do request

        const response = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${NOTION_KEY}`,
                'Notion-Version': '2022-06-28',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                filter: {
                    property: "ISBN", // Filtro de Identificador do Livro da Leitura
                    title: {
                        equals: livro_ISBN
                    }
                }
            })
        });

        // Puxando e tratando o resultado do Notion Database
        const data = await response.json();
        const treated_data = get_leitura(data, 0); 
        return res.json(treated_data)
    } catch (e){
        res.json({message: `ERRO: ${e}`});
    }
})

// Acrescentando nova leitura na base de dados
app.post('/api/notion/create', async(req, res) => {
    try {
        const leitura = req.body; // Puxando o objeto de leitura do body da requisição
        const formatted_body = format_body(leitura); // Tratando o corpo da linha a ser acrescentada no Notion

        const response = await fetch('https://api.notion.com/v1/pages', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${NOTION_KEY}`,
                'Notion-Version': '2022-06-28',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                parent: {
                    database_id: DATABASE_ID
                },
                properties: formatted_body
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(`Erro da API: ${data.message || response.status}`);
        }
        
        return res.json({
            success: true,
            message: 'Leitura adicionada com sucesso!',
            data: data
        });

    } catch (e){
        console.error('Erro ao criar página:', e);
        return res.status(500).json({
            success: false,
            message: `ERRO: ${e.message}`
        });
    }
})

// Conferindo se uma leitura já foi adicionada antes, retorna dados dessa leitura:
app.post('/api/notion/check', async(req, res) => {
    try{
        const { ISBN } = req.body;

        // Faz a requisição para a API do Notion
        const response = await fetch( 'https://api.notion.com/v1/search',
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${NOTION_KEY}`,
                'Content-Type': 'application/json',
                'Notion-Version': '2022-06-28'
            },
            body: JSON.stringify({
                query: ISBN, // ISBN do livro procurado
                filter: {
                    property: 'object',
                    value: 'page'
                },
                sort: {
                    direction: 'descending',
                    timestamp: 'last_edited_time'
                },
                page_size: 3 // Limite de resultados
            })
        });

        // Puxando e tratando o resultado do Notion Database
        const data = await response.json();
        const treated_data = get_leitura(data, 0); 
        return res.json(treated_data)

    } catch (e){
        console.log(`Erro identificado: ${e}`)
        return res.status(500).json({
            success: false,
            message: `ERRO: ${e}`
        })
    }
})

///////////////////////////////////////
// Rotas OpenLibrary
///////////////////////////////////////
// Informações sobre Livro
app.get('/api/openlibrary/book/:ISBN', async(req, res) => {
    try {
        const livro_ISBN = req.params.ISBN; // Puxando o identificador do livro do request  

        const tipo = req.query.start_cursor || 'isbn'; // Puxando o tipo de busca da query

        const response = await fetch(`http://openlibrary.org/api/volumes/brief/${tipo}/${livro_ISBN}.json`);

        // Puxando e tratando o resultado do Notion Database
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        const data = await response.json();
        const treated_data = get_livro(data);
        return res.json(treated_data);
    }
    catch (e){
        res.json({message: `ERRO: ${e}`});
    }
})

// Pesquisar livros
app.get('/api/openlibrary/search', async(req, res) => {
    try {
        const {titulo, pagina = 1} = req.query
        const itemsPerPage = 10; // Máximo de 10 itens por página

        // Validação do campo obrigatório
        if (!titulo) {
            return res.status(400).json({ message: "O campo 'titulo' é obrigatório no body da requisição" });
        }

        // Tratando o título para a URL:
        const titulo_url = encodeURIComponent(titulo);
        let fields = 'key,author_name,title,id_goodreads,isbn,subject,cover_i,edition_key,isbn'
        // const response = await fetch(`https://openlibrary.org/search.json?q=${titulo_url}&fields=*&limit=${itemsPerPage}`);
        const response = await fetch(`https://openlibrary.org/search.json?q=${titulo_url}&fields=${fields}&limit=${itemsPerPage}`);

        // Puxando e tratando o resultado do Notion Database
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();

        // Processar os resultados para adicionar URLs das capas
        const resultadosComCapa = data.docs.map(livro => {
            let coverUrl = null;
            
            // Prioridade 1: Usar cover_i (ID numérico da capa)
            if (livro.cover_i) {
                coverUrl = `https://covers.openlibrary.org/b/id/${livro.cover_i}-L.jpg`;
            }
            // Prioridade 2: Usar ISBN do primeiro resultado
            else if (livro.isbn && livro.isbn.length > 0) {
                coverUrl = `https://covers.openlibrary.org/b/isbn/${livro.isbn[0]}-L.jpg`;
            }
            // Prioridade 3: Usar edition_key
            else if (livro.edition_key && livro.edition_key.length > 0) {
                coverUrl = `https://covers.openlibrary.org/b/olid/${livro.edition_key[0]}-L.jpg`;
            }
            else {
                coverUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQsySfc8vjrF2k0NXJEeR6ytsTxmigCwb8Nw&s' // Capa preta
            }
            
            return {
                ...livro,
                cover_url: coverUrl,
                cover_thumbnail: coverUrl ? coverUrl.replace('-L.jpg', '-M.jpg') : null,
                cover_small: coverUrl ? coverUrl.replace('-L.jpg', '-S.jpg') : null
            };
        });

        return res.json({
            ...data,
            docs: resultadosComCapa
        });
    }
    catch (e){
        res.json({message: `ERRO: ${e}`});
    }
})

// Porta para desenvolvimento
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend rodando em ${PORT}`));
