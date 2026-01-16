import { Stack } from 'expo-router';
import { Text, View } from 'react-native';
import { buscaStyles } from '../../styles/template_pagina';

export default function readSearch() {

  const busca_styles = buscaStyles();

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
      <Text style={busca_styles.titulo_pagina}>Minhas Leituras</Text>
      <Text style={busca_styles.texto}>Conteúdo da nova tela aqui...</Text>
    </View>
  </>
  );
}