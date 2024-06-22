import { useNavigation } from "@react-navigation/native";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";

const ResourceBox = ({
  authorMajor,
  authorName,
  title,
  datePosted,
  resourceUrl
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{ paddingLeft: 20, paddingTop: 10 }}
      onPress={() =>
        navigation.navigate("ResourceDetail", {
          authorMajor: authorMajor,
          authorName: authorName,
          title: title,
          datePosted: datePosted,
          resourceUrl: resourceUrl,
        })
      }
    >
      <View style={styles.layout}>
        <Image style={styles.image} source={{uri: resourceUrl}} />
      </View>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  layout: {
    width: 95,
    height: 95,
    backgroundColor: "#D9D9D9",
  },

  image: {
    marginLeft: 11,
    marginTop: 10,
    width: 72.83,
    height: 74.94,
  },

  text: {
    fontSize: 14,
    fontFamily: "Inter-Bold",
  },
});

export default ResourceBox;
