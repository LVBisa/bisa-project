import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { collection, query, getDocs } from "firebase/firestore";
import { database } from "../../../config/firebase";
import { useEffect, useState } from "react";
import EventBox from "./EventBox";
import { useNavigation } from "@react-navigation/native";

const TopEvent = () => {
  const [event, setEvent] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventCollections = collection(database, "Event");
        const q = query(eventCollections);
        const querySnapshot = await getDocs(q);

        const eventsData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
        }));

        setEvent(eventsData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEvent();
  }, []);

  return (
    <View>
      <View style={styles.layout}>
        <Text style={styles.TopText}>Top Event</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Event")}>
          <Text style={styles.seeAll}>See All &gt;</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal={true}>
        {event.map((eventData) => {
          return (
            <EventBox
              key={eventData.eventId}
              eventName={eventData.eventName}
              datePosted={eventData.datePosted}
              poster={require("../../../assets/images/event-image.png")}
              description={eventData.description}
              eventHost={eventData.eventHost}
              eventDate={eventData.eventDate}
              subtitle={eventData.subtitle}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  TopText: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
  },

  seeAll: {
    paddingTop: 8,
    fontSize: 12,
    color: "#0961F5",
    fontFamily: "Inter-ExtraBold",
  },
});

export default TopEvent;
