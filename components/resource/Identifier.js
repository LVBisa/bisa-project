import { View, Image, Text, StyleSheet } from "react-native";

const Identifier = ({ img, text }) => {
  return (
    <View style={styles.layout}>
      <Image style={styles.image} source={img} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flexDirection: "row",
    paddingTop: 5,
  },

  image: {
    marginTop: 2,
  },

  text: {
    paddingLeft: 10,
    fontSize: 10,
    fontFamily: "Inter-SemiBold",
    color: "#C2B6B6",
  },
});

export default Identifier;
