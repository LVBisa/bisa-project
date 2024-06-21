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

const CreateEventScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  function handleModal() {
    setModalVisible(!modalVisible);
  }

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
          />
          <CreateEventTextBox
            inputText="Event SubTitle"
            inputDesc="Write the event subtitle here!"
          />
          <CreateEventTextBox
            inputText="Event Host"
            inputDesc="Write the event host here!"
          />
        </View>
        <View>
          <Text style={{ paddingTop: 20 }}>Event Date</Text>
          <View style={{ paddingTop: 15 }}>
            <EventCalendar />
          </View>
        </View>
        <CreateEventPoster />
        <CreateEventDescriptionInput
          inputText="Event Description"
          inputDesc="Write your event description here!"
        />
        <SendRequestButton onChange={handleModal} />
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
