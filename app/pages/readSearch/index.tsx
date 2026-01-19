import { get_busca_openlibrary } from '@/app/services/get_data';
import { BookResult } from '@/app/services/interfaces';
import SearchBar from '@/components/barraPesquisa';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
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


  // Função para buscar na API
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
        // Ou para iOS especificamente:
        // headerBackTitleVisible: false,
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
    </View>
  </>
  );
}