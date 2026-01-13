import LivroItem from '@/components/livroItem';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from "react-native";
import { get_estante_notion } from '../services/get_data.js';
import { BookResult } from '../services/interfaces.js';
import { transformar_BookResults } from '../services/utils.js';

export default function Shelf() {

  const [loading, setLoading] = useState(true); // Status de carregamento da página
  const [livros, setLivros] = useState<BookResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const carregarEstante = async () => {
    try{
      setLoading(true);
      setError(null);
      
      const dados = await get_estante_notion();

      // Salvando retorno das leituras da estante do Notion
      if (Array.isArray(dados)) {
        const livrosTransformados = dados.map(item => transformar_BookResults(item, {}));
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


  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando sua estante...</Text>
      </View>
    );
  }

  // Tela de erro
  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
        <Text 
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
    
    <View>
      <View>
        <Text>Minha Estante</Text>
        <Text>
          {livros.length} {livros.length === 1 ? 'livro' : 'livros'}
        </Text>
      </View>
      
      {livros.length > 0 ? (
        <FlatList
          data={livros}
          renderItem={({ item }) => <LivroItem item={item} />}
          keyExtractor={(item) => item.key}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View>
          <Text>Sua estante está vazia</Text>
          <Text>
            Adicione livros pela aba de busca!
          </Text>
        </View>
      )}
    </View>
  );

}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});
