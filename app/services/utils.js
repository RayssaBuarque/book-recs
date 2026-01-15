// 'NOME_SOBRENOME_MAISNOMES' => 'Nome Sobrenome Maisnomes'
const formatarNomeAutor = (autorString) => {
  return autorString
    .split('_')                         // Divide por underscore
    .map(palavra =>                     // Para cada palavra
      palavra.charAt(0).toUpperCase() + // Primeira letra maiúscula
      palavra.slice(1).toLowerCase()    // Resto em minúsculo
    )
    .join(' ');                         // Junta com espaços
}

// TRANSFORMA DADOS DE UM LIVRO EM UM OBJETO >BOOKRESULT<
const transformar_BookResults = (notion, openLibrary = {}) => {

  // Formatando o nome dos autores
  const nome_autor_formatado = notion.autor_id.map(formatarNomeAutor);

  return ({
    key: notion.ISBN,
    title: notion.titulo || openLibrary.title,
    author_name: nome_autor_formatado,
    cover_url: openLibrary.cover_url,
    cover_thumbnail: openLibrary.cover_thumbnail,
    isbn: notion.ISBN,
    edition_key: openLibrary.edition_key,
  });
}

// TRANSFORMA DADOS DE UM LIVRO EM UM OBJETO >SHELFITEM<
const transformar_ShelfItem = (notion, openLibrary = {}) => {

  // Formatando o nome dos autores
  const nome_autor_formatado = notion.autor_id.map(formatarNomeAutor);

  return ({
    key: notion.ISBN,
    titulo: notion.titulo || openLibrary.title,
    autor_id: nome_autor_formatado,
    datas_conclusao: notion.datas_conclusao,
    status_leitura: notion.status_leitura,
    avaliacao: notion.avaliacao,
    resenha: notion.resenha,
    formato: notion.formato,
    idioma: notion.idioma,
    capa_url: openLibrary.cover_url,
  });
}

export { formatarNomeAutor, transformar_BookResults, transformar_ShelfItem };
export default formatarNomeAutor