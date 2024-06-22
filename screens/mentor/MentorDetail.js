import React, {useState, useEffect} from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { getDocs, collection, addDoc, orderBy, query, onSnapshot, where } from 'firebase/firestore';
import { database } from '../../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MentorDetail = ({ route }) => {
    const mentorData = route.params.mentor;
    const navigation = useNavigation();

    const [userId, setUserId] = useState(null);

    formatDate = (date) => {
        if (date === "Now") return date;
        const dateStr = new Date(date);

        const options = { year: 'numeric', month: 'long' };
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(dateStr);
        return formattedDate
    }
    
    useEffect(() => {
        const fetchData = async () => {
        const ui = await AsyncStorage.getItem('user_id');

        setUserId(ui);
        };

        fetchData();
    }, []);

    const onClickChat = async (mentor) => {
        const qChat = query(collection(database, '聊天列表'), where('user_id', '==', userId), where('mentor_id', '==', mentor.user_id));
        const q = query(collection(database, '聊天列表'));
        
        const chatlist = [];
        const allChatList = [];
    
        const allChatsSnapshot = await getDocs(q);
        allChatsSnapshot.forEach((doc) => {
            allChatList.push(doc.data());
        });
    
        const chatSnapshot = await getDocs(qChat);
        chatSnapshot.forEach((doc) => {
            chatlist.push(doc.data());
        });
    
        let chatRoomId;
        if (chatlist.length === 0) {
            chatRoomId = `${allChatList.length + 1}`;
            await addDoc(collection(database, '聊天列表'), {
                user_id: userId,
                mentor_id: mentor.user_id,
                m_profile_picture: mentor.profile_picture,
                mentor_name: mentor.username,
                profile_picture: profilePicture,
                username: username,
                chat_room_id: chatRoomId,
            });
        } else {
            chatRoomId = chatlist[0].chat_room_id;
        }
    
        mentor.chat_room_id = chatRoomId;
        mentor.m_profile_picture = mentor.profile_picture;
        mentor.mentor_name = mentor.username;
    
        navigation.navigate('Chat', { mentor });
    };
    return (
        <View>
            <View style={styles.navbar}>
                <View style={styles.titleContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <View>
                            <Image source={images.arrow} style={{ height: 24 }} />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.navbarText}>Explore your need</Text>
                </View>
                {
                    mentorData.user_id !== userId ?
                    <TouchableOpacity onPress={() => onClickChat(mentorData)}>
                    <View style={styles.navbarIcon}>
                        <Text style={styles.navbarChatText}>Chat</Text>
                    </View>
                </TouchableOpacity> : null}
            </View>
            <ScrollView style={{ height: Dimensions.get('window').height, backgroundColor: 'white' }}>
                <View style={styles.profile}>
                    <Image source={{ uri: mentorData.profile_picture }} style={{ width: 80, height: 80, borderRadius: 50 }}></Image>
                    <Text style={styles.profileName}>{mentorData.username}</Text>
                    <Text style={styles.profileCourse}>{mentorData.course}</Text>
                    {/* <View style={styles.profileLike}>
                        <Image source={images.heart}></Image>
                        <Text style={{ marginLeft: 10 }}>210 Likes</Text>
                    </View> */}
                </View>
                <View style={styles.description}>
                    <View>
                        <Text style={styles.textBold}>About Me</Text>
                        <Text style={styles.textGrey}>{mentorData.about}</Text>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={[styles.textBold]}>Experience</Text>
                        {/* <View style={{ borderBottomWidth: 1, borderBottomColor: '#979797', paddingBottom: 10 }}>
                            <Text style={styles.textLightBlack}>Senior UI/UX Designer, Google</Text>
                            <Text style={[styles.textGrey, { marginHorizontal: 10, marginTop: 0 }]}>2020 - Now</Text>
                            <Text style={[styles.textGrey, { marginHorizontal: 10 }]}>Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor incid
                                ut labore et dolore magna aliqua</Text>
                        </View>
                        <View style={{ borderBottomWidth: 1, borderBottomColor: '#979797', paddingBottom: 10 }}>
                            <Text style={styles.textLightBlack}>Senior UI/UX Designer, Google</Text>
                            <Text style={[styles.textGrey, { marginHorizontal: 10, marginTop: 0 }]}>2020 - Now</Text>
                            <Text style={[styles.textGrey, { marginHorizontal: 10 }]}>Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor incid
                                ut labore et dolore magna aliqua</Text>
                        </View> */}
                        {
                            mentorData?.experience?.map((exp, index) => (
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

    );
};

const styles = StyleSheet.create({
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
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    navbarText: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 10,
    },
    navbarChatText: {
        fontFamily: "Inter-Bold",
        fontSize: 14,
        color: "#757474"
    },
    profile: {
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 24,
        marginTop: 20,
        backgroundColor: "#F6F6F6",
        paddingVertical: 20,
    },
    profileName: {
        fontFamily: "Inter-Bold",
        fontSize: 24,
        marginTop: 10,
        height: 30,
    },
    profileCourse: {
        fontFamily: "Inter-Bold",
        fontSize: 16,
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
    textBold: {
        fontFamily: "Inter-Bold",
        fontSize: 16,
        height: 20,
    },
    textGrey: {
        fontFamily: "Inter-Regular",
        fontSize: 14,
        color: "#757474",
        fontWeight: "500",
        marginTop: 10
    },
    textLightBlack: {
        fontFamily: "Inter-Medium",
        fontSize: 14,
        color: "#171A1F",
        fontWeight: "700",
        marginTop: 10,
        marginHorizontal: 10
    }
});

const images = {
    arrow: require("../../assets/images/arrow-back.png"),
    profile: require("../../assets/images/profile-picture.png"),
    heart: require("../../assets/images/heart.png"),
}

export default MentorDetail;