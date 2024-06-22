import { useNavigation } from "@react-navigation/native";
import {
  ImageBackground,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

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

  return (
    <TouchableOpacity
      style={{ paddingTop: 7 }}
      onPress={() =>
        navigation.navigate("EventDetails", {
          eventName: eventName,
          datePosted: datePosted,
          poster: poster,
          description: description,
          eventHost: eventHost,
          eventDate: eventDate,
          subtitle: subtitle,
        })
      }
    >
      <ImageBackground
        style={styles.layout}
        source={{uri: poster}}
      >
        <Text style={styles.text}>{eventName}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  layout: {
    width: 204,
    height: 124,
    borderRadius: 5,
    marginLeft: 20,
  },

  text: {
    fontSize: 16,
    fontFamily: "Inter-Bold",
    fontWeight: "bold",
    color: "white",
    paddingTop: 75,
    paddingLeft: 15,
  },
});

export default EventBox;
