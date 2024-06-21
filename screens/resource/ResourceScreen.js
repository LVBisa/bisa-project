import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Notes from "../../components/resource/Notes";
import BackArrow from "../../components/UI/BackArrow";
import { collection, query, getDocs } from "firebase/firestore";
import { database } from "../../config/firebase";

const ResourceScreen = () => {
  const [resource, setResource] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const resourceCollections = collection(database, "Resource");
        const q = query(resourceCollections);
        const querySnapshot = await getDocs(q);

        const resourceData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
        }));

        setResource(resourceData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchResource();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <View style={styles.titleContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View>
              <BackArrow />
            </View>
          </TouchableOpacity>
          <Text style={styles.navbarText}>Explore your need</Text>
        </View>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => navigation.navigate("UploadResource")}
        >
          <Image
            source={require("../../assets/images/upload-icon.png")}
            style={styles.uploadIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <Image source={require("../../assets/images/search.png")} />
        <TextInput style={styles.searchText} placeholder="Search" />
      </View>
      <Text style={styles.header}>Documents for you</Text>
      <ScrollView style={styles.listContainer}>
        {resource.map((resourceData) => {
          return (
            <Notes
              key={resourceData.resourceId}
              authorMajor={resourceData.authorMajor}
              authorName={resourceData.authorName}
              title={resourceData.title}
              datePosted={resourceData.datePosted}
              document={require("../../assets/images/document.png")}
              documentDetail={require("../../assets/images/resourceDetail.png")}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  arrow: {
    height: 24,
    width: 24,
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
  navbarIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
    paddingLeft: 15,
    width: Dimensions.get("window").width - 48,
    height: 40,
    backgroundColor: "#E2E1E1",
    opacity: 1,
    borderRadius: 12,
  },
  searchText: {
    paddingLeft: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  listContainer: {
    borderRadius: 12,
    padding: 10,
    flex: 1,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "#eefcff",
    borderRadius: 10,
  },
  documentImage: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  cardContent: {
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    color: "#555",
  },
  uploadButton: {
    padding: 10,
    marginRight: 20,
  },
  uploadIcon: {
    width: 24,
    height: 24,
  },
});

export default ResourceScreen;
