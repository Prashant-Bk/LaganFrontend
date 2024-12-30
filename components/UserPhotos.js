import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Text,
} from "react-native";
import { get_data } from "../api/user_api";
import { YouHaveNo } from "./Reuseables";

export default UserPhotos = ({ navigation, route }) => {
  const { user } = route.params; // Get the user data passed from UserDetailsscreen

  const [Photos, setPhotos] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // State for selected image
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

  useEffect(() => {
    (async (user) => {
      try {
        let photos = await get_data("photos", user);
        setPhotos(photos);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    })(user);
  }, []);

  const handleImagePress = (uri) => {
    setSelectedImage(uri); // Set the selected image URI
    setModalVisible(true); // Show the modal
  };

  if (Photos) {
    return (
      <View style={styles.photosContainer}>
        {/* Render Images */}
        {Photos.pic1 && (
          <TouchableOpacity onPress={() => handleImagePress(Photos.pic1)}>
            <Image source={{ uri: Photos.pic1 }} style={styles.extraImage} />
          </TouchableOpacity>
        )}
        {Photos.pic2 && (
          <TouchableOpacity onPress={() => handleImagePress(Photos.pic2)}>
            <Image source={{ uri: Photos.pic2 }} style={styles.extraImage} />
          </TouchableOpacity>
        )}
        {Photos.pic3 && (
          <TouchableOpacity onPress={() => handleImagePress(Photos.pic3)}>
            <Image source={{ uri: Photos.pic3 }} style={styles.extraImage} />
          </TouchableOpacity>
        )}

        {/* Modal for Enlarged Image */}
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
            {selectedImage && (
              <Image
                source={{ uri: selectedImage }}
                style={styles.largeImage}
              />
            )}
          </View>
        </Modal>
      </View>
    );
  } else {
    console.log("got null photos data");
    return (
      <YouHaveNo
        Model={"Photos"}
        username={user.username}
        navigation={navigation}
      />
    );
  }
};

const styles = StyleSheet.create({
  extraImage: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 10,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  photosContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  largeImage: {
    width: "90%",
    height: "70%",
    borderRadius: 10,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 20,
  },
  closeText: {
    color: "#333",
    fontSize: 16,
  },
});
