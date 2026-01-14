// import { Link } from "expo-router";
import { Text, View } from "react-native";
import templateStyles from "../styles/template_pagina";

export default function Index() {
  const page_styles = templateStyles();

  return (
    <View
      style={page_styles.container}
    >
      <Text style={page_styles.texto}>Olá Mundo!</Text>
      {/* <Link href={"/pages/book"}>Ir para a página de livros</Link> */}
    </View>
  );
}
