import React from 'react';
import { ScrollView, StyleSheet, Dimensions } from 'react-native';
import CourseCard from '../../components/courses/CourseCard';

const CourseTab = () => {

    return (
        <ScrollView>
            <CourseCard imageUrl={require("../../assets/images/course-sample.png")} title="Dacode: Season 4" author="Devin Luise Saan" date="12 Februari 2024" price="Rp. 195.000"/> 
            <CourseCard imageUrl={require("../../assets/images/course-sample.png")} title="Dacode: Season 4" author="Devin Luise Saan" date="12 Februari 2024" price="Rp. 195.000"/> 
            <CourseCard imageUrl={require("../../assets/images/course-sample.png")} title="Dacode: Season 4" author="Devin Luise Saan" date="12 Februari 2024" price="Rp. 195.000"/> 
            <CourseCard imageUrl={require("../../assets/images/course-sample.png")} title="Dacode: Season 4" author="Devin Luise Saan" date="12 Februari 2024" price="Rp. 195.000"/> 
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