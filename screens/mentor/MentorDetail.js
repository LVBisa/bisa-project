import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

const MentorDetail = () => {
    const navigation = useNavigation();
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
                <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
                    <View style={styles.navbarIcon}>
                        <Text style={styles.navbarChatText}>Chat</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <ScrollView style={{ height: Dimensions.get('window').height, backgroundColor: 'white' }}>
                <View style={styles.profile}>
                    <Image source={images.profile} style={{ width: 80, height: 80 }}></Image>
                    <Text style={styles.profileName}>Clarice</Text>
                    <Text style={styles.profileCourse}>UI/UX Designer</Text>
                    <View style={styles.profileLike}>
                        <Image source={images.heart}></Image>
                        <Text style={{ marginLeft: 10 }}>210 Likes</Text>
                    </View>
                </View>
                <View style={styles.description}>
                    <View>
                        <Text style={styles.textBold}>About Me</Text>
                        <Text style={styles.textGrey}>Lorem ipsum dolor sit amet, consectetur
                            adipiscingelit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Ipsum dolor sit amet, consectetur adipiscingelit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua </Text>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={[styles.textBold]}>Experience</Text>
                        <View style={{ borderBottomWidth: 1, borderBottomColor: '#979797', paddingBottom: 10 }}>
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
                        </View>
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