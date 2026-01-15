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

export interface ShelfItem {
  key: string;
  titulo: string;
  autor_id: string;
  datas_conclusao?: string;
  status_leitura: string;
  avaliacao?: number;
  resenha?: string;
  formato: string;
  idioma: string;
  capa_url?: string;
}

export default {};