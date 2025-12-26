// Retorna objeto com informações sobre um livro
const get_livro = (data) => {
    if (!data || !data.records) {
        console.error('Dados inválidos para get_livro:', data);
        return null;
    }

    // Pega o primeiro record (chave dinâmica)
    const record = Object.values(data.records)[0];

    if (!record) return null;

    /* ===============================
       1. Menor ano de publishDates
    =============================== */
    const publishDates = record.publishDates || [];
    let minPublishDate = null;

    const years = publishDates
        .map(date => {
            const match = date.match(/\d{4}/);
            return match ? Number(match[0]) : null;
        })
        .filter(Boolean);

    if (years.length > 0) {
        minPublishDate = Math.min(...years).toString();
    }

    // Lista de gêneros do livro
    const subjects = record.data?.subjects
        ? record.data.subjects.map(s => s.name)
        : [];

    // Objeto com todas as capas disponíveis
    const cover = record.data?.cover ? { ...record.data.cover } : {};

    // Lista de séries em que o livro pertence
    const series = Array.isArray(record.details?.details?.series)
        ? record.details.details.series
        : record.details?.details?.series
            ? [record.details.details.series]
            : [];

    return {
        data_publicacao: minPublishDate,
        generos: subjects,
        editoras: record.data?.publishers ? record.data.publishers.map(p => p.name) : [],
        descricao: record.details?.details?.description?.value || null,
        capas: cover,
        series,
        paginas: record.data?.number_of_pages || null
    };
};

export default get_livro;
