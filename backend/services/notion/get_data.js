
// Retorna objeto com informações sobre uma leitura
const get_leitura = (data, multiplo) => {

    // Verifica se data e data.properties existem
    if (!data) {
        console.error('Dados inválidos para get_leitura:', data);
        return null;
    }

    // DETERMINA QUAL OBJETO USAR:
    // 0 = Leitura única; 1 = Múltipla Leitura
    let props, id;
    if (multiplo === 1) {
        props = data.properties;
        id = data.id;
    } else {
        if (!data.results || data.results.length === 0) {
            console.error('Nenhum resultado encontrado:', data.results); // Verifica se há resultados
            return null;
        }
        props = data.results[0].properties;
        id = data.results[0].id;
    }
    
    const objeto_leitura = {
        id: id,
        ISBN: props.ISBN?.title?.[0]?.plain_text || null,
        titulo: props.titulo?.rich_text?.[0]?.plain_text || null,
        autor_id: props.autor_id?.rich_text?.[0]?.plain_text.split(',') || [],
        datas_conclusao: props.datas_conclusao?.rich_text?.[0]?.plain_text.split(',') || [],
        status_leitura: props.status_leitura?.select?.name || null,
        avaliacao: props.avaliacao.number,
        resenha: props.resenha?.rich_text?.[0]?.plain_text || null,
        formato: props.formato?.select?.name || null,
        idioma: props.idioma?.rich_text?.[0]?.plain_text || null,
    }

    return objeto_leitura
}

const get_multiplas_leituras = (data) => {

    // Verifica se data e data.properties existem
    if (!data || !data.results[0].properties) {
        console.error('Dados inválidos para get_leitura:', data);
        return null;
    }

    const multiplas_leituras = [];

    for (let i = 0; i < data.results.length; i++) {
        const objeto_leitura = get_leitura(data.results[i], 1);
        multiplas_leituras.push(objeto_leitura);
    }

    return multiplas_leituras;
}

export { get_leitura, get_multiplas_leituras };

