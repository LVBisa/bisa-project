import React from 'react';
import { View, Text } from 'react-native';
import NavbarCourseDetails from '../../components/courses/NavbarCourseDetails';
import { ScrollView } from 'react-native-gesture-handler';
import CourseDetails from '../../components/courses/CourseDetails';
import { useRoute } from '@react-navigation/native';

const CourseDetail = () => {
    const route = useRoute();
    const { title } = route.params;
    const { person } = route.params;
    const { date } = route.params;
    const { courseImage } = route.params;

    return (
        <View>
            <NavbarCourseDetails/>
            <ScrollView>
                <CourseDetails 
                    title={title}
                    date={date}
                    courseImage={courseImage}
                    person={person}
                />
            </ScrollView>
        </View>
    );
};

export default CourseDetail;