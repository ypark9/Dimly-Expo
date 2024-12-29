import { View, Text, StyleSheet } from "react-native";

export default function FeedScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Reading Feed</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  text: {
    color: "#fff",
    fontSize: 20,
  },
});
