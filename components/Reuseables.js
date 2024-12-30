import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
const themecolor = "#2cabdf";

export const YouHaveNo = ({ Model, username, navigation }) => {
  console.log("insidfe you hanve no");
  console.log("Model:  ", Model, "navigation ", navigation);
  return (
    <View style={styles.container}>
      <Text style={styles.noProfileText}>
        {`Dear ${username}, you have no ${Model} data yet!`}
      </Text>
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => {
          //   navigation.navigate(`Create${Model}`);
          console.log("run: ", `Create ${Model} for ${username}`);
        }}
      >
        <Text style={styles.createButtonText}>Create {Model}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F9F9F9",
  },

  noProfileText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    color: "#888",
  },
  createButton: {
    backgroundColor: themecolor,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    width: "60%",
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
