import { View, Text, StyleSheet, Modal } from "react-native";
import NavbarCreateEvent from "../../components/event/NavbarCreateEvent";
import CreateEventTextBox from "../../components/event/CreateEventTextBox";
import EventCalendar from "../../components/event/EventCalendar";
import { ScrollView } from "react-native-gesture-handler";
import CreateEventPoster from "../../components/event/CreateEventPoster";
import SendRequestButton from "../../components/event/SendRequestButton";
import CreateEventDescriptionInput from "../../components/event/CreateEventDescriptionInput";
import { useState } from "react";
import CreateEventPopup from "../../components/event/CreateEventPopup";
import { addDoc, collection } from "@firebase/firestore";
import { database } from "../../config/firebase";

const CreateEventScreen = ({ route }) => {
  const { eventId } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [poster, setPoster] = useState("");
  const [eventHost, setEventHost] = useState("");
  const [eventName, setEventName] = useState("");
  const [subtitle, setSubtitle] = useState("");

  async function AddEvent() {
    const now = new Date();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const year = now.getFullYear();
    const month = monthNames[now.getMonth()];
    const date = now.getDate();

    const dateFormat = `${month} ${date}, ${year}`;

    const docRef = await addDoc(collection(database, "Event"), {
      eventName: eventName,
      subtitle: subtitle,
      eventHost: eventHost,
      description: description,
      evenId: eventId,
      eventDate: eventDate,
      datePosted: dateFormat,
    });
    setModalVisible(!modalVisible);
  }

  function handleModal() {
    setModalVisible(!modalVisible);
  }

  function handleEventName(eventName) {
    setEventName(eventName);
  }

  function handleSubtitle(subtitle) {
    setSubtitle(subtitle);
  }

  function handleEventHost(eventHost) {
    setEventHost(eventHost);
  }

  function handleEventDate(eventDate) {
    setEventDate(eventDate);
  }

  function handleDescription(description) {
    setDescription(description);
  }

  const isDisabled =
    description == "" ||
    eventHost == "" ||
    eventName == "" ||
    subtitle == "" ||
    eventDate == "";

  return (
    <View style={styles.layout}>
      <Modal visible={modalVisible} transparent={true}>
        <View style={styles.popup}>
          <CreateEventPopup onChange={handleModal} />
        </View>
      </Modal>
      <NavbarCreateEvent />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40, alignItems: "center" }}
      >
        <View style={{ paddingTop: 15 }}>
          <CreateEventTextBox
            inputText="Event Title"
            inputDesc="Write your event name here!"
            onChangeText={handleEventName}
          />
          <CreateEventTextBox
            inputText="Event SubTitle"
            inputDesc="Write the event subtitle here!"
            onChangeText={handleSubtitle}
          />
          <CreateEventTextBox
            inputText="Event Host"
            inputDesc="Write the event host here!"
            onChangeText={handleEventHost}
          />
        </View>
        <View>
          <Text style={{ paddingTop: 20 }}>Event Date</Text>
          <View style={{ paddingTop: 15 }}>
            <EventCalendar onChangeDate={handleEventDate} />
          </View>
        </View>
        <CreateEventPoster />
        <CreateEventDescriptionInput
          inputText="Event Description"
          inputDesc="Write your event description here!"
          onChangeText={handleDescription}
        />
        <SendRequestButton onChange={AddEvent} isDisabled={isDisabled} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: "white",
  },

  popup: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CreateEventScreen;
