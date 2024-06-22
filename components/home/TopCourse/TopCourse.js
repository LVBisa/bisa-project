import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { collection, query, getDocs } from "firebase/firestore";
import { database } from "../../../config/firebase";
import CourseBox from "./CourseBox";
import { useNavigation } from "@react-navigation/native";

const TopCourse = () => {
  const [course, setCourse] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseCollections = collection(database, "Course");
        const q = query(courseCollections);
        const querySnapshot = await getDocs(q);

        const coursesData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
        }));

        setCourse(coursesData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCourse();
  }, []);
  return (
    <View>
      <View style={styles.layout}>
        <Text style={styles.TopText}>Top Course</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Mentor")}>
          <Text style={styles.seeAll}>See All &gt;</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal={true}>
        {course.map((courseData) => {
          return (
            <CourseBox
              key={courseData.courseId}
              title={courseData.title}
              authorName={courseData.authorName}
              courseDescription={courseData.courseDescription}
              endDate={courseData.endDate}
              price={courseData.price}
              subtitle={courseData.subtitle}
              poster={courseData.poster}
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

export default TopCourse;
