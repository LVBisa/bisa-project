import React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import Identifier from "./Identifier";
import { useNavigation } from "@react-navigation/native";

const Notes = ({
  authorMajor,
  authorName,
  title,
  datePosted,
  document,
  documentDetail,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ResourceDetail", {
          authorMajor: authorMajor,
          authorName: authorName,
          title: title,
          datePosted: datePosted,
          document: document,
          documentDetail: documentDetail,
        })
      }
    >
      <View style={styles.layout}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={document} />
        </View>
        <View style={styles.desc}>
          <Text style={styles.title}>{title}</Text>
          <Identifier
            img={require("../../assets/images/person-icon.png")}
            text={authorName}
          />
          <Identifier
            img={require("../../assets/images/clock.png")}
            text={datePosted}
          />
          <Identifier
            img={require("../../assets/images/building.png")}
            text={authorMajor}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  layout: {
    flexDirection: "row",
    width: 332,
    height: 121,
    backgroundColor: "#EEFCFF",
    borderRadius: 8,
    paddingLeft: 20,
    paddingTop: 15,
  },

  imageContainer: {
    width: 90,
    height: 90,
    backgroundColor: "#D9D9D9",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: 69,
    height: 71,
  },

  desc: {
    paddingLeft: 20,
  },

  title: {
    fontSize: 14,
    fontFamily: "Inter-Bold",
  },
});

export default Notes;
