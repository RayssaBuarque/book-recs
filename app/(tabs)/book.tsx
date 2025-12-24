import { StyleSheet, Text, View } from "react-native";

const Book = () => {
  return (
    <View style={styles.container}>
      <Text>This is the Book Page.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});

export default Book;