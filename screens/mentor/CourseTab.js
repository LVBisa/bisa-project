import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Dimensions } from "react-native";
import CourseCard from "../../components/courses/CourseCard";
import { collection, query, getDocs } from "firebase/firestore";
import { database } from "../../config/firebase";

const CourseTab = () => {
  const [course, setCourse] = useState([]);

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
    <ScrollView>
      {course.map((courseData) => {
        return (
          <CourseCard
            key={courseData.courseId}
            authorName={courseData.authorName}
            poster={require("../../assets/images/course-sample.png")}
            title={courseData.title}
            endDate={courseData.endDate}
            courseDescription={courseData.courseDescription}
            price={"Rp. " + courseData.price}
            subtitle={courseData.subtitle}
          />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  list: {
    marginTop: 20,
    marginHorizontal: 24,
    paddingHorizontal: 16,
    width: Dimensions.get("window").width - 48,
    borderWidth: 0.4,
    borderRadius: 10,
    height: 130,
    flexDirection: "row",
    alignItems: "center",
  },
  listDescription: {
    flexDirection: "row",
    alignItems: "center",
  },
  listTitle: {
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "Inter-Bold",
  },
  listDetail: {
    flexDirection: "row",
    alignItems: "center",
  },
  listCourse: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: "#979797",
  },
  listPrice: {
    fontFamily: "Inter-Bold",
    fontSize: 12,
    color: "#1C61C7",
    marginTop: 10,
  },
});

const images = {
  course: require("../../assets/images/course-sample.png"),
  clock: require("../../assets/images/clock.png"),
  person: require("../../assets/images/person-icon.png"),
};

export default CourseTab;
