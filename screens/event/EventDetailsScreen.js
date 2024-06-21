import { View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import NavbarEventDetails from "../../components/event/NavbarEventDetails";
import EventDetails from "../../components/event/EventDetails";
import { useRoute } from "@react-navigation/native";

const EventDetailsScreen = () => {
  const route = useRoute();
  const {
    eventName,
    datePosted,
    poster,
    description,
    eventHost,
    eventDate,
    subtitle,
  } = route.params;

  return (
    <View style={styles.layout}>
      <NavbarEventDetails />
      <ScrollView>
        <EventDetails
          eventName={eventName}
          datePosted={datePosted}
          poster={poster}
          description={description}
          eventHost={eventHost}
          eventDate={eventDate}
          subtitle={subtitle}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default EventDetailsScreen;
