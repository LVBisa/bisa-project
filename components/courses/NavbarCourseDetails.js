import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from "react-native";
import BackArrow from "../UI/BackArrow";

const NavbarCourseDetails = () => {
  return (
    <View style={styles.layout}>
        <View style={{ flexDirection: "row" }}>
            <BackArrow />
            <Text style={styles.headerText}>Course Details</Text>
        </View>
        {/* <TouchableOpacity>
            <Text style={styles.chatText}>Chat</Text>
        </TouchableOpacity> */}
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
    flexDirection: "row",
    justifyContent: "space-between",
  },

  headerText: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
    paddingLeft: 20,
  },

  chatText: {
    color: '#757474',
    fontSize: 15,
    paddingRight: 15,
    paddingTop: 5,
  }
});

export default NavbarCourseDetails;
