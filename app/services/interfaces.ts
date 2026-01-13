// Resultados de busca de livros
export interface BookResult {
  key: string;
  title: string;
  author_name?: string[];
  cover_url?: string;
  cover_thumbnail?: string;
  isbn?: string[];
  edition_key?: string[];
}

export default {};