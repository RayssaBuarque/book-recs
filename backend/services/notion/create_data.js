const format_body = (leitura) => {

    // Mapeando propriedades do banco de dados:
    return {
        'ISBN': {
            title: [{
                text: {
                    content: leitura.ISBN
                }
            }]
        },
        'titulo': {
            rich_text: [{
                text: {
                    content: leitura.titulo
                }
            }]
        },
        'autor_id': {
            rich_text: [{
                text: {
                    content: leitura.autor_id
                }
            }]
        },
        'datas_conclusao': {
            rich_text: [{
                text: {
                    content: leitura.status_leitura || null
                }
            }],
        },
        'status_leitura': {
            select: {
                name: leitura.status_leitura || 'não iniciado'
            }
        },
        'avaliacao': {
            number: leitura.avaliacao
        },
        'resenha': {
            rich_text: [{
                text: {
                    content: leitura.resenha
                }
            }],
        },
        'formato': {
            select: {
                name: leitura.formato
            }
        },
        'idioma': {
            rich_text: [{
                text: {
                    content: leitura.idioma
                }
            }]
        }
    };
}

export default format_body;