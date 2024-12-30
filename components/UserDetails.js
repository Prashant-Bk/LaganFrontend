import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
// themecolor
const themecolor = "#2cabdf";
import { get_data } from "../api/user_api";
import { YouHaveNo } from "./Reuseables";
import ReadModelComponet from "./ReadModelComponent";

export default function UserProfile({ navigation, route }) {
  const { user } = route.params; // Get the user data passed from UserList screen
  console.log("inside UserPhotos", user, "<--");

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fieldsToSkip = ["profile_picture", "url", "user"];

  const handleComponentNavigationPress = ({
    my_user,
    my_component,
    my_model,
  }) => {
    // console.log(data);
    console.log(
      "handleComponentNavigationPress",
      "user",
      my_user,
      "model",
      my_model,
      "component",
      my_component
    );
    console.log("handalled", my_component, "press");
    if (my_component === "Photos") {
      navigation.navigate("UserPhotos", {
        user: my_user,
      });
    } else {
      navigation.navigate("ReadModelComponent", {
        user: my_user,
        component: my_component,
        model: my_model,
      });
    }
  };

  useEffect(() => {
    (async (user) => {
      try {
        console.log("Fetching profile data...");
        let profiledata = await get_data("primaryprofile", user);
        setProfileData(profiledata);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    })(user);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={themecolor} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (profileData) {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.heading}>User Profile</Text>

        {profileData.profile_picture && (
          <Image
            source={{
              uri: profileData.profile_picture,
            }}
            style={styles.profileImage}
          />
        )}

        <Text style={styles.text}>
          <Text style={styles.label}>Username:</Text> {user.username}
        </Text>

        {Object.entries(profileData).map(([key, value]) => {
          if (value && !fieldsToSkip.includes(key)) {
            return (
              <Text key={key} style={styles.text}>
                <Text style={styles.label}>{key.replace(/_/g, " ")}:</Text>{" "}
                {value}
              </Text>
            );
          }
          return null;
        })}

        {/* Navigation Buttons */}

        {/* TouchableOpacity Buttons */}
        <TouchableOpacity
          style={styles.navbutton}
          onPress={() => {
            handleComponentNavigationPress({
              my_user: user,
              my_component: "Photos",
            });
          }}
        >
          <Text style={styles.navbuttonText}>Go to Photos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navbutton}
          onPress={() => {
            handleComponentNavigationPress({
              my_user: user,
              my_component: "ReadModelComponet",
              my_model: "secondaryprofile",
            });
          }}
        >
          <Text style={styles.navbuttonText}>Go to Secondary Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navbutton}
          onPress={() => {
            handleComponentNavigationPress({
              my_user: user,
              my_component: "ReadModelComponet",
              my_model: "lifestyle",
            });
          }}
        >
          <Text style={styles.navbuttonText}>Go to Lifestyle</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navbutton}
          onPress={() => {
            handleComponentNavigationPress({
              my_user: user,
              my_component: "ReadModelComponet",
              my_model: "interests",
            });
          }}
        >
          <Text style={styles.navbuttonText}>Go to Interests</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navbutton}
          onPress={() => {
            handleComponentNavigationPress({
              my_user: user,
              my_component: "ReadModelComponet",
              my_model: "partnerpreferences",
            });
          }}
        >
          <Text style={styles.navbuttonText}>Go to Partner Preferences</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  } else {
    console.log("got null profile data");
    return (
      <YouHaveNo
        Model={"Profile"}
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
