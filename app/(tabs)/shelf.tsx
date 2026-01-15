import LeituraItem from '@/components/leituraItem';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from "react-native";
import { get_estante_notion } from '../services/get_data.js';
import { ShelfItem } from '../services/interfaces';
import { transformar_ShelfItem } from '../services/utils.js';
import templateStyles from '../styles/template_pagina';

export default function Shelf() {

  const page_styles = templateStyles();

  const [loading, setLoading] = useState(true); // Status de carregamento da página
  // const [livros, setLivros] = useState<BookResult[]>([]);
  const [livros, setLivros] = useState<ShelfItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const carregarEstante = async () => {
    try{
      setLoading(true);
      setError(null);
      
      const dados = await get_estante_notion();

      // Salvando retorno das leituras da estante do Notion
      if (Array.isArray(dados)) {
        const livrosTransformados = dados.map(item => transformar_ShelfItem(item, {}));
        setLivros(livrosTransformados);
      } else if (dados?.results || dados?.docs) {
        setLivros(dados.results || dados.docs);
      } else {
        console.warn("Estrutura de dados inesperada:", dados);
        setLivros([]);
      }

    } catch(error){
      console.error("Erro ao carregar a estante:", error);
      setError('Erro ao carregar a estante. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(false);
    carregarEstante();
  }, []);

  // Tela de carregamento
  if (loading) {
    return (
      <View style={page_styles.container}>
        <Text style={page_styles.titulo_pagina}>Carregando sua estante...</Text>
        <Text style={page_styles.texto}>Aguarde o carregamento das informações.</Text>
      </View>
    );
  }

  // Tela de erro
  if (error) {
    return (
      <View style={page_styles.container}>
        <Text style={page_styles.texto}>{error}</Text>
        <Text 
         style={page_styles.danger}
         onPress={carregarEstante}
        >
          Tentar novamente
        </Text>
      </View>
    );
  }

/* <Button
  //       // onPress={onPressLearnMore}
  //       title="+"
  //       accessibilityLabel="Registrar Nova Leitura"
  //     /> */

  // Tela principal com lista
  return (
    <View style={page_styles.container}>
      <View style={page_styles.wrapper}>
        <Text style={page_styles.titulo_pagina}>Minha Estante</Text>
        <Text style={page_styles.texto}>
          {livros.length} {livros.length === 1 ? 'livro' : 'livros'}
        </Text>

        {/* Conjunto de thumbnails dos livros da estante: */}
        <View style={{paddingBottom: 100, marginTop: 30}}>
          {livros.length > 0 ? (
            <FlatList
              data={livros}
              renderItem={({ item }) => <LeituraItem item={item} />}
              keyExtractor={(item) => item.key}
              showsVerticalScrollIndicator={false}

              // Estilização da grade da estante
              numColumns={2}
              columnWrapperStyle={{justifyContent: 'space-between', gap: 5}} 
              contentContainerStyle={{gap: 5}}
            />
          ) : (
            <View>
              <Text style={page_styles.titulo_pagina}>Minha Estante</Text>
              <Text style={page_styles.texto}>
                Estante vazia, adicione livros pela aba de busca!
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );

}
