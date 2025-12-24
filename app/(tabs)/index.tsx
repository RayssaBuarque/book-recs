// import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <Text>Olá Mundo!</Text>
      {/* <Link href={"/pages/book"}>Ir para a página de livros</Link> */}
    </View>
  );
}

const styles = StyleSheet.create({
  // Estilos para centralizar o texto na tela
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});
