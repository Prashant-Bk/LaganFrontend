import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
// themecolor
// themecolor
const themecolor = "#20b5f0";
import { get_data } from "../api/user_api";
import { YouHaveNo } from "./Reuseables";

export default function SecondaryProfile({ navigation, route }) {
  const { user } = route.params; // Get the user data passed from UserDetails screen
  const [SecondaryProfileData, setSecondaryProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fieldsToSkip = ["url", "user"];

  useEffect(() => {
    (async () => {
      try {
        console.log("Fetching Secondary data...");
        let secondaryprofiledata = await get_data("secondaryprofile", user);
        console.log("fetched secondaryprofiledata: ", secondaryprofiledata);
        setSecondaryProfileData(secondaryprofiledata);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={themecolor} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (SecondaryProfileData) {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.heading}>Secondary Profile</Text>

        <Text style={styles.text}>
          <Text style={styles.label}>Username:</Text> {user.username}
        </Text>

        {Object.entries(SecondaryProfileData).map(([key, value]) => {
          if (value && !fieldsToSkip.includes(key)) {
            return (
              <Text key={key} style={styles.text}>
                <Text style={styles.label}>{key.replace("_", " ")}:</Text>{" "}
                {value}
              </Text>
            );
          }
          return null;
        })}
      </ScrollView>
    );
  } else {
    console.log("got null secondary profile data");
    return (
      <YouHaveNo
        Model={"SecondaryProfile"}
        username={user.username}
        navigation={navigation}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F9F9F9",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#888",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: "center",
    marginBottom: 20,
    borderColor: themecolor,
    borderWidth: 2,
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
    color: "#555",
  },
  label: {
    fontWeight: "bold",
    color: themecolor,
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
  navbutton: {
    backgroundColor: "#007BFF", // Button color
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5, // Adds shadow on Android
    shadowColor: "#000", // Adds shadow on iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  navbuttonText: {
    color: "#fff", // Text color
    fontSize: 16,
    fontWeight: "bold",
  },
});
