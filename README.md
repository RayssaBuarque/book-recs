# 📚 BookRec: Seu Algoritmo Literário Pessoal

[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/) [![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/) [![Notion API](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white)](https://developers.notion.com/) [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) ![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)


**BookSmart** é uma aplicação mobile que cataloga leituras utiliza um algoritmo de recomendação personalizado usando seus próprios registros. Não tem mistério, só estatística.

![Dashboard Preview](https://img.shields.io/badge/Status-Em%20Desenvolvimento-lightblue)

## 🎯 Por Que Este Projeto?

Como leitora que já leu 82 livros em 2021 e viu esse número cair para 12 em 2021, decidi optar por um meio pouco convencional de recuperar minha intensa ofensiva de leituras:
- *Treinando um Modelo de Machine Learning para me recomendar livros que se encaixem no meu gosto literário.*

Meus objetivos com este projeto são:
1. Aplicar conceitos da faculdade na prática
2. Aprender sobre **Machine Learning** e **Algoritmos de Recomendação**
3. Criar uma ferramenta personalizada que atenda minhas necessidades como leitora

<!-- ## 🏗️ Arquitetura do Sistema -->

## 🛠️ Stack Tecnológica

### *Frontend Mobile*
- **React Native com TypeScript** - Desenvolvimento cross-platform
- **Expo** - Ferramentas para desenvolvimento React Native

### *Backend & Armazenamento*
- 🔗 **[Notion API](https://developers.notion.com/docs/getting-started)** - Conexão com Base de Dados (plano estudante)
- 🔗 **[Vercel](https://vercel.com/docs)** - Hospedagem e deployment do servidor backend
<!-- - **SQLite** - Cache local no dispositivo -->

### *Sistema de Recomendação*
- **FAISS (Facebook AI Similarity Search)** - Busca por similaridade eficiente
- **NumPy/Pandas** - Manipulação de dados

### *APIs Externas*
- **Open Library API** - API da Internet Archive com dados de 20M+ livros



## 🗂️ Armazenamento

Os dados consumidos da Base de Dados no Notion Databases seguem a seguinte estrutura:
```
📁 BookRec Database
└── 📄 Leitura 
    ├── ISBN (Identificador)
    ├── autor_id (Nome do Autor)
    ├── datas_conclusao (Lista de datas de conclusão de leitura)
    ├── status_leitura ('concluído', 'em andamento', 'não iniciado', 'abandonado')
    ├── avaliacao (Número 0-5)
    ├── resenha (Texto)
    ├── formato ('Físico', 'Ebook', 'Audiobook')
    └── idioma (Códigos ISO 639)

```

---
<!-- ## 🚀 Começando

### **Pré-requisitos**
- Node.js 16+
- Conta Notion (estudante para database ilimitado)
- Emulador ou dispositivo mobile físico

### **Instalação**

1. **Clone o repositório**
```bash
git clone https://github.com/RayssaBuarque/book-recs.git
cd book-recs
```

2. **Configure o Notion**
- Crie database com schema especificado
- Obtenha API key em [notion.so/my-integrations](https://www.notion.so/my-integrations)
- Compartilhe database com sua integration -->

<!-- ### **Estrutura do Projeto**
```
bookrec/
├── mobile-app/          # Aplicativo React Native
│   ├── src/
│   │   ├── screens/    # Telas do app
│   │   ├── components/ # Componentes reutilizáveis
│   │   ├── services/   # APIs (Notion, Open Library)
│   │   └── utils/      # Funções auxiliares
│   └── App.tsx
├── recommendation-engine/  # Servidor Python
│   ├── models/        # Modelos ML
│   ├── data/          # Processamento de dados
│   ├── api/           # Endpoints Flask
│   └── train.py       # Script de treinamento
├── notion-templates/  # Templates de database
└── docs/             # Documentação
``` -->

### **Variáveis de Ambiente**
```bash
# .env
NOTION_API_KEY=secret_xxxx
NOTION_DATABASE_ID=xxxx

```

## 🤝 Contribuindo

Este é um projeto pessoal de aprendizado, mas sugestões são bem-vindas!

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Add: nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request


Em um mundo onde algoritmos controlam o que consumimos, entender como eles funcionam é empoderador. *Desenvolvido com ❤️ por uma leitora e desenvolvedora.*