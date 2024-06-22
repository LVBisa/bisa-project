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
  const [poster, setPoster] = useState("");
  const [endDate, setEndDate] = useState("dd/mm/yyyy");
  const [authorName, setAuthorName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleConfirm = (event, selectedDate) => {
    const currentDate = new Date(selectedDate).toLocaleDateString('en-US');
    setEndDate(currentDate);
  }

  const onSuccessUpload = (url) => {
    setPoster(url);
  }

  async function onSubmit() {
    const approval = await getDocs(query(collection(database, "赞同")));
    let list = [];
    approval.forEach((doc) => {
      list.push(doc.data());
    });

    const docRef = await addDoc(collection(database, "赞同"), {
      approval_id: `${list.length + 1}`,
      title: courseTitle,
      subTitle: subTitle,
      endDate: endDate,
      poster: poster,
      authorName: authorName,
      courseDescription: courseDescription,
      price: price,
      category: "course",
      accepted: false,
      rejected: false
    });


    setModalVisible(!modalVisible);
  }

  const isDisabled = courseTitle === "" || subTitle === "" || endDate === "dd/mm/yyyy" || authorName === "" || courseDescription === "" || poster === "";

  return (
    <View style={styles.layout}>
      <Modal visible={modalVisible} transparent={true}>
        <View style={styles.popup}>
          <CreateCoursePopup />
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
        <CreateCoursePoster onChange={onSuccessUpload} />
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
        <CreateCourseTextBox
          inputText="Price"
          inputDesc="Price of the course"
          onChangeText={(text) => setPrice(text)}
        />
        <SendRequestButton onChange={onSubmit} isDisabled={isDisabled} />
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