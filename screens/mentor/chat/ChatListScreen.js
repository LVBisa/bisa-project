import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, TextInput, useWindowDimensions, Touchable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getDocs, collection, addDoc, orderBy, query, onSnapshot, where } from 'firebase/firestore';
import { database } from '../../../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ChatListScreen = () => {
    const navigation = useNavigation();

    const [chatList, setChatList] = useState([]);
    const [userId, setUserId] = useState(null);
    const [isMentor, setMentor] = useState(null);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const ui = await AsyncStorage.getItem('user_id');
            const m = await AsyncStorage.getItem('is_mentor');

            setUserId(ui);
            setMentor(m);
            setDataLoaded(true);
        };

        fetchData();
    }, []);

    formatDate = (dateTime) => {
        if(dateTime === "") return "";
        const date = new Date(dateTime);

        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12;
        const minutesStr = minutes < 10 ? `0${minutes}` : minutes;

        return `${hours}:${minutesStr} ${ampm}`;
    };

    useEffect(() => {
        if (!dataLoaded) return;
        let q;
        if(isMentor === 'true') {
            q = query(collection(database, '聊天列表'), where('mentor_id', '==', userId));
        } else {
            q = query(collection(database, '聊天列表'), where('user_id', '==', userId));
        }
        const unsubscribe = onSnapshot(q, async (querySnapshot) => {
            const chats = [];
            const promises = [];
    
            querySnapshot.forEach((doc) => {
                const promise = new Promise(async (resolve) => {
                    const list = [];
                    const qChat = query(collection(database, '聊天'), where('chat_room_id', '==', doc.data().chat_room_id), orderBy('date', 'desc'));
                    
                    const qChatSnapshot = await getDocs(qChat);
                    qChatSnapshot.forEach((docs) => {
                        list.push(docs.data());
                    });
    
                    const dataToPush = doc.data();
                    if (list.length === 0) {
                        dataToPush.message = "No message";
                        dataToPush.date = "";
                    } else {
                        dataToPush.message = list[0].message;
                        dataToPush.date = list[0].date;
                    }
    
                    chats.push(dataToPush);
                    resolve();
                });
                promises.push(promise);
            });
    
            await Promise.all(promises);
            setChatList(chats);
        });
    
        return unsubscribe;
    }, [userId, isMentor, dataLoaded]);
    


    return (
        <View style={styles.layout}>
            <View style={styles.titleContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={images.arrow} style={styles.backButton}></Image>
                </TouchableOpacity>
                <Text style={styles.title}>Chat</Text>
            </View>
            <ScrollView style={styles.chatList}>
                {chatList.map((chat) => (
                    <TouchableOpacity onPress={() => navigation.navigate('Chat', {mentor: chat})}>
                        <View style={styles.chat}>
                            <Image source={{uri: isMentor === 'true' ? chat.profile_picture : chat.m_profile_picture}} style={styles.profile}></Image>
                            <View style={styles.chatDescription}>
                                <Text style={styles.chatName}>{isMentor === 'true' ? chat.username : chat.mentor_name}</Text>
                                <Text style={styles.chatMessage}>{chat.message}</Text>
                            </View>
                            <View style={{alignSelf: "flex-start"}}>
                                <Text style={styles.chatMessage}>{formatDate(chat.date)}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    layout: {
        backgroundColor: "#1C61C7",
        height: "100%",
    },
    title: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        marginLeft: 20,
    },
    titleContainer: {
        marginTop: 50,
        marginHorizontal: 24,
        flexDirection: "row",
        alignItems: "center",
    },
    chatList: {
        backgroundColor: "white",
        height: Dimensions.get("window").height,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 20,
    },
    chat: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 24,
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#C2B6B6"
    },
    profile: {
        height: 50,
        width: 50,
        borderRadius: 50,
    },
    chatDescription: {
        marginLeft: 20,
        width: "60%",
    },
    chatName: {
        fontFamily: "Inter-Bold",
        fontSize: 16,
        height: 20,
    },
    chatMessage: {
        fontFamily: "Inter-Bold",
        fontSize: 12,
        color: "#C2B6B6",
    },
});

const images = {
    arrow: require("../../../assets/images/arrow-left.png"),
    profile: require("../../../assets/images/profile-picture.png"),
};


export default ChatListScreen;