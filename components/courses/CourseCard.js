import { TouchableOpacity, View, Image, Text, StyleSheet, Dimensions} from "react-native";
import { useNavigation } from "@react-navigation/native";

const CourseCard = ({imageUrl, title, author, date, price}) => {
    const navigation = useNavigation();

    function toCourseDetails() {
        navigation.navigate("CourseDetail", {title: title, person: author, date: date, courseImage: imageUrl});
    }

    return (
        <TouchableOpacity onPress={toCourseDetails}>
            <View style={styles.list}>
                <View style={styles.listDescription}>
                    <View style={{ marginRight: 10 }}>
                        <Image source={imageUrl} />
                    </View>
                    <View>
                        <View style={{alignItems: 'flex-start'}}>
                            <Text style={styles.listTitle}>{title}</Text>
                            <View style={styles.listDetail}>
                                <View style={{ width: 20 }}><Image source={require("../../assets/images/person.png")} ></Image></View>
                                <Text style={styles.listCourse}>{author}</Text>
                            </View>
                            <View style={styles.listDetail}>
                                <View style={{ width: 20 }}><Image source={require("../../assets/images/clock.png")}></Image></View>
                                <Text style={styles.listCourse}>{date}</Text>
                            </View>
                            <View>
                                <Text style={styles.listPrice}>{price}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    list: {
        marginTop: 20,
        marginHorizontal: 24,
        paddingHorizontal: 16,
        width: Dimensions.get("window").width - 48,
        borderWidth: 0.4,
        borderRadius: 10,
        height: 130,
        flexDirection: "row",
        alignItems: "center",
    },
    listDescription: {
        flexDirection: "row",
        alignItems: "center",
    },
    listTitle: {
        fontWeight: "bold",
        fontSize: 16,
        fontFamily: "Inter-Bold",
    },
    listDetail: {
        flexDirection: "row",
        alignItems: "center",
    },
    listCourse: {
        fontFamily: "Inter-Regular",
        fontSize: 12,
        color: "#979797",
    },
    listPrice: {
        fontFamily: "Inter-Bold",
        fontSize: 12,
        color: "#1C61C7",
        marginTop: 10,
    },
});
export default CourseCard;