import { useNavigation } from "@react-navigation/native";
import { Text, View, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const EventBox = ({
  eventName,
  datePosted,
  poster,
  description,
  eventHost,
  eventDate,
  subtitle,
}) => {
  const navigation = useNavigation();

  function toEventDetails() {
    navigation.navigate("EventDetails", {
      eventName: eventName,
      datePosted: datePosted,
      poster: poster,
      description: description,
      eventHost: eventHost,
      eventDate: eventDate,
      subtitle: subtitle,
    });
  }

  function descFormat(desc) {
    if (desc.length > 280) {
      return desc.substring(0, 280) + "...";
    }
    return desc;
  }

  return (
    <TouchableOpacity onPress={toEventDetails} style={styles.layout}>
      <Text style={styles.title}>{eventName}</Text>
      <Text style={styles.eventDate}>{datePosted}</Text>
      <View style={styles.imageLayout}>
        <Image style={{ width: 300, height: 350 }} source={{ uri: poster }} />        
      </View>
      <Text style={styles.description}>{descFormat(description)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  layout: {
    marginTop: 20,
    width: 335,
    // height: 350,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
  },

  title: {
    textAlign: "center",
    fontFamily: "Inter-Bold",
    fontSize: 15,
    paddingTop: 10,
  },

  eventDate: {
    textAlign: "right",
    paddingTop: 5,
    paddingRight: 20,
    color: "#C2B6B6",
    fontFamily: "Inter-Regular",
  },

  imageLayout: {
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
  },

  description: {
    fontSize: 12,
    paddingHorizontal: 15,
    paddingTop: 7,
    fontFamily: "Inter-Regular",
  },
});

export default EventBox;
