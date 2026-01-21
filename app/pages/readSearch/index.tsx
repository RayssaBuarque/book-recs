import { get_busca_openlibrary } from '@/app/services/get_data';
import { BookResult } from '@/app/services/interfaces';
import SearchBar from '@/components/barraPesquisa';
import LivroItem from '@/components/livroItem';
import { Stack, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { buscaStyles } from '../../styles/template_pagina';

export default function readSearch() {

  const busca_styles = buscaStyles();
  const [loading, setLoading] = useState(true); // Status de carregamento da página

  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<BookResult[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setLoading(false);
  }, []);


  // Função de busca de livros via OpenLibrary
  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setSearchQuery(query);
    setSearchLoading(true);

    try {
      const data = await get_busca_openlibrary(encodeURIComponent(query), 1);
        setSearchResults(data.docs || []);
    }
    catch (error) {
      console.error('Erro na busca:', error);
      setSearchResults([]);
    }
    finally {
        setSearchLoading(false);
    };
  }

  if (loading) {
    return (
      <View style={busca_styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }


  return (
  <>
    <Stack.Screen 
      options={{
        headerShown: true,
        headerTitle: '',
        headerBackTitle: 'Voltar',
        headerTintColor: '#CC9C67',
      }}
    />

    <View style={busca_styles.container}>
      {/* Barra de pesquisa */}
      <View style={{ width: '100%' }}>
        <SearchBar
          placeholder="Pesquise por título, autor ou ISBN..."
          onSearch={handleSearch}
        />
      </View>

      {/* Exibir resultados da busca ou livro padrão */}
      {searchResults.length > 0 ? (
        
        <>
        <Text style={busca_styles.search_inform}>Resultados para "{searchQuery}" ({searchResults.length})</Text>

        <FlatList
          data={searchResults}
          renderItem={({ item }) => <> 
            <TouchableOpacity
              accessibilityLabel="Selecionar Leitura"
              onPress={() => router.push({
              pathname: '/pages/livroInfo',
              params: { livro: JSON.stringify(item) } // Passa o item completo
            })}>
              <LivroItem item={item} />
            </TouchableOpacity>
          </>}
          keyExtractor={(item) => item.key}
          keyboardShouldPersistTaps="always"
        />
        </>
      
      ) : searchQuery && !searchLoading ? (

        // Tela de "nenhum resultado encontrado"
        <View>
          <Text style={busca_styles.search_inform}>Nenhum resultado encontrado para "{searchQuery}"
          </Text>
        </View>

      ) : searchLoading ? (

        // Tela de carregamento da busca
        <View>
          <Text style={busca_styles.search_inform}>Buscando...</Text>
        </View>

      ) : (
        
        // Tela inicial quando nenhum livro é pesquisado
        <View>
          <Text style={busca_styles.search_inform}>Pesquise um livro para começar!</Text>
        </View>

      )}

    </View>
  </>
  );
}