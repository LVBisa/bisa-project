import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View, Image, StyleSheet } from "react-native";

const BackArrow = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <View>
        <Image
          source={require("../../assets/images/arrow-back.png")}
          style={styles.image_style}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image_style: {
    height: 25,
    width: 30,
    marginTop: 2,
  },
});

export default BackArrow;
