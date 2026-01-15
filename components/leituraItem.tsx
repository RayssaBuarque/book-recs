import { ShelfItem } from "@/app/services/interfaces";
import useTheme from "@/hooks/useTheme";
import { Image, StyleSheet, Text, View } from "react-native";
import EstrelasAvaliacao from "./estrelasAvaliacao";

const LeituraItem = ({ item }: { item: ShelfItem }) => {
  const { colors } = useTheme(); 

  // Propriedades do livro
  const cover_url =  item.capa_url || 'https://www.cranfield-colours.co.uk/wp-content/uploads/2022/01/cranfield-traditional-etching-ink-mid-black.jpg'
  const titulo_livro = item.titulo || 'Título desconhecido';
  const nomes_autores = item.autor_id || 'Autor desconhecido';
  const avaliacao = item.avaliacao || 0;

  const styles = StyleSheet.create({
    resultItem: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      width: 160,
      marginBottom: 10,
      backgroundColor: colors.surface,
    },
    resultCover: {
      width: 60,
      height: 90,
      borderRadius: 4,
      marginRight: 15,
    },
    resultInfo: {
      flex: 1,
      paddingTop: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    resultTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 4,
      textAlign: 'center',
    },
    resultAuthor: {
      fontSize: 14,
      color: colors.textMuted,textAlign: 'center',
    },
  });

  return (
    <View style={styles.resultItem}>
      <Image
        source={{ uri: cover_url }}
        style={styles.resultCover}
      />

      <View style={styles.resultInfo}>
        <Text style={styles.resultTitle} numberOfLines={2}>
          {titulo_livro}
        </Text>
        <Text style={styles.resultAuthor} numberOfLines={1}>
          {nomes_autores}
        </Text>

        <EstrelasAvaliacao
            avaliacao={avaliacao}
            cor={colors.warning}
            tamanho={18}
            ></EstrelasAvaliacao>
      </View>
    </View>
  );
};

export default LeituraItem;