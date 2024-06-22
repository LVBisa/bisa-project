import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import * as DocumentPicker from "expo-document-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";

const CreateCoursePoster = ({ onChange }) => {
  let [selectedFile, setSelectedFile] = useState(null);

  const onUpload = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });

    if (result.type === "success") {
      const { name, size, uri } = result;

      const response = await fetch(uri);
      const blob = await response.blob();

      const storageRef = ref(storage, `poster/${name}`);
      await uploadBytes(storageRef, blob);

      const url = await getDownloadURL(storageRef);
      setSelectedFile(url);
      onChange(url);
    }
  }

  return (
    <View>
      <Text style={styles.posterText}>Poster</Text>
      <View style={styles.dropbox}>
        {selectedFile ?
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image source={{ uri: selectedFile }} style={{ width: 100, height: 110 }} />
          </View>
          :
          <Text style={styles.dropboxDesc}>
            Click upload button below to upload your poster
          </Text>}
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.uploadInput} onPress={() => onUpload()}>
            <Text style={styles.uploadText}>{selectedFile ? "Change" : "Upload"}</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  posterText: {
    fontSize: 14,
    paddingTop: 20,
    fontFamily: "Inter-Regular",
    fontWeight: "bold",
  },

  dropbox: {
    width: 333,
    height: 177,
    backgroundColor: "#EDFFFF",
    justifyContent: "center",
    marginTop: 5,
  },

  dropboxDesc: {
    fontSize: 11,
    textAlign: "center",
    paddingHorizontal: 50,
    color: "#6E7787",
    fontFamily: "Inter-Regular",
  },

  uploadInput: {
    width: 87,
    height: 28,
    justifyContent: "center",
    backgroundColor: "#1C61C7",
    marginTop: 20,
  },

  uploadText: {
    fontSize: 11,
    color: "white",
    textAlign: "center",
    fontFamily: "Inter-Regular",
  },
});

export default CreateCoursePoster;
