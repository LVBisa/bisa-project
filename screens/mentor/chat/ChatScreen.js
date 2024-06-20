import React, { useState, useLayoutEffect, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, addDoc, orderBy, query, onSnapshot, where } from 'firebase/firestore';
import { auth, database } from '../../../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatScreen = ({ route }) => {
    const mentor = route.params.mentor;

    const navigation = useNavigation();
    const [text, setText] = useState('');

    const chatRoomId = mentor.chat_room_id;

    const [messages, setMessages] = useState([]);

    const [keyboardHeight, setKeyboardHeight] = useState(0);

    formatDate = (dateTime) => {
        const date = new Date(dateTime);

        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12;
        const minutesStr = minutes < 10 ? `0${minutes}` : minutes;

        return `${hours}:${minutesStr} ${ampm}`;
    };

    const [isMentor, setMentor] = useState(null);
    const [isAdmin, setAdmin] = useState(null);
    const [senderId, setUserId] = useState(null);
    const [senderName, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [profilePicture, setPP] = useState(null);

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

    onSubmit = () => {
        text.trim();
        if (text === '') return;

        const collectionRef = collection(database, '聊天');

        addDoc(collectionRef, {
            chat_room_id: chatRoomId,
            message: text,
            sender_id: senderId,
            sender_name: senderName,
            date: new Date().toISOString(),
        });

        setText('');
    }

    useLayoutEffect(() => {
        const collectionRef = collection(database, '聊天');
        const q = query(
            collectionRef,
            where('chat_room_id', '==', chatRoomId),
            orderBy('date', 'desc')
        );

        const unsubscribe = onSnapshot(q, querySnapshot => {
            setMessages(
                querySnapshot.docs.map(doc => ({
                    chat_room_id: doc.data().chat_room_id,
                    sender_id: doc.data().sender_id,
                    sender_name: doc.data().sender_name,
                    message: doc.data().message,
                    date: doc.data().date
                }))
            );
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        const onKeyboardShow = (e) => {
            setKeyboardHeight(e.endCoordinates.height);
        };

        const onKeyboardHide = () => {
            setKeyboardHeight(0);
        };

        const showSubscription = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
            onKeyboardShow
        );
        const hideSubscription = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
            onKeyboardHide
        );
        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);
    
    return (
        // <KeyboardAvoidingView
        //     style={styles.layout}
        //     behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        //     keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        // >
        <View style={[styles.layout, {paddingBottom: keyboardHeight}]}>
            {/* Profile */}
            <View style={styles.titleContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={images.arrow} style={styles.backButton}></Image>
                </TouchableOpacity>
                <Image source={{ uri: isMentor == 'true' ? mentor.profile_picture : mentor.m_profile_picture}} style={styles.titlePicture}></Image>
                <View>
                    <Text style={styles.titleName}>{isMentor == 'true' ? mentor.username : mentor.mentor_name}</Text>
                    {/* <Text style={styles.titleStatus}>Online</Text> */}
                </View>
            </View>

            {/* Chat */}
            <View style={[styles.chatContainer, {height: Dimensions.get("window").height - 150 - keyboardHeight,}]}>
                <ScrollView>
                    <View style={[styles.chatParent, {minHeight: Dimensions.get('window').height - 150 - keyboardHeight}]}>
                        {messages.map((data, index) => (
                            data.sender_id === senderId ? (
                                <View style={styles.chatRight}>
                                    <View>
                                        <View style={styles.chatBubbleRight}>
                                            <Text style={styles.bubbleRightText}>
                                                {data.message}
                                            </Text>
                                        </View>
                                        <View style={styles.chatRightDetails}>
                                            <Text style={styles.chatTime}>{formatDate(data.date)}</Text>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={styles.chatName}>{data.sender_name}</Text>
                                                <Image source={{uri: profilePicture}} style={{ height: 24, width: 24, marginLeft: 5, borderRadius: 20 }}></Image>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            ) : (
                                <View style={styles.chatLeft}>
                                    <View>
                                        <View style={styles.chatBubbleLeft}>
                                            <Text style={styles.bubbleLeftText}>
                                                {data.message}
                                            </Text>
                                        </View>
                                        <View style={styles.chatLeftDetails}>
                                            <View style={{ flexDirection: "row" }}>
                                                <Image source={{uri: isMentor == 'true' ? mentor.profile_picture : mentor.m_profile_picture}} style={{ height: 24, width: 24, marginRight: 5, borderRadius: 20 }}></Image>
                                                <Text style={styles.chatName}>{data.sender_name}</Text>
                                            </View>
                                            <Text style={styles.chatTime}>{formatDate(data.date)}</Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        ))}
                    </View>
                </ScrollView>
            </View>

            {/* Chatbox */}
            <View style={styles.chatBoxContainer}>
                <View style={styles.chatBoxInput}>
                    <TextInput
                        value={text}
                        onChangeText={setText}
                        placeholder="Type a message here...                                  "></TextInput>
                    <TouchableOpacity onPress={() => onSubmit()}>
                        <Image source={images.send} ></Image>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        // </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    layout: {
        backgroundColor: "#1C61C7",
        height: "100%",
    },
    titleContainer: {
        height: 50,
        marginTop: 50,
        marginHorizontal: 24,
        flexDirection: "row",
        alignItems: "center",
    },
    titlePicture: {
        height: 40,
        width: 40,
        marginHorizontal: 10,
        borderRadius: 30,
    },
    titleName: {
        color: "white",
        fontSize: 16,
        fontFamily: "Inter-Bold",
    },
    titleStatus: {
        color: "white",
        fontSize: 11,
        fontFamily: "Inter-Regular",
    },
    chatContainer: {
        backgroundColor: "#F6F6F6",
        // height: Dimensions.get("window").height - 150,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 20,
    },
    chatParent: {
        flexDirection: "column-reverse",
        // backgroundColor: "black",
        paddingHorizontal: 24,
        paddingBottom: 40,
        alignItems: "center",
        // marginTop: 20,
        // minHeight: Dimensions.get("window").height - 150,
    },
    chat: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 24,
        marginTop: 20,
        paddingVertical: 10,
    },
    chatBoxContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        height: 70,
        bottom: 0,
        position: "absolute",
    },
    chatBoxInput: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 24,
        paddingHorizontal: 15,
        backgroundColor: "#E1E1E1",
        paddingVertical: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
        borderRadius: 4,
        width: Dimensions.get("window").width - 48,
    },
    placeholder: {
        color: "#A3A3A3",
        fontFamily: "Inter-Regular",
    },
    chatLeft: {
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
    },
    chatBubbleLeft: {
        backgroundColor: "white",
        padding: 15,
        borderRadius: 4,
        marginBottom: 5,
    },
    chatLeftDetails: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    bubbleLeftText: {
        color: "black",
        fontFamily: "Inter-Regular",
        fontSize: 14,
    },
    chatRight: {
        flexDirection: "column",
        alignItems: "flex-end",
        width: "100%",
    },
    chatBubbleRight: {
        backgroundColor: "#1C61C7",
        padding: 15,
        borderRadius: 4,
        marginBottom: 5,
    },
    chatRightDetails: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    bubbleRightText: {
        color: "white",
        fontFamily: "Inter-Regular",
        fontSize: 14,
    },
    input: {
        flex: 1,
        color: "#000",
    },
    chatName: {
        fontFamily: "Inter-Bold",
        fontSize: 16,
        height: 20,
    },
    chatTime: {
        fontFamily: "Inter-Bold",
        fontSize: 12,
        color: "#C2B6B6",
    },
});

const images = {
    arrow: require("../../../assets/images/arrow-left.png"),
    profile: require("../../../assets/images/profile-picture.png"),
    send: require("../../../assets/images/send.png"),
    profile2: require("../../../assets/images/profile-pic2.png"),

}

export default ChatScreen;