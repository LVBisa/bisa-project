import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import Navbar from "../../components/event/Navbar";
import SearchBar from "../../components/event/SearchBar";
import EventBox from "../../components/event/EventBox";
import { collection, query, getDocs } from "firebase/firestore";
import { database } from "../../config/firebase";

const EventScreen = () => {
  const [event, setEvent] = useState([]);
  const [eventId, setEventId] = useState(0);

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    try {
      const eventCollections = collection(database, "Event");
      const q = query(eventCollections);
      const querySnapshot = await getDocs(q);

      const eventsData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      }));

      eventsData.sort((a, b) => b.eventId - a.eventId);

      if (eventsData.length > 0) {
        setEventId(eventsData[0].eventId + 1);
      } else {
        setEventId(1);
      }
      setEvent(eventsData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.backgroundLayout}>
      <Navbar eventId={eventId} />
      <View style={styles.layout}>
        <SearchBar />
        <View style={styles.eventBlock}>
          <Text style={styles.eventText}>Events</Text>
          <View style={styles.line} />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewLayout}>
        {event.map((eventData) => {
          return (
            <EventBox
              key={eventData.eventId}
              eventName={eventData.eventName}
              datePosted={eventData.datePosted}
              poster={require("../../assets/images/event-image.png")}
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
  backgroundLayout: {
    flex: 1,
    backgroundColor: "white",
  },

  layout: {
    height: 100,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 20,
  },

  eventText: {
    paddingTop: 2,
    fontSize: 16,
    color: "#1C61C7",
    textAlign: "center",
    fontFamily: "Inter-Regular",
  },

  line: {
    paddingTop: 10,
    borderBottomColor: "#1C61C7",
    borderBottomWidth: 3,
    width: 330,
  },

  scrollViewLayout: {
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: 40,
  },
});

export default EventScreen;
