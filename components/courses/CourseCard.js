import {
  TouchableOpacity,
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const CourseCard = ({
  authorName,
  poster,
  title,
  endDate,
  courseDescription,
  price,
  subtitle,
}) => {
  const navigation = useNavigation();

  function toCourseDetails() {
    navigation.navigate("CourseDetail", {
      authorName: authorName,
      poster: poster,
      title: title,
      endDate: endDate,
      courseDescription: courseDescription,
      price: price,
      subtitle: subtitle,
    });
  }

  return (
    <TouchableOpacity onPress={toCourseDetails}>
      <View style={styles.list}>
        <View style={styles.listDescription}>
          <View style={{ marginRight: 10 }}>
            <Image source={{ uri: poster }} style={{ width: 100, height: 100 }} />
          </View>
          <View>
            <View style={{ alignItems: "flex-start" }}>
              <Text style={styles.listTitle}>{title}</Text>
              <View style={styles.listDetail}>
                <View style={{ width: 20 }}>
                  <Image
                    source={require("../../assets/images/person.png")}
                  ></Image>
                </View>
                <Text style={styles.listCourse}>{authorName}</Text>
              </View>
              <View style={styles.listDetail}>
                <View style={{ width: 20 }}>
                  <Image
                    source={require("../../assets/images/clock.png")}
                  ></Image>
                </View>
                <Text style={styles.listCourse}>{endDate}</Text>
              </View>
              <View>
                {
                  price === "Free" || price === "" || price === "0" || price === "free" ?
                    <Text style={styles.listPrice}>Free</Text> :
                  <Text style={styles.listPrice}>Rp. {price}</Text>
                }
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  list: {
    marginTop: 20,
    marginHorizontal: 24,
    paddingHorizontal: 16,
    width: Dimensions.get("window").width - 48,
    borderWidth: 0.4,
    borderRadius: 10,
    height: 130,
    flexDirection: "row",
    alignItems: "center",
  },
  listDescription: {
    flexDirection: "row",
    alignItems: "center",
  },
  listTitle: {
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "Inter-Bold",
  },
  listDetail: {
    flexDirection: "row",
    alignItems: "center",
  },
  listCourse: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: "#979797",
  },
  listPrice: {
    fontFamily: "Inter-Bold",
    fontSize: 12,
    color: "#1C61C7",
    marginTop: 10,
  },
});
export default CourseCard;
