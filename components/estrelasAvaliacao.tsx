import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface EstrelasAvaliacaoProps {
  avaliacao: number;
  tamanho?: number;
  cor?: string;
}

const EstrelasAvaliacao = ({avaliacao, tamanho = 24, cor}: EstrelasAvaliacaoProps) => {
  // Garantir que a avaliação está entre 0 e 5
  const nota = Math.min(Math.max(avaliacao || 0, 0), 5);
  const estrelasCheias = Math.floor(nota);
  const temMeiaEstrela = nota % 1 >= 0.5;
  const estrelasVazias = 5 - estrelasCheias - (temMeiaEstrela ? 1 : 0);

  return (
    <View style={styles.container}>
      {/* Estrelas cheias */}
      {Array.from({ length: estrelasCheias }).map((_, index) => (
        <Ionicons 
          key={`cheia-${index}`}
          name="star" 
          size={tamanho} 
          color={cor} 
          style={styles.estrela}
        />
      ))}
      
      {/* Meia estrela (se houver) */}
      {temMeiaEstrela && (
        <View style={styles.meiaEstrelaContainer}>
          <Ionicons 
            name="star-outline" 
            size={tamanho} 
            color={cor} 
            style={styles.estrela}
          />
          <View style={[styles.meiaEstrelaPreenchida, { width: tamanho / 2 }]}>
            <Ionicons 
              name="star" 
              size={tamanho} 
              color={cor} 
              style={styles.estrela}
            />
          </View>
        </View>
      )}
      
      {/* Estrelas vazias */}
      {Array.from({ length: estrelasVazias }).map((_, index) => (
        <Ionicons 
          key={`vazia-${index}`}
          name="star-outline" 
          size={tamanho} 
          color={cor} 
          style={styles.estrela}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  estrela: {
    marginHorizontal: 2,
  },
  meiaEstrelaContainer: {
    position: 'relative',
  },
  meiaEstrelaPreenchida: {
    position: 'absolute',
    overflow: 'hidden',
    left: 0,
  },
});

export default EstrelasAvaliacao;