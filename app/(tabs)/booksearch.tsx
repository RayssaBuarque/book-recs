import SearchBar from '@/components/barraPesquisa';
import LivroItem from '@/components/livroItem';
import useTheme from "@/hooks/useTheme";
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from "react-native";
import { get_busca_openlibrary } from '../services/get_data.js';
import { BookResult } from '../services/interfaces.js';

const BookSearch = () => {
  const {colors} = useTheme(); // cores da página
  const [loading, setLoading] = useState(true); // Status de carregamento da página

  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<BookResult[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const styles = StyleSheet.create({
    resultsTitle: {
      fontSize: 16,
      marginVertical: 15,
      color: colors.textMuted,
    },
    resultsList: {
      width: '100%',
    },
    resultsContainer: {
      paddingHorizontal: 20,
    },
    resultItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      marginBottom: 10,
      backgroundColor: colors.surface,
      borderRadius: 8,
    },
    resultCover: {
      width: 50,
      height: 75,
      borderRadius: 4,
      marginRight: 15,
    },
    resultInfo: {
      flex: 1,
    },
    resultTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 4,
    },
    resultAuthor: {
      fontSize: 14,
      color: colors.textMuted,
    },
    noResults: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    noResultsText: {
      fontSize: 16,
      color: colors.textMuted,
      textAlign: 'center',
    },
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    livroContainer: {
      marginTop: 20,
      alignItems: "center",
    },
    titulo: {
      fontSize: 22,
      fontWeight: "bold",
      marginTop: 10,
    },
    subtitulo: {
      fontSize: 16,
      marginTop: 5,
    },
    autoresContainer: {
      marginTop: 5,
      alignItems: 'center',
    },
    autor: {
      fontSize: 16,
      marginVertical: 2,
    },
    estrelasContainer: {
      flexDirection: 'row',
      marginTop: 10,
    }
  });


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
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
     <View style={styles.container}>
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
          <Text style={styles.resultsTitle}>
            Resultados para "{searchQuery}" ({searchResults.length})
          </Text>
          <FlatList
            data={searchResults}
            renderItem={({ item }) => <LivroItem item={item} />}
            keyExtractor={(item) => item.key}
            style={styles.resultsList}
            contentContainerStyle={styles.resultsContainer}
            keyboardShouldPersistTaps="always"
          />
        </>
      ) : searchQuery && !searchLoading ? (
        // Tela de "nenhum resultado encontrado"
        <View style={styles.noResults}>
          <Text style={styles.noResultsText}>
            Nenhum resultado encontrado para "{searchQuery}"
          </Text>
        </View>
      ) : searchLoading ? (
        <View>
          <Text>Buscando...</Text>
        </View>

      ) : (
        // Tela inicial quando nenhum livro é pesquisado
        <View>
          <Text>Pesquise um livro para começar!</Text>
        </View>
      )}
    </View>
  );
};

export default BookSearch;