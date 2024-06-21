import React from "react";
import { View, Text } from "react-native";
import NavbarCourseDetails from "../../components/courses/NavbarCourseDetails";
import { ScrollView } from "react-native-gesture-handler";
import CourseDetails from "../../components/courses/CourseDetails";
import { useRoute } from "@react-navigation/native";

const CourseDetail = () => {
  const route = useRoute();
  const {
    authorName,
    poster,
    title,
    endDate,
    courseDescription,
    price,
    subtitle,
  } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <NavbarCourseDetails />
      <ScrollView>
        <CourseDetails
          authorName={authorName}
          poster={poster}
          title={title}
          endDate={endDate}
          courseDescription={courseDescription}
          price={price}
          subtitle={subtitle}
        />
      </ScrollView>
    </View>
  );
};

export default CourseDetail;
