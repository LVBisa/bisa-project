import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

const CourseDetails = ({
  authorName,
  poster,
  title,
  endDate,
  courseDescription,
  price,
  subtitle,
}) => {
  const windowWidth = Dimensions.get("window").width;
  const scale = 20 / windowWidth;

  return (
    <View
      style={[styles.container, { paddingHorizontal: windowWidth * scale }]}
    >
      <Text style={styles.header}>{title}</Text>
      <Text style={styles.subheader}>{subtitle}</Text>
      <View style={styles.infoSection}>
        <View style={{ flexDirection: "row" }}>
          <Image
            style={{ marginTop: 3, marginRight: 5 }}
            source={require("../../assets/images/person.png")}
          />
          <Text> {authorName}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Image
            style={{ marginTop: 3, marginRight: 5 }}
            source={require("../../assets/images/clock.png")}
          />
          <Text>{endDate}</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Image
          style={{ marginTop: 15, width: 300, height: 435 }}
          source={{uri: poster}}
        />
      </View>
      <Text style={styles.descriptionText}>{courseDescription}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: Dimensions.get("window").height,
    backgroundColor: "white",
    paddingTop: 15,
    paddingBottom: 20,
  },

  header: {
    fontSize: 16,
    fontFamily: "Inter-Bold",
  },

  subheader: {
    fontSize: 13,
    color: "#979797",
    fontFamily: "Inter-Bold",
    paddingTop: 5,
  },

  infoSection: {
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  descriptionText: {
    paddingTop: 10,
    textAlign: "justify",
    fontFamily: "Inter-Regular",
  },
});

export default CourseDetails;
