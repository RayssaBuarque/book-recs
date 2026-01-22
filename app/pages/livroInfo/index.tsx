import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { templateLivro, templateStyles } from '../../styles/template_pagina';

export default function livroInfo() {
  const livro_styles = templateLivro();
  const page_styles = templateStyles();

  // Parâmetros do livro, recebidos via navegação
  const params = useLocalSearchParams();

  const [loading, setLoading] = useState(true); // Status de carregamento da página
  
  // Informações do Livro
  const [livro, setLivro] = useState(null);
  const [titulo, setTitulo] = useState('Título do Livro');
  const [capa, setCapa] = useState('Capa do Livro');
  const [autores, setAutores] = useState(['Autores do Livro']);
  const [generos, setGeneros] = useState(['Gêneros do Livro']);


  useEffect(() => {

    // Salvando dados do livro recebido via parâmetros
    if (params.livro) {
      try {
        const livroData = JSON.parse(params.livro);

        setTitulo(livroData.title || 'Título do Livro');
        setAutores(livroData.author_name || ['Autores do Livro']);
        setGeneros(livroData.subject || ['Gêneros do Livro']);
        setCapa(livroData.cover_url || `https://covers.openlibrary.org/b/isbn/${livroData.isbn[0]}-L.jpg`);

        setLivro(livroData);
      } catch (error) {
        console.error('Erro ao parsear livro:', error);
      }
    }

    setLoading(false);
  }, []);

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

    <ScrollView
      style={livro_styles.container}
      contentContainerStyle={livro_styles.contentContainer}
      showsVerticalScrollIndicator={false}>
      
      {loading ? (
          <Text>Carregando...</Text>
        ) : livro ? (
          <>
            <Text style={livro_styles.titulo}>
              { titulo || 'Título do Livro' }
            </Text>

            <Image
              source={{ uri: capa }}
              style={livro_styles.capa}
            />
            
            {/* Lista de Autores */}
            {autores && autores.length > 0 && (
              <View style={livro_styles.lista_autores}>
                {autores.map((autor, index) => (
                  <Text key={index} style={livro_styles.autor}> {autor} </Text>
                ))}
              </View>
            )}

            <TouchableOpacity
              style={page_styles.button}
              accessibilityLabel="Selecionar Leitura"
              onPress={() => router.push({
              pathname: '/pages/saveLeitura',
              params: { livro: JSON.stringify(livro) } // Passa o item completo
            })}>
              <Text style={page_styles.texto_button}>Registrar Nova Leitura</Text>
            </TouchableOpacity>

            {/* Lista de Gêneros Literários */}
            {generos && generos.length > 0 && (
              <View>
                <Text>Gêneros:</Text>
                {generos.map((genero, index) => (
                  <Text key={index}>
                    {genero}
                  </Text>
                ))}
              </View>
            )}
        
          </>
      ) : (
        <Text>Não foi possível carregar os dados do livro.</Text>
      )}

    </ScrollView>
  </>
  );
}