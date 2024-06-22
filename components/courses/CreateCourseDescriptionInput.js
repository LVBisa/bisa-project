import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";

const CreateCourseDescriptionInput = ({ inputText, inputDesc, onChangeText }) => {
  return (
    <View style={styles.layout}>
      <Text style={{ fontSize: 14, fontFamily: "Inter-Regular", fontWeight: "bold"}}>
        {inputText}
      </Text>
      <View style={styles.inputBox}>
        <TextInput
          style={{ fontSize: 10 }}
          placeholderTextColor={"#959595"}
          placeholder={inputDesc}
          multiline={true}
          onChangeText={(text) => {onChangeText(text)}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    paddingTop: 12,
  },

  inputBox: {
    marginTop: 5,
    paddingTop: 4,
    paddingHorizontal: 10,
    width: 335,
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    fontFamily: "Inter-Regular",
  },
});

export default CreateCourseDescriptionInput;
