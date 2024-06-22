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
import { getDocs, collection, addDoc, orderBy, query, onSnapshot, where } from 'firebase/firestore';
import { database } from '../../config/firebase';

const CourseCreate = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const [courseTitle, setCourseTitle] = useState("");
    const [subTitle, setSubTitle] = useState("");
    const [endDate, setEndDate] = useState("dd/mm/yyyy");
    const [authorName, setAuthorName] = useState("");
    const [courseDescription, setCourseDescription] = useState("");

    const handleConfirm = (event, selectedDate) => {
      const currentDate = new Date(selectedDate).toLocaleDateString('en-US');
      setEndDate(currentDate);      
    }

    async function handleModal() {
      console.log(courseTitle, subTitle, endDate, authorName, courseDescription)

      // const docRef = await addDoc(collection(database, "Course"), {
      //   courseTitle: courseTitle,
      //   subTitle: subTitle,
      //   endDate: endDate,
      //   authorName: authorName,
      //   courseDescription: courseDescription,
      // });


      // setModalVisible(!modalVisible);
    }

    const isDisabled = courseTitle === "" || subTitle === "" || endDate === "dd/mm/yyyy" || authorName === "" || courseDescription === "";

    return (
        <View style={styles.layout}>
        <Modal visible={modalVisible} transparent={true}>
          <View style={styles.popup}>
            <CreateCoursePopup/>
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
              onChangeText={(text) => setCourseTitle(text)}
            />
            <CreateCourseTextBox
              inputText="Sub Title"
              inputDesc="Write the subtitle of this course!"
              onChangeText={(text) => setSubTitle(text)}
            />
          </View>
          <CreateCoursePoster />
          <CreateCourseCalendar 
              inputText="End Date"
              inputDesc={endDate}
              onChange={handleConfirm}
          />
          <View>
            <CreateCourseTextBox
              inputText="Author Name"
              inputDesc="Write the author of this course"
              onChangeText={(text) => setAuthorName(text)}
            />
          </View>

          <CreateCourseDescriptionInput
            inputText="Course Description"
            inputDesc="Write the caption of this course"
            onChangeText={(text) => setCourseDescription(text)}
          />
          <SendRequestButton onChange={handleModal} isDisabled={isDisabled} />
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