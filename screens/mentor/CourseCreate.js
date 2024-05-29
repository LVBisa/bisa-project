import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Modal } from 'react-native';
import NavbarCourseDetails from '../../components/courses/NavbarCourseDetails';
import { ScrollView } from 'react-native-gesture-handler';
import CourseDetails from '../../components/courses/CourseDetails';
import { useRoute } from '@react-navigation/native';
import CreateCourseTextBox from '../../components/courses/CreateCourseTextBox';
import NavbarCreateCourse from '../../components/courses/NavbarCreateCourse';
import CreateCoursePoster from '../../components/courses/CreateCoursePoster';
import CreateCourseDescriptionInput from '../../components/courses/CreateCourseDescriptionInput';
import SendRequestButton from '../../components/courses/SendRequestButton';
import CreateCoursePopup from '../../components/courses/CreateCoursePopup';
import CreateCourseCalendar from '../../components/courses/CreateCourseCalendar';


const CourseCreate = () => {
    const [modalVisible, setModalVisible] = useState(false);

    function handleModal() {
      setModalVisible(!modalVisible);
    }
    return (
        <View style={styles.layout}>
        <Modal visible={modalVisible} transparent={true}>
          <View style={styles.popup}>
            <CreateCoursePopup onChange={handleModal} />
          </View>
        </Modal>
        <NavbarCreateCourse />
        <ScrollView
          contentContainerStyle={{ paddingBottom: 40, alignItems: "center" }}
        >
          <View style={{ paddingTop: 15 }}>
            <CreateCourseTextBox
              inputText="Course Title"
              inputDesc="Write the title of this course"
            />
            <CreateCourseTextBox
              inputText="Sub Title"
              inputDesc="Write the subtitle of this course!"
            />
          </View>
          <CreateCoursePoster />
          <CreateCourseCalendar 
              inputText="End Date"
              inputDesc="YYYY/MM/DD"
          />
          <View>
            <CreateCourseTextBox
              inputText="Author Name"
              inputDesc="Write the author of this course"

            />
          </View>

          <CreateCourseDescriptionInput
            inputText="Course Description"
            inputDesc="Write the caption of this course"
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

export default CourseCreate;