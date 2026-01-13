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

export { formatarNomeAutor, transformar_BookResults };
export default formatarNomeAutor