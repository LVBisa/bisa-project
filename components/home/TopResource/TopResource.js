import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { collection, query, getDocs } from "firebase/firestore";
import { database } from "../../../config/firebase";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ResourceBox from "./ResourceBox";

const TopResource = () => {
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
    <View>
      <View style={styles.layout}>
        <Text style={styles.TopText}>Recommended Resource</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Resource")}>
          <Text style={styles.seeAll}>See All &gt;</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal={true}>
        {resource.map((resourceData) => {
          return (
            <ResourceBox
              key={resourceData.resourceId}
              authorMajor={resourceData.authorMajor}
              authorName={resourceData.authorName}
              title={resourceData.title}
              datePosted={resourceData.datePosted}
              document={require("../../../assets/images/document.png")}
              documentDetail={require("../../../assets/images/resourceDetail.png")}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  TopText: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
  },

  seeAll: {
    paddingTop: 8,
    fontSize: 12,
    color: "#0961F5",
    fontFamily: "Inter-ExtraBold",
  },
});

export default TopResource;
