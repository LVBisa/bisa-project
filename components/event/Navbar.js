import { StyleSheet, View, Text, Dimensions } from "react-native";
import BackArrow from "../UI/BackArrow";
import CreateButton from "../UI/CreateButton";

const Navbar = ({ eventId }) => {
  return (
    <View style={styles.layout}>
      <View style={styles.leftLayout}>
        <BackArrow />
        <Text style={styles.headerText}>Event Page</Text>
      </View>
      <View style={styles.createEvent}>
        <CreateButton stack="CreateEvent" eventId={eventId} />
      </View>
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
    justifyContent: "space-between", // Distribute space between elements
    paddingRight: 15,
  },

  leftLayout: {
    flexDirection: "row",
  },

  headerText: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
    paddingLeft: 20,
  },

  createEvent: {
    paddingRight: 15,
  },
});

export default Navbar;
