import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, TextInput, useWindowDimensions, Touchable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ChatScreen = () => {
    const navigation = useNavigation();
    const [text, setText] = useState('');

    return (
        <View style={styles.layout}>
            <View style={styles.titleContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={images.arrow} style={styles.backButton}></Image>
                </TouchableOpacity>
                <Image source={images.profile} style={styles.titlePicture}></Image>
                <View>
                    <Text style={styles.titleName}>Clarice</Text>
                    <Text style={styles.titleStatus}>Online</Text>
                </View>
            </View>
            <ScrollView>
                <View style={styles.chatContainer}>
                {/* Gap di bawah */}
                <View style={{height: 20}}></View>
                    <View style={styles.chatLeft}>
                        <View>
                            <View style={styles.chatBubbleLeft}>
                                <Text style={styles.bubbleLeftText}>
                                    Hello, I have a question about the course
                                </Text>
                            </View>
                            <View style={styles.chatLeftDetails}>
                                <View style={{flexDirection: "row"}}>
                                    <Image source={images.profile} style={{ height: 24, width: 24, marginRight: 5 }}></Image>
                                    <Text style={styles.chatName}>Clarice</Text>
                                </View>
                                <Text style={styles.chatTime}>10:01 PM</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.chatRight}>
                        <View>
                            <View style={styles.chatBubbleRight}>
                                <Text style={styles.bubbleRightText}>
                                    May i help you?
                                </Text>
                            </View>
                            <View style={styles.chatRightDetails}>
                                <Text style={styles.chatTime}>10:00 PM</Text>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={styles.chatName}>Angie</Text>
                                    <Image source={images.profile2} style={{ height: 24, width: 24, marginLeft: 5 }}></Image>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.chatBoxContainer}>
                <View style={styles.chatBoxInput}>
                    {!text && (
                        <Text style={styles.placeholder}>Type a message here...</Text>
                    )}
                    <TextInput style={styles.input}
                        value={text}
                        onChangeText={setText}
                        placeholder="" ></TextInput>
                    <Image source={images.send}></Image>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    layout: {
        backgroundColor: "#1C61C7",
        height: "100%",
    },
    titleContainer: {
        marginTop: 50,
        marginHorizontal: 24,
        flexDirection: "row",
        alignItems: "center",
    },
    titlePicture: {
        height: 40,
        width: 40,
        marginHorizontal: 10,
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
        height: Dimensions.get("window").height - 180,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 20,
        flexDirection: "column-reverse",
        paddingHorizontal: 24,
        alignItems: "center"
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