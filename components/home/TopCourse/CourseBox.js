import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const CourseBox = ({
  title,
  authorName,
  courseDescription,
  endDate,
  price,
  subtitle,
  poster,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.layout}
      onPress={() =>
        navigation.navigate("CourseDetail", {
          title: title,
          authorName: authorName,
          courseDescription: courseDescription,
          endDate: endDate,
          price: price,
          subtitle: subtitle,
          poster: poster,
        })
      }
    >
      <Image
        style={styles.image}
        source={require("../../../assets/images/course-sample.png")}
      />
      <Text style={styles.title}>{title}</Text>
      <View style={{ flexDirection: "row" }}>
        <Image
          style={{ marginTop: 2 }}
          source={require("../../../assets/images/person.png")}
        />
        <Text style={styles.author}>{authorName}</Text>
      </View>
      <Text style={styles.price}>Rp. {price}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  layout: {
    paddingTop: 10,
    paddingLeft: 20,
  },
  image: {
    borderRadius: 10,
    width: 205,
    height: 104,
  },
  title: {
    fontSize: 16,
    fontFamily: "Inter-Bold",
  },

  author: {
    paddingLeft: 5,
    fontSize: 13,
    fontFamily: "Inter-Bold",
    color: "#C2B6B6",
  },

  price: {
    fontSize: 13,
    fontFamily: "Inter-Bold",
    color: "#1C61C7",
    paddingTop: 2,
  },
});

export default CourseBox;
