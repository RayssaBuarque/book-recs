import cors from "cors";
import express from "express";

const app = express();
app.use(cors());
app.use(express.json());

// Configurar Notion
// const notion = new Client({ auth: process.env.NOTION_SECRET });
const NOTION_KEY = process.env.NOTION_KEY;
const DATABASE_ID = process.env.NOTION_DATABASE_ID;

app.get('/test', async(req, res) => {
    res.json({message: `Backend funcionando!`});
})


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

// Porta para desenvolvimento
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend rodando em ${PORT}`));
