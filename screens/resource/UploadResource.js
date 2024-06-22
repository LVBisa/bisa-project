import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Dimensions,
  TouchableOpacity,
  Modal,
  Image
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import BackArrow from "../../components/UI/BackArrow";
import { useNavigation } from "@react-navigation/native";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";
import * as DocumentPicker from "expo-document-picker";
import { updateDoc, getDocs, collection, addDoc, orderBy, query, onSnapshot, where, doc } from 'firebase/firestore';
import { database } from "../../config/firebase";

const UploadScreen = () => {
  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorMajor, setAuthorMajor] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  const onSubmit = () => {
    console.log(title, authorName, authorMajor, selectedFile);

    const option = { day: '2-digit', month: 'long', year: 'numeric' };
    const resourceRef = collection(database, "Resource");
    addDoc(resourceRef, {
      title: title,
      authorName: authorName,
      authorMajor: authorMajor,
      resourceUrl: selectedFile,
      datePosted: new Date().toLocaleDateString("en-US", option)
    });


    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    navigation.goBack();
  };


  const onUpload = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });

    if (result.type === "success") {
      const { name, size, uri } = result;

      const response = await fetch(uri);
      const blob = await response.blob();

      const storageRef = ref(storage, `resource/${name}`);
      await uploadBytes(storageRef, blob);

      const url = await getDownloadURL(storageRef);
      setSelectedFile(url);
    }
  }

  const isDisabled = title === "" || authorName === "" || authorMajor === "" || selectedFile === null;

  return (
    <ScrollView>
      <View style={styles.navbar}>
        <View style={styles.titleContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View>
              <Image source={require("../../assets/images/arrow-back.png")} style={{ height: 24 }} />
            </View>
          </TouchableOpacity>
          <Text style={styles.navbarText}>Create Resource</Text>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Write the title of this resource"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Author Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Write the author name of this resource"
            value={authorName}
            onChangeText={setAuthorName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Author Major</Text>
          <TextInput
            style={styles.input}
            placeholder="Write the author major of this resource"
            value={authorMajor}
            onChangeText={setAuthorMajor}
          />
        </View>

        <View style={[styles.inputContainer]}>
          <Text style={styles.label}>Document/Resource</Text>
          <View style={styles.dropbox}>
            {selectedFile ?
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image source={{ uri: selectedFile }} style={{ width: 100, height: 110 }} />
              </View>
              :
              <Text style={styles.dropboxDesc}>
                Click upload button below to upload your resource
              </Text>}
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity style={styles.uploadInput} onPress={() => onUpload()}>
                <Text style={styles.uploadText}>{selectedFile ? "Change" : "Upload"}</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>

        {/* <View style={styles.fileUpload}>
          <Text style={styles.fileText}>Upload Supported File</Text>
          <TouchableOpacity
            style={styles.fileButton}
            onPress={handleFileChange}
          >
            <Text style={styles.fileButtonText}>
              {file ? file.name : "Catatan Fisika"}
            </Text>
          </TouchableOpacity>
        </View> */}

        <View style={styles.buttonSubmit}>
          <TouchableOpacity style={styles.submitBtn} onPress={() => onSubmit()}
            disabled={isDisabled}
          >
            <Text style={[styles.submitText, isDisabled ? {backgroundColor: "#BDBDBD"} : null]}>
              Post Resource
            </Text>
          </TouchableOpacity>
        </View>

        {/* <Button title="Post Resource" onPress={handleSubmit} style={styles.submitBtn}/> */}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text>Your Resource Successfully Posted</Text>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  navbar: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
    height: 110,
    width: Dimensions.get("window").width,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#A3A3A3",
    alignItems: "center",
    backgroundColor: "white",
  },
  navbarText: {
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 10,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  navbarIcon: {
    flexDirection: "row",
    paddingRight: 10,
    alignItems: "center",
  },
  arrow: {
    height: 24,
    width: 24,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    height: Dimensions.get("window").height,
    backgroundColor: "white",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  fileUpload: {
    width: "100%",
    padding: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginVertical: 10,
    alignItems: "center",
  },
  fileText: {
    marginBottom: 10,
  },
  fileButton: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  fileButtonText: {
    color: "#007bff",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  closeButton: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
  },
  dropbox: {
    width: Dimensions.get("window").width - 40,
    height: 177,
    backgroundColor: "#EDFFFF",
    justifyContent: "center",
    marginTop: 5,
    alignItems: "center",
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

  submitBtn: {
    marginTop: 20,
  },

  submitText: {
    color: "white",
    backgroundColor: "#1C61C7",
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  buttonSubmit: {
    width: "100%",
    alignItems: "center",
  },
});

export default UploadScreen;
