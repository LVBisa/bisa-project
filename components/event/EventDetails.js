import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import EventInfo from "./EventInfo";

const EventDetails = ({
  eventName,
  datePosted,
  poster,
  description,
  eventHost,
  eventDate,
  subtitle,
}) => {
  const windowWidth = Dimensions.get("window").width;
  const scale = 20 / windowWidth;

  return (
    <View
      style={[styles.container, { paddingHorizontal: windowWidth * scale }]}
    >
      <Text style={styles.header}>{eventName}</Text>
      <Text style={styles.subheader}>{subtitle}</Text>
      <View style={styles.infoSection}>
        <View>
          <EventInfo
            imageUrl={require("../../assets/images/person.png")}
            info={eventHost}
          />
        </View>
        <View>
          <EventInfo
            imageUrl={require("../../assets/images/clock.png")}
            info={datePosted}
          />
          <EventInfo
            imageUrl={require("../../assets/images/calendar.png")}
            info={eventDate}
          />
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Image style={{ marginTop: 15 }} source={poster} />
      </View>
      <Text style={styles.descriptionText}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 15,
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

export default EventDetails;
