import cors from "cors";
import { config } from "dotenv";
import express from "express";

import { get_leitura, get_multiplas_leituras } from './services/notion/get_data.js';


const app = express();
app.use(cors());
app.use(express.json());

config(); // Carregando variáveis do ENV
const NOTION_KEY = process.env.NOTION_KEY;
const DATABASE_ID = process.env.NOTION_DATABASE_ID;

app.get('/test', async(req, res) => {
    res.json({message: `Backend funcionando!`});
})

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
///////////////////////////////////////
// Para pegar uma 'nova página', utilizar:
// /api/notion/reads?start_cursor=2d4bbd5b-c2b8-802d-8edb-f959c2206a6c
app.get('/api/notion/reads', async(req, res) => {
    try {
        // Puxando 'início' da lista do cursor
        const startCursor = req.query.start_cursor;
        
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

// Porta para desenvolvimento
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend rodando em ${PORT}`));
