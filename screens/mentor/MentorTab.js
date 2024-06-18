import React from 'react';
import { ScrollView, Text, View, Dimensions, Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const MentorTab = () => {
    const navigation = useNavigation();

    return (
        <ScrollView>
            <TouchableOpacity onPress={() => navigation.navigate('MentorDetail')}>
                <View style={styles.list}>
                    <View style={styles.listDescription}>
                        <View style={{ marginRight: 10 }}>
                            <Image source={images.profile} />
                        </View>
                        <View>
                            <Text style={styles.listName}>Clarice</Text>
                            <Text style={styles.listCourse}>Software Engineer</Text>
                            <View style={styles.like}>
                                <Image source={images.heart} />
                                <Text style={styles.likeText}>210 Likes</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
                        <Image source={images.chatBlue} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
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
});

const images = {
    profile: require("../../assets/images/profile-picture.png"),
    chatBlue: require("../../assets/images/chat-blue.png"),
    heart: require("../../assets/images/heart.png"),
}

export default MentorTab;