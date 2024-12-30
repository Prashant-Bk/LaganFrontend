import { useEffect, useState } from "react";
import { getUsers } from "../api/user_api";

import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

export default function UserLists({ navigation }) {
  const [UsersData, setUsersData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        let data = await getUsers();
        setUsersData(data);
        console.log("FETCHED DATA by getUsers:", data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    })();
  }, []);

  const handleUsernamePress = (my_user) => {
    console.log("Handled", my_user.username);
    navigation.navigate("UserDetails", { user: my_user });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>User List</Text>
      {UsersData ? (
        <FlatList
          data={UsersData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.userItem}
              onPress={() => handleUsernamePress(item)}
            >
              <Text style={styles.userText}>{item.username}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2cabdf" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  userItem: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#FFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  userText: {
    fontSize: 18,
    color: "#2cabdf",
    fontWeight: "500",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#888",
  },
});
