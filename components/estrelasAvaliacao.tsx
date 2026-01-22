import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface EstrelasAvaliacaoProps {
  avaliacao: number;
  tamanho?: number;
  cor?: string;
  touch?: boolean;
  onAvaliacaoChange?: (notaAvaliacao:number) => void;
}

const EstrelasAvaliacao = ({
  avaliacao: avaliacaoInicial,
  tamanho = 24,
  cor,
  touch = false,
  onAvaliacaoChange
}: EstrelasAvaliacaoProps) => {

  // Estados que controlam a sensibilidade ao toque:
  const [avaliacaoAtual, setAvaliacaoAtual] = useState(avaliacaoInicial);
  const [avaliacaoTemporaria, setAvaliacaoTemporaria] = useState<number | null>(null);

  // Opções de avaliação permitidas (porque: sim)
  const opcoesAvaliacao = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]
  const notaParaExibir = avaliacaoTemporaria !== null ? avaliacaoTemporaria : avaliacaoAtual;
  
  // Garantir que a avaliação está entre 0 e 5
  const nota = Math.min(Math.max(notaParaExibir || 0, 0), 5);
  const estrelasCheias = Math.floor(nota);
  const temMeiaEstrela = nota % 1 >= 0.5;
  const estrelasVazias = 5 - estrelasCheias - (temMeiaEstrela ? 1 : 0);

  // Calcular a avaliação baseada na posição do toque (DeepSeek)
  const calcularAvaliacao = (posicaoToque: number) => {
    const larguraPorEstrela = 20;                                                     // Cada estrela ocupa 1/5 do espaço total (20%)
    const estrelaIndex = Math.ceil((posicaoToque / larguraPorEstrela) * 5);           // Determinar qual estrela foi tocada (1 a 5)
    const posicaoNaEstrela = (posicaoToque % larguraPorEstrela) / larguraPorEstrela;  // Determinar se foi tocada a metade esquerda ou direita

    // Definir o valor: metade esquerda = estrela anterior + 0.5, direita = estrela completa
    if (posicaoNaEstrela <= 0.5) {
      return Math.max(0, estrelaIndex - 0.5);
    } else {
      return estrelaIndex;
    }
  };

  // Função para tratar o toque em uma posição específica (DeepSeek)
  const handleTouch = (posicaoX: number, larguraTotal: number) => {
    if (!touch) return;
    
    // Calcular a posição em porcentagem (0 a 100)
    const posicaoPercentual = (posicaoX / larguraTotal) * 100;
    let avaliacaoCalculada = calcularAvaliacao(posicaoPercentual);

    // Arredondar para a opção mais próxima permitida
    const opcaoMaisProxima = opcoesAvaliacao.reduce((anterior, atual) => {
      return Math.abs(atual - avaliacaoCalculada) < Math.abs(anterior - avaliacaoCalculada) 
        ? atual 
        : anterior;
    });
    
    setAvaliacaoTemporaria(opcaoMaisProxima);
  };

  // Função para finalizar o toque e salvar a avaliação (DeepSeek)
  const handleTouchEnd = () => {
    if (!touch || avaliacaoTemporaria === null) return;
    
    // Atualizar a avaliação atual
    setAvaliacaoAtual(avaliacaoTemporaria);
    if (onAvaliacaoChange) {
      onAvaliacaoChange(avaliacaoTemporaria);
    }
    
    setAvaliacaoTemporaria(null); // Limpar a avaliação temporária
  };

  // Função para cancelar o toque se o usuário arrastar para fora (DeepSeek)
  const handleTouchCancel = () => {
    if (!touch) return;
    setAvaliacaoTemporaria(null);
  };

  const RenderEstrela = ({ index }: {index: number}) => {
    const valorEstrela = index + 1; // 1 a 5
    const preenchida = valorEstrela <= estrelasCheias;
    const meiaPreenchida = temMeiaEstrela && valorEstrela === estrelasCheias + 1;

    return (
      <View>
        {preenchida ? (
          <Ionicons name="star" size={tamanho} color={cor} />
        ) : meiaPreenchida ? (
          <View style={styles.meiaEstrelaContainer}>
            <Ionicons name="star-outline" size={tamanho} color={cor} />
            <View style={[styles.meiaEstrelaPreenchida, { width: tamanho / 2 }]}>
              <Ionicons name="star" size={tamanho} color={cor} />
            </View>
          </View>
        ) : (
          <Ionicons name="star-outline" size={tamanho} color={cor} />
        )}
      </View>
    );
  };

  // Se touch for falso, retorna um componente estático:
  if (!touch){
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
  }

  // Se touch for true, retornar o componente interativo
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.containerTouch}
      onPressIn={(e) => {
        // Obter a posição X do toque relativa ao componente
        const posicaoX = e.nativeEvent.locationX;
        const larguraTotal = 5 * (tamanho + 4); // 5 estrelas com margem
        handleTouch(posicaoX, larguraTotal);
      }}
      onPressOut={handleTouchEnd}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
    >
      {/* Renderizar as 5 estrelas */}
      {Array.from({ length: 5 }).map((_, index) => (
        <View key={`estrela-${index}`} style={styles.estrelaContainer}>
          <RenderEstrela index={index} />
        </View>
      ))}
      
      {/* Texto opcional mostrando o valor atual */}
      <View style={styles.valorContainer}>
        {/* Texto pode ser adicionado aqui se necessário */}
      </View>
    </TouchableOpacity>
  );

};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  containerTouch: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  estrela: {
    marginHorizontal: 2,
  },
  
  estrelaContainer: {
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
  
  valorContainer: {
    marginLeft: 10,
  },
});

export default EstrelasAvaliacao;