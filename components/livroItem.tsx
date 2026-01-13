import { BookResult } from "@/app/services/interfaces";
import useTheme from "@/hooks/useTheme";
import { Image, StyleSheet, Text, View } from "react-native";

const LivroItem = ({ item }: { item: BookResult }) => {
  const { colors } = useTheme(); 

  // Propriedades do livro
  const cover_url =  item.cover_thumbnail || item.cover_url || 'https://www.cranfield-colours.co.uk/wp-content/uploads/2022/01/cranfield-traditional-etching-ink-mid-black.jpg'
  const titulo_livro = item.title || 'Título desconhecido';
  const nomes_autores = item.author_name?.join(', ') || 'Autor desconhecido';

  const styles = StyleSheet.create({
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
      </View>
    </View>
  );
};

export default LivroItem;