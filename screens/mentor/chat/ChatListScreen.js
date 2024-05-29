import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, TextInput, useWindowDimensions, Touchable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ChatListScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.layout}>
            <View style={styles.titleContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={images.arrow} style={styles.backButton}></Image>
                </TouchableOpacity>
                <Text style={styles.title}>Chat</Text>
            </View>
            <ScrollView style={styles.chatList}>
                <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
                    <View style={styles.chat}>
                        <Image source={images.profile} style={styles.profile}></Image>
                        <View style={styles.chatDescription}>
                            <Text style={styles.chatName}>Clarice</Text>
                            <Text style={styles.chatMessage}>Hello, I have a question about the course</Text>
                        </View>
                        <View style={{alignSelf: "flex-start"}}>
                            <Text style={styles.chatMessage}>10:00 PM</Text>
                        </View>
                    </View>
                </TouchableOpacity>
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