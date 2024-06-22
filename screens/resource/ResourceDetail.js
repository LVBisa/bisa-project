import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
  ScrollView,
  Linking
} from "react-native";
import BackArrow from "../../components/UI/BackArrow";

export default function App({ route }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const {
    authorMajor,
    authorName,
    title,
    datePosted,
    resourceUrl,
  } = route.params;

  const handleBookmarkPress = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleDownloadPress = async () => {
    await Linking.openURL(resourceUrl);
    // setModalVisible(true);
    // setTimeout(() => {
    //   setModalVisible(false);
    // }, 2000);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Download Complete!</Text>
          </View>
        </View>
      </Modal>

      <View style={styles.navbar}>
        <View style={styles.titleContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View>
              <BackArrow />
            </View>
          </TouchableOpacity>
          <Text style={styles.navbarText}>Resource Detail</Text>
        </View>
      </View>

      <ScrollView style={styles.body}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.details}>By : {authorName}</Text>
        <Text style={styles.details}>Uploaded at : {datePosted}</Text>
        <Text style={styles.details}>Major : {authorMajor}</Text>
        <TouchableOpacity
          style={styles.downloadButton}
          onPress={handleDownloadPress}
        >
          <Text style={styles.downloadText}>Download</Text>
        </TouchableOpacity>
        <Image
          source={{uri: resourceUrl}} // Use require for local images
          style={styles.fullImage}
        />
        {/* <TouchableOpacity onPress={handleBookmarkPress}>
          <FontAwesome
            name={isBookmarked ? "bookmark" : "bookmark-o"}
            size={24}
            color={isBookmarked ? "blue" : "black"}
          />
        </TouchableOpacity> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  navbar: {
    paddingTop: 40,
    paddingBottom: 20,
    marginLeft: -20,
    marginRight: -20,
    height: 90,
    width: Dimensions.get("window").width,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#A3A3A3",
    alignItems: "center",
  },
  navbarText: {
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 10,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
  },
  time: {
    fontSize: 16,
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  backButton: {
    marginBottom: 10,
  },
  backText: {
    fontSize: 16,
    color: "blue",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    marginBottom: 5,
  },
  downloadButton: {
    backgroundColor: "#38FF06",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  downloadText: {
    color: "white",
    fontSize: 16,
  },
  fullImage: {
    width: "100%",
    height: Dimensions.get("window").height - 200, // Adjust as needed to cover the screen
    resizeMode: "cover",
    marginBottom: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
