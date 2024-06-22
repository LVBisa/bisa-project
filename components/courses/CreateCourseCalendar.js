import { set } from "firebase/database";
import { View, Text, Image, TextInput, StyleSheet, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import react, { useState, useEffect } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateCourseCalendar = ({ inputText, inputDesc, onChange }) => {
  placeholderCal = "YYYY/MM/DD";

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);

  }

  const [date, setDate] = useState(new Date());

  const handleConfirm = (event, selectedDate) => {
    setDatePickerVisibility(false);

    onChange(event, selectedDate);
  };

  return (
    <View style={styles.layout}>
      <Text style={{ fontSize: 14, fontFamily: "Inter-Regular", fontWeight: "bold", }}>
        {inputText}
      </Text>
      <View style={styles.inputBox}>
        {/* <TextInput
          style={{ fontSize: 10 }}
          placeholderTextColor={"#959595"}
          placeholder={placeholderCal}
          multiline={true}
        /> */}
        <Text style={{fontSize: 10, color: "#959595"}}>
          {inputDesc}
        </Text>
        <TouchableOpacity onPress={() => showDatePicker()}>
          <Image style={{ marginRight: 15 }} source={require("../../assets/images/calendar.png")}/>  
        </TouchableOpacity>
      </View>
      {
        isDatePickerVisible === true ? (
          <DateTimePicker
                value={date}
                mode="date"
                onChange={handleConfirm}
            />
        ) : null
      }
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    paddingTop: 12,
  },

  inputBox: {
    marginTop: 5,
    // paddingTop: 4,
    paddingLeft: 10,
    width: 335,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    fontFamily: "Inter-Regular",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

  },
});

export default CreateCourseCalendar;
