import EstrelasAvaliacao from '@/components/estrelasAvaliacao';
import LivroItem from '@/components/livroItem';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { templateLeitura } from '../../styles/template_pagina';

export default function saveLeitura() {

  // Parâmetros do livro, recebidos via navegação
  const params = useLocalSearchParams();

  const livro_styles = templateLeitura();
  const [loading, setLoading] = useState(true); // Status de carregamento da página
  
  // Informações do Livro
  const [livro, setLivro] = useState(null);
  const [titulo, setTitulo] = useState('Título do Livro');
  const [capa, setCapa] = useState('Capa do Livro');
  const [autores, setAutores] = useState(['Autores do Livro']);
  const [generos, setGeneros] = useState(['Gêneros do Livro']);

  // Informações da Leitura
  const [avaliacao, setAvaliacao] = useState(0);
  const [resenha, setResenha] = useState('');
  const [formato, setFormato] = useState('ebook');
  const [idioma, setIdioma] = useState('pt');
  const [dataConclusao, setDataConclusao] = useState('20260121');



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

            {/* Informações Gerais do Livro*/}
            <LivroItem item={livro}></LivroItem>

            {/* Informações da Leitura */}
            <View style={livro_styles.general_info}>
                <View>
                <Text>Selecione um formato:</Text>
                <View style={livro_styles.multipla_escolha}>    
                    {/* Ebook */}
                    <TouchableOpacity
                        style={[
                        livro_styles.botaoOpcao,
                        formato === 'ebook' && livro_styles.botaoSelecionado
                        ]}
                        onPress={() => setFormato('ebook')}>
                        <Text
                            style={[
                            livro_styles.textoOpcao,
                            formato === 'ebook' && livro_styles.textoSelecionado
                            ]}>Ebook</Text>
                    </TouchableOpacity>

                    {/* Livro Físico */}
                    <TouchableOpacity
                        style={[
                        livro_styles.botaoOpcao,
                        formato === 'físico' && livro_styles.botaoSelecionado
                        ]}
                        onPress={() => setFormato('físico')}>
                        <Text
                            style={[
                            livro_styles.textoOpcao,
                            formato === 'físico' && livro_styles.textoSelecionado
                            ]}>Físico</Text>
                    </TouchableOpacity>

                    {/* Audiobook */}
                    <TouchableOpacity
                        style={[
                        livro_styles.botaoOpcao,
                        formato === 'audiobook' && livro_styles.botaoSelecionado
                        ]}
                        onPress={() => setFormato('audiobook')}>
                        <Text 
                            style={[
                            livro_styles.textoOpcao,
                            formato === 'audiobook' && livro_styles.textoSelecionado
                            ]}>Audiobook</Text>
                    </TouchableOpacity>
                </View>
                </View>
                
                {/* Estrelinhas de Avaliação */}
                <View style={livro_styles.caixa_estrelas}>
                    <Text>Avaliação:</Text>

                    <EstrelasAvaliacao
                        avaliacao={avaliacao || 0}
                        cor={livro_styles.estrelas.backgroundColor}
                        tamanho={35}
                        touch={true}
                        ></EstrelasAvaliacao>
                </View>

                <View>
                    <Text>Selecione o idioma:</Text>
                    <View style={livro_styles.multipla_escolha}>    
                        {/* pt */}
                        <TouchableOpacity
                            style={[
                            livro_styles.botaoOpcao,
                            idioma === 'pt' && livro_styles.botaoSelecionado
                            ]}
                            onPress={() => setFormato('pt')}>
                            <Text
                                style={[
                                livro_styles.textoOpcao,
                                idioma === 'pt' && livro_styles.textoSelecionado
                                ]}>Português</Text>
                        </TouchableOpacity>

                        {/* en */}
                        <TouchableOpacity
                            style={[
                            livro_styles.botaoOpcao,
                            idioma === 'en' && livro_styles.botaoSelecionado
                            ]}
                            onPress={() => setIdioma('en')}>
                            <Text
                                style={[
                                livro_styles.textoOpcao,
                                idioma === 'en' && livro_styles.textoSelecionado
                                ]}>Inglês</Text>
                        </TouchableOpacity>

                        {/* es */}
                        <TouchableOpacity
                            style={[
                            livro_styles.botaoOpcao,
                            idioma === 'es' && livro_styles.botaoSelecionado
                            ]}
                            onPress={() => setIdioma('es')}>
                            <Text 
                                style={[
                                livro_styles.textoOpcao,
                                idioma === 'es' && livro_styles.textoSelecionado
                                ]}>Espanhol</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TextInput
                    style={livro_styles.caixa_resenha}
                    onChangeText={setResenha}
                    value={resenha}
                    placeholder="Escreva uma resenha sobre o livro..."
                    autoCapitalize="none"
                />
            </View>

            {/* Lista de Gêneros Literários
            {generos && generos.length > 0 && (
              <View>
                <Text>Gêneros:</Text>
                {generos.map((genero, index) => (
                  <Text key={index}>
                    {genero}
                  </Text>
                ))}
              </View>
            )} */}

          </>
        ) : (
          <Text>Não foi possível carregar os dados do livro.</Text>
        )}

    </ScrollView>
  </>
  );
}