import React, { act, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, TextInput, useWindowDimensions, Touchable, KeyboardAvoidingView, Platform, Modal, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { updateDoc, getDocs, collection, addDoc, orderBy, query, onSnapshot, where, doc } from 'firebase/firestore';
import { database } from '../../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataTable } from 'react-native-paper';

const ApprovalListScreen = () => {
    const navigation = useNavigation();

    const [isMentor, setMentor] = useState(null);
    const [isAdmin, setAdmin] = useState(null);
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [profilePicture, setPP] = useState(null);

    const [mentorList, setMentorList] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedMentor, setSelectedMentor] = useState(null);


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

    useEffect(() => {
        const q = query(collection(database, '赞同'), where('accepted', '==', false), where('rejected', '==', false));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const mentors = [];
            querySnapshot.forEach((doc) => {
                mentors.push(doc.data());
            });
            setMentorList(mentors);
        });
        return unsubscribe;
    }
        , []);

    const onApprove = async (mentor) => {
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

    const onReject = async (mentor) => {
        const getMentor = await getDocs(query(collection(database, '赞同'), where('approval_id', '==', mentor.approval_id)));
        const mentorData = getMentor.docs[0].id;

        const mentorRef = doc(database, '赞同', mentorData);
        await updateDoc(mentorRef, {
            rejected: true,
        });
    }

    const onPressDetail = (mentor) => {
        setModalVisible(true);
        setSelectedMentor(mentor);
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
                    {mentorList.length !== 0 ?
                        <View>
                        <View><Text style={styles.textNormal}>Mentor</Text></View>
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
                            {mentorList.map((item, index) => (
                                <DataTable.Row key={index}>
                                    <DataTable.Cell style={styles.cell}>
                                        <Text style={styles.textGrey}>
                                            {item.mentor_name}
                                        </Text>
                                    </DataTable.Cell>
                                    <DataTable.Cell style={styles.cell}>
                                        <TouchableOpacity onPress={() => onPressDetail(item)}>
                                            <Image source={images.eye} style={styles.arrow} />
                                        </TouchableOpacity>
                                    </DataTable.Cell>
                                    <DataTable.Cell style={styles.cell}>
                                        <TouchableOpacity onPress={() => onReject(item)}>
                                            <Image source={images.reject} style={styles.action} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => onApprove(item)}>
                                            <Image source={images.approve} style={styles.action} />
                                        </TouchableOpacity>
                                    </DataTable.Cell>
                                </DataTable.Row>
                            )
                            )}
                        </DataTable>
                    </View> : <Text style={styles.textGrey}>No list to be approved</Text>}
                </View>
            </ScrollView>
            <Modal visible={modalVisible} transparent={true} collapsable={true}>
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modal}>
                                <View style={{ width: "100%" }}>
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
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </KeyboardAvoidingView>
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
});

const images = {
    arrow: require("../../assets/images/arrow-back.png"),
    eye: require("../../assets/images/eye.png"),
    reject: require("../../assets/images/reject.png"),
    approve: require("../../assets/images/approve.png"),
    heart: require("../../assets/images/heart.png"),
};

export default ApprovalListScreen;