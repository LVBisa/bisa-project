import React, { useEffect, useState, } from 'react';
import { ScrollView, Text, View, Dimensions, Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getDocs, collection, addDoc, orderBy, query, onSnapshot, where } from 'firebase/firestore';
import { database } from '../../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MentorTab = () => {
    const navigation = useNavigation();

    const [mentorList, setMentorList] = useState([]);
    const [userId, setUserId] = useState(null);
    const [profilePicture, setPP] = useState(null);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
        const ui = await AsyncStorage.getItem('user_id');
        const pp = await AsyncStorage.getItem('profile_picture');
        const un = await AsyncStorage.getItem('username');

        setUserId(ui);
        setPP(pp);
        setUsername(un);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const q = query(collection(database, '用户'), where('is_mentor', '==', true));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const mentors = [];
            querySnapshot.forEach((doc) => {
                mentors.push(doc.data());
            });
            setMentorList(mentors);
        });
        return unsubscribe;
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
        <ScrollView>
            {mentorList.map((mentor, index) => (
                <TouchableOpacity key={index} onPress={() => navigation.navigate('MentorDetail', { mentor })}>
                    <View style={styles.list}>
                        <View style={styles.listDescription}>
                            <View style={{ marginRight: 10 }}>
                                <Image source={{uri: mentor.profile_picture}} style={styles.profilePicture}/>
                            </View>
                            <View>
                                <Text style={styles.listName}>{mentor.username}</Text>
                                <Text style={styles.listCourse}>{mentor.course}</Text>
                                <View style={styles.like}>
                                    <Image source={images.heart} />
                                    <Text style={styles.likeText}>{mentor.likes || 0} Likes</Text>
                                </View>
                            </View>
                        </View>
                       {(mentor.user_id === userId) ? <View></View> :
                        <TouchableOpacity onPress={() => onClickChat(mentor) }>
                            <Image source={images.chatBlue} />
                        </TouchableOpacity>}
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    list: {
        marginTop: 20,
        marginHorizontal: 24,
        paddingHorizontal: 10,
        width: Dimensions.get("window").width - 48,
        borderWidth: 0.4,
        borderRadius: 10,
        height: 80,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    listDescription: {
        flexDirection: "row",
        alignItems: "center",
    },
    like: {
        marginTop: 5,
        flexDirection: "row",
        alignItems: "center",
    },
    likeText: {
        marginLeft: 5,
        fontFamily: "Inter-Regular",
        fontSize: 12,
    },
    listName: {
        fontFamily: "Inter-Bold",
        fontSize: 16,
        height: 20,
    },
    listCourse: {
        fontFamily: "Inter-Bold",
        fontSize: 12,
        color: "#C2B6B6",
    },
    profilePicture: {
        width: 57,
        height: 57,
        borderRadius: 30,
      },
});

const images = {
    profile: require("../../assets/images/profile-picture.png"),
    chatBlue: require("../../assets/images/chat-blue.png"),
    heart: require("../../assets/images/heart.png"),
}

export default MentorTab;