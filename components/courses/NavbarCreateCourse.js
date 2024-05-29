import { View, Text, StyleSheet, Dimensions } from "react-native";
import BackArrow from "../UI/BackArrow";

const NavbarCreateCourse = () => {
  return (
    <View style={styles.layout}>
      <BackArrow />
      <Text style={styles.headerText}>Create Course</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    backgroundColor: "white",
    paddingTop: 60,
    paddingLeft: 15,
    flexDirection: "row",
    width: Dimensions.get("window").width,
    paddingBottom: 15,
    shadowColor: "#000",
    elevation: 2,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    zIndex: 1000,
  },

  headerText: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
    paddingLeft: 20,
  },
});

export default NavbarCreateCourse;
