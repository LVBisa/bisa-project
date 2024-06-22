import React, { act, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, TextInput, useWindowDimensions, Touchable, KeyboardAvoidingView, Platform, Modal, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { updateDoc, getDocs, collection, addDoc, orderBy, query, onSnapshot, where, doc } from 'firebase/firestore';
import { database } from '../../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataTable } from 'react-native-paper';
import EventInfo from '../../components/event/EventInfo';

const ApprovalListScreen = () => {
    const navigation = useNavigation();

    const [isMentor, setMentor] = useState(null);
    const [isAdmin, setAdmin] = useState(null);
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [profilePicture, setPP] = useState(null);

    const [courseList, setCourseList] = useState([]);
    const [mentorList, setMentorList] = useState([]);
    const [eventList, setEventList] = useState([]);
    const [resourceList, setResourceList] = useState([]);

    const [modalVisibleCourse, setModalVisibleCourse] = useState(false);
    const [modalVisibleMentor, setModalVisibleMentor] = useState(false);
    const [modalVisibleEvent, setModalVisibleEvent] = useState(false);
    const [modalVisibleResource, setModalVisibleResource] = useState(false);

    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedMentor, setSelectedMentor] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedResource, setSelectedResource] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            const m = await AsyncStorage.getItem('is_mentor');
            const a = await AsyncStorage.getItem('is_admin');
            const ui = await AsyncStorage.getItem('user_id');
            const un = await AsyncStorage.getItem('username');
            const e = await AsyncStorage.getItem('email');
            const pp = await AsyncStorage.getItem('profile_picture');

            setMentor(m);
            setAdmin(a);
            setUserId(ui);
            setUsername(un);
            setEmail(e);
            setPP(pp);
        };

        fetchData();
    }, []);

    // Course
    useEffect(() => {
        const q = query(collection(database, '赞同'), where('accepted', '==', false), where('rejected', '==', false), where('category', '==', 'course'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const courses = [];
            querySnapshot.forEach((doc) => {
                courses.push(doc.data());
            });
            setCourseList(courses);
        });
        return unsubscribe;
    }, []);

    // Mentor
    useEffect(() => {
        const q = query(collection(database, '赞同'), where('accepted', '==', false), where('rejected', '==', false), where('category', '==', 'mentor'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const mentors = [];
            querySnapshot.forEach((doc) => {
                mentors.push(doc.data());
            });
            setMentorList(mentors);
        });
        return unsubscribe;
    }, []);

    // Event
    useEffect(() => {
        const q = query(collection(database, '赞同'), where('accepted', '==', false), where('rejected', '==', false), where('category', '==', 'event'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const events = [];
            querySnapshot.forEach((doc) => {
                events.push(doc.data());
            });
            setEventList(events);
        });
        return unsubscribe;
    }, []);

    // Resource
    useEffect(() => {
        const q = query(collection(database, '赞同'), where('accepted', '==', false), where('rejected', '==', false), where('category', '==', 'resource'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const resources = [];
            querySnapshot.forEach((doc) => {
                resources.push(doc.data());
            });
            setResourceList(resources);
        });
        return unsubscribe;
    }, []);

    const onApproveCourse = async (course) => {
        const getData = await getDocs(query(collection(database, '赞同'), where('approval_id', '==', course.approval_id)));
        const datas = getData.docs[0].id;

        const ref = doc(database, '赞同', datas);
        await updateDoc(ref, {
            accepted: true,
        });

        const courseRef = collection(database, "Course");
        await addDoc(courseRef, {
            title: course.title,
            subTitle: course.subTitle,
            endDate: course.endDate,
            poster: course.poster,
            authorName: course.authorName,
            courseDescription: course.courseDescription,
            price: course.price,
        });
    }

    const onApproveMentor = async (mentor) => {
        const getMentor = await getDocs(query(collection(database, '赞同'), where('approval_id', '==', mentor.approval_id)));
        const mentorData = getMentor.docs[0].id;

        const mentorRef = doc(database, '赞同', mentorData);
        await updateDoc(mentorRef, {
            accepted: true,
        });

        const getMentor2 = await getDocs(query(collection(database, '用户'), where('user_id', '==', mentor.user_id)));
        const mentorData2 = getMentor2.docs[0].id;

        const mentorRef2 = doc(database, '用户', mentorData2);
        await updateDoc(mentorRef2, {
            is_mentor: true,
            about: mentor.about,
            experience: mentor.experience,
            course: mentor.role,
        });
    }

    const onApproveEvent = async (event) => {
        const getData = await getDocs(query(collection(database, '赞同'), where('approval_id', '==', event.approval_id)));
        const datas = getData.docs[0].id;

        const ref = doc(database, '赞同', datas);
        await updateDoc(ref, {
            accepted: true,
        });

        const eventRef = collection(database, "Event");
        await addDoc(eventRef, {
            eventName: event.eventName,
            subtitle: event.subtitle,
            eventHost: event.eventHost,
            description: event.description,
            poster: event.poster,
            eventId: event.eventId,
            eventDate: event.eventDate,
            datePosted: event.datePosted,
        });
    }

    const onApproveResource = async (resource) => {
        const getData = await getDocs(query(collection(database, '赞同'), where('approval_id', '==', resource.approval_id)));
        const datas = getData.docs[0].id;

        const ref = doc(database, '赞同', datas);
        await updateDoc(ref, {
            accepted: true,
        });

        const resourceRef = collection(database, "Resource");
        await addDoc(resourceRef, {
            title: resource.title,
            authorName: resource.authorName,
            authorMajor: resource.authorMajor,
            resourceUrl: resource.resourceUrl,
            datePosted: resource.datePosted,
        });
    }

    const onRejectCourse = async (course) => {
        const getData = await getDocs(query(collection(database, '赞同'), where('approval_id', '==', course.approval_id)));
        const datas = getData.docs[0].id;

        const ref = doc(database, '赞同', datas);
        await updateDoc(ref, {
            rejected: true,
        });
    }

    const onRejectMentor = async (mentor) => {
        const getData = await getDocs(query(collection(database, '赞同'), where('approval_id', '==', mentor.approval_id)));
        const datas = getData.docs[0].id;

        const ref = doc(database, '赞同', datas);
        await updateDoc(ref, {
            rejected: true,
        });
    }

    const onRejectEvent = async (event) => {
        const getData = await getDocs(query(collection(database, '赞同'), where('approval_id', '==', event.approval_id)));
        const datas = getData.docs[0].id;

        const ref = doc(database, '赞同', datas);
        await updateDoc(ref, {
            rejected: true,
        });
    }

    const onRejectResource = async (resource) => {
        const getData = await getDocs(query(collection(database, '赞同'), where('approval_id', '==', resource.approval_id)));
        const datas = getData.docs[0].id;

        const ref = doc(database, '赞同', datas);
        await updateDoc(ref, {
            rejected: true,
        });
    }

    const onPressDetailCourse = (course) => {
        setModalVisibleCourse(true);
        setSelectedCourse(course);
    }

    const onPressDetailMentor = (mentor) => {
        setModalVisibleMentor(true);
        setSelectedMentor(mentor);
    }

    const onPressDetailEvent = (event) => {
        setModalVisibleEvent(true);
        setSelectedEvent(event);
    }

    const onPressDetailResource = (resource) => {
        setModalVisibleResource(true);
        setSelectedResource(resource);
    }

    formatDate = (date) => {
        if (date === "Now") return date;
        const dateStr = new Date(date);

        const options = { year: 'numeric', month: 'long' };
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(dateStr);
        return formattedDate
    }
    return (
        <KeyboardAvoidingView
            style={styles.layout}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        >
            <View style={styles.navbar}>
                <View style={styles.titleContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <View>
                            <Image source={images.arrow} style={{ height: 24 }} />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.navbarText}>Admin Approval</Text>
                </View>
            </View>
            <ScrollView>
                <View style={styles.approvalContainer}>
                    {/* COURSE */}
                    {courseList.length !== 0 ?
                        <View style={{ marginBottom: 20 }}>
                            <View><Text style={styles.textNormal}>Course</Text></View>
                            <DataTable style={styles.table}>
                                <DataTable.Header style={styles.header}>
                                    <DataTable.Title style={{ justifyContent: "center", alignItems: "center" }}>
                                        <Text style={styles.tableTitle}>
                                            Title
                                        </Text>
                                    </DataTable.Title>
                                    <DataTable.Title style={{ justifyContent: "center", alignItems: "center" }}>
                                        <Text style={styles.tableTitle}>
                                            Detail
                                        </Text>
                                    </DataTable.Title>
                                    <DataTable.Title style={{ justifyContent: "center", alignItems: "center" }}>
                                        <Text style={styles.tableTitle}>
                                            Action
                                        </Text>
                                    </DataTable.Title>
                                </DataTable.Header>
                                {courseList.map((item, index) => (
                                    <DataTable.Row key={index}>
                                        <DataTable.Cell style={styles.cell}>
                                            <Text style={styles.textGrey}>
                                                {item.title}
                                            </Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={styles.cell}>
                                            <TouchableOpacity onPress={() => onPressDetailCourse(item)}>
                                                <Image source={images.eye} style={styles.arrow} />
                                            </TouchableOpacity>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={styles.cell}>
                                            <TouchableOpacity onPress={() => onRejectCourse(item)}>
                                                <Image source={images.reject} style={styles.action} />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => onApproveCourse(item)}>
                                                <Image source={images.approve} style={styles.action} />
                                            </TouchableOpacity>
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                )
                                )}
                            </DataTable>
                        </View> : <Text style={[styles.textGrey, { marginBottom: 20 }]}>No course list to be approved</Text>}

                    {/* MENTOR */}
                    {mentorList.length !== 0 ?
                        <View style={{ marginBottom: 20 }}>
                            <View><Text style={styles.textNormal}>Mentor</Text></View>
                            <DataTable style={styles.table}>
                                <DataTable.Header style={styles.header}>
                                    <DataTable.Title style={{ justifyContent: "center", alignItems: "center" }}>
                                        <Text style={styles.tableTitle}>
                                            Name
                                        </Text>
                                    </DataTable.Title>
                                    <DataTable.Title style={{ justifyContent: "center", alignItems: "center" }}>
                                        <Text style={styles.tableTitle}>
                                            Detail
                                        </Text>
                                    </DataTable.Title>
                                    <DataTable.Title style={{ justifyContent: "center", alignItems: "center" }}>
                                        <Text style={styles.tableTitle}>
                                            Action
                                        </Text>
                                    </DataTable.Title>
                                </DataTable.Header>
                                {mentorList.map((item, index) => (
                                    <DataTable.Row key={index}>
                                        <DataTable.Cell style={styles.cell}>
                                            <Text style={styles.textGrey}>
                                                {item.mentor_name}
                                            </Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={styles.cell}>
                                            <TouchableOpacity onPress={() => onPressDetailMentor(item)}>
                                                <Image source={images.eye} style={styles.arrow} />
                                            </TouchableOpacity>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={styles.cell}>
                                            <TouchableOpacity onPress={() => onRejectMentor(item)}>
                                                <Image source={images.reject} style={styles.action} />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => onApproveMentor(item)}>
                                                <Image source={images.approve} style={styles.action} />
                                            </TouchableOpacity>
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                )
                                )}
                            </DataTable>
                        </View> : <Text style={[styles.textGrey, { marginBottom: 20 }]}>No mentor list to be approved</Text>}

                    {/* EVENT */}
                    {eventList.length !== 0 ?
                        <View style={{ marginBottom: 20 }}>
                            <View><Text style={styles.textNormal}>Event</Text></View>
                            <DataTable style={styles.table}>
                                <DataTable.Header style={styles.header}>
                                    <DataTable.Title style={{ justifyContent: "center", alignItems: "center" }}>
                                        <Text style={styles.tableTitle}>
                                            Title
                                        </Text>
                                    </DataTable.Title>
                                    <DataTable.Title style={{ justifyContent: "center", alignItems: "center" }}>
                                        <Text style={styles.tableTitle}>
                                            Detail
                                        </Text>
                                    </DataTable.Title>
                                    <DataTable.Title style={{ justifyContent: "center", alignItems: "center" }}>
                                        <Text style={styles.tableTitle}>
                                            Action
                                        </Text>
                                    </DataTable.Title>
                                </DataTable.Header>
                                {eventList.map((item, index) => (
                                    <DataTable.Row key={index}>
                                        <DataTable.Cell style={styles.cell}>
                                            <Text style={styles.textGrey}>
                                                {item.eventName}
                                            </Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={styles.cell}>
                                            <TouchableOpacity onPress={() => onPressDetailEvent(item)}>
                                                <Image source={images.eye} style={styles.arrow} />
                                            </TouchableOpacity>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={styles.cell}>
                                            <TouchableOpacity onPress={() => onRejectEvent(item)}>
                                                <Image source={images.reject} style={styles.action} />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => onApproveEvent(item)}>
                                                <Image source={images.approve} style={styles.action} />
                                            </TouchableOpacity>
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                )
                                )}
                            </DataTable>
                        </View> : <Text style={[styles.textGrey, { marginBottom: 20 }]}>No event list to be approved</Text>}

                    {/* RESOURCE */}
                    {resourceList.length !== 0 ?
                        <View style={{ marginBottom: 20 }}>
                            <View><Text style={styles.textNormal}>Resource</Text></View>
                            <DataTable style={styles.table}>
                                <DataTable.Header style={styles.header}>
                                    <DataTable.Title style={{ justifyContent: "center", alignItems: "center" }}>
                                        <Text style={styles.tableTitle}>
                                            Title
                                        </Text>
                                    </DataTable.Title>
                                    <DataTable.Title style={{ justifyContent: "center", alignItems: "center" }}>
                                        <Text style={styles.tableTitle}>
                                            Detail
                                        </Text>
                                    </DataTable.Title>
                                    <DataTable.Title style={{ justifyContent: "center", alignItems: "center" }}>
                                        <Text style={styles.tableTitle}>
                                            Action
                                        </Text>
                                    </DataTable.Title>
                                </DataTable.Header>
                                {resourceList.map((item, index) => (
                                    <DataTable.Row key={index}>
                                        <DataTable.Cell style={styles.cell}>
                                            <Text style={styles.textGrey}>
                                                {item.title}
                                            </Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={styles.cell}>
                                            <TouchableOpacity onPress={() => onPressDetailResource(item)}>
                                                <Image source={images.eye} style={styles.arrow} />
                                            </TouchableOpacity>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={styles.cell}>
                                            <TouchableOpacity onPress={() => onRejectResource(item)}>
                                                <Image source={images.reject} style={styles.action} />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => onApproveResource(item)}>
                                                <Image source={images.approve} style={styles.action} />
                                            </TouchableOpacity>
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                )
                                )}
                            </DataTable>
                        </View> : <Text style={[styles.textGrey, { marginBottom: 20 }]}>No resource list to be approved</Text>}
                </View>
            </ScrollView>
            {/* Course Modal */}
            <Modal visible={modalVisibleCourse} transparent={true} collapsable={true}>
                <TouchableWithoutFeedback onPress={() => setModalVisibleCourse(false)}>
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modal}>
                                <ScrollView style={{ width: "100%", paddingHorizontal: 20 }}>
                                    <Text style={styles.header}>{selectedCourse?.title}</Text>
                                    <Text style={styles.subheader}>{selectedCourse?.subtitle}</Text>
                                    <View style={styles.infoSection}>
                                        <View style={{ flexDirection: "row" }}>
                                            <Image
                                                style={{ marginTop: 3, marginRight: 5 }}
                                                source={require("../../assets/images/person.png")}
                                            />
                                            <Text> {selectedCourse?.authorName}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row" }}>
                                            <Image
                                                style={{ marginTop: 3, marginRight: 5 }}
                                                source={require("../../assets/images/clock.png")}
                                            />
                                            <Text>{selectedCourse?.endDate}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                        <Image
                                            style={{ marginTop: 15, width: 300, height: 435 }}
                                            source={{ uri: selectedCourse?.poster }}
                                        />
                                    </View>
                                    <Text style={styles.descriptionText}>{selectedCourse?.courseDescription}</Text>
                                </ScrollView>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            {/* Mentor Modal */}
            <Modal visible={modalVisibleMentor} transparent={true} collapsable={true}>
                <TouchableWithoutFeedback onPress={() => setModalVisibleMentor(false)}>
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modal}>
                                <ScrollView style={{ width: "100%" }}>
                                    <View style={styles.profile}>
                                        <Image source={{ uri: selectedMentor?.profile_picture }} style={{ width: 80, height: 80, borderRadius: 50 }}></Image>
                                        <Text style={styles.profileName}>{selectedMentor?.mentor_name}</Text>
                                        <Text style={styles.profileCourse}>{selectedMentor?.role}</Text>
                                    </View>
                                    <View style={styles.description}>
                                        <View>
                                            <Text style={styles.textBold}>About Me</Text>
                                            <Text style={styles.textGrey}>{selectedMentor?.about}</Text>
                                        </View>
                                        <View style={{ marginTop: 20 }}>
                                            <Text style={[styles.textBold]}>Experience</Text>
                                            {
                                                selectedMentor?.experience?.map((exp, index) => (
                                                    <View key={index} style={{ borderBottomWidth: 1, borderBottomColor: '#979797', paddingBottom: 10, marginBottom: 10 }}>
                                                        <Text style={styles.textLightBlack}>{exp.jobTitle}, {exp.companyName}</Text>
                                                        <Text style={[styles.textGrey, { marginHorizontal: 10, marginTop: 0 }]}>{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</Text>
                                                        <Text style={[styles.textGrey, { marginHorizontal: 10 }]}>{exp.description}</Text>
                                                    </View>
                                                ))
                                            }
                                        </View>
                                    </View>
                                </ScrollView>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            {/* Event Modal */}
            <Modal visible={modalVisibleEvent} transparent={true} collapsable={true}>
                <TouchableWithoutFeedback onPress={() => setModalVisibleEvent(false)}>
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modal}>
                                <ScrollView style={{ width: "100%", paddingHorizontal: 20 }}>
                                    <Text style={styles.header}>{selectedEvent?.eventName}</Text>
                                    <Text style={styles.subheader}>{selectedEvent?.subtitle}</Text>
                                    <View style={styles.infoSection}>
                                        <View>
                                            <EventInfo
                                                imageUrl={require("../../assets/images/person.png")}
                                                info={selectedEvent?.eventHost}
                                            />
                                        </View>
                                        <View>
                                            <EventInfo
                                                imageUrl={require("../../assets/images/clock.png")}
                                                info={selectedEvent?.datePosted}
                                            />
                                            <EventInfo
                                                imageUrl={require("../../assets/images/calendar.png")}
                                                info={selectedEvent?.eventDate}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                        <Image style={{ marginTop: 15, width: 300, height: 350 }} source={{ uri: selectedEvent?.poster }} />
                                    </View>
                                    <Text style={styles.descriptionText}>{selectedEvent?.description}</Text>
                                </ScrollView>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            {/* Resource Modal */}
            <Modal visible={modalVisibleResource} transparent={true} collapsable={true}>
                <TouchableWithoutFeedback onPress={() => setModalVisibleResource(false)}>
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modal}>
                                <ScrollView style={{ width: "100%", paddingHorizontal: 20 }}>
                                    <Text style={styles.title}>{selectedResource?.title}</Text>
                                    <Text style={styles.details}>By : {selectedResource?.authorName}</Text>
                                    <Text style={styles.details}>Uploaded at : {selectedResource?.datePosted}</Text>
                                    <Text style={styles.details}>Major : {selectedResource?.authorMajor}</Text>
                                    <Image
                                        source={{ uri: selectedResource?.resourceUrl }}
                                        style={{height: 300, }}
                                    />
                                </ScrollView>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal >

        </KeyboardAvoidingView >
    );
};

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor: "white",
        height: "100%"
    },
    arrow: {
        height: 24,
        width: 24,
    },
    navbar: {
        paddingTop: 60,
        paddingHorizontal: 24,
        paddingBottom: 20,
        height: 110,
        width: Dimensions.get("window").width,
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#A3A3A3",
        alignItems: "center",
        backgroundColor: "white",
    },
    navbarText: {
        fontWeight: "bold",
        fontSize: 20,
        marginLeft: 10,
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    navbarIcon: {
        flexDirection: "row",
        paddingRight: 10,
        alignItems: "center",
    },
    textBold: {
        fontWeight: "bold",
        fontSize: 14
    },
    textNormal: {
        fontSize: 14
    },
    approvalContainer: {
        marginHorizontal: 24,
        marginTop: 20,
    },
    tableTitle: {
        fontSize: 14,
        fontWeight: "bold",
        color: "black",
        fontFamily: "Inter-Bold",
        textAlign: "center",
        alignSelf: "center",
        width: "100%",
    },
    header: {
        justifyContent: "center",
        alignItems: "center",
    },
    table: {
        marginTop: 20,
        borderColor: "#ECECEC",
        borderWidth: 1,
    },
    cell: {
        justifyContent: "center",
        alignItems: "center",
    },
    textGrey: {
        color: "#979797",
        fontSize: 14,
    },
    action: {
        height: 24,
        width: 24,
    },
    modal: {
        backgroundColor: "white",
        maxHeight: "80%",
        width: "90%",
        // justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    profile: {
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 24,
        marginTop: 20,
        // backgroundColor: "#F6F6F6",
        paddingVertical: 20,
    },
    profileName: {
        fontFamily: "Inter-Bold",
        fontSize: 16,
        marginTop: 10,
        // height: 20,
    },
    profileCourse: {
        fontFamily: "Inter-Bold",
        fontSize: 14,
        color: "#C2B6B6"
    },
    profileLike: {
        flexDirection: "row",
        alignItems: "center"
    },
    description: {
        marginHorizontal: 24,
        marginTop: 20
    },
    header: {
        fontSize: 16,
        fontFamily: "Inter-Bold",
    },

    subheader: {
        fontSize: 13,
        color: "#979797",
        fontFamily: "Inter-Bold",
        paddingTop: 5,
    },

    infoSection: {
        paddingTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
    },

    descriptionText: {
        paddingTop: 10,
        textAlign: "justify",
        fontFamily: "Inter-Regular",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
      },
      details: {
        fontSize: 16,
        marginBottom: 5,
      },
});

const images = {
    arrow: require("../../assets/images/arrow-back.png"),
    eye: require("../../assets/images/eye.png"),
    reject: require("../../assets/images/reject.png"),
    approve: require("../../assets/images/approve.png"),
    heart: require("../../assets/images/heart.png"),
};

export default ApprovalListScreen;