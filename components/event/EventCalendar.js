import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Calendar } from "react-native-calendars";

const EventCalendar = ({ onChangeDate }) => {
  const [currentDate, setCurrentDate] = useState("");
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, "0");
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const year = now.getFullYear();

    const formattedDate = `${year}-${month}-${day}`;
    setCurrentDate(formattedDate);
    setMarkedDates({
      [formattedDate]: { marked: true, selected: true },
    });
  }, []);

  function dateFormat(day, month, year) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${monthNames[month - 1]} ${day}, ${year}`;
  }

  function isDateBeforeToday(date) {
    const today = new Date();
    const selectedDate = new Date(date.year, date.month - 1, date.day);

    return selectedDate < today;
  }

  return (
    <View style={styles.container}>
      <Calendar
        current={currentDate}
        markedDates={markedDates}
        disableAllTouchEventsForDisabledDays={true}
        onDayPress={(day) => {
          if (isDateBeforeToday(day)) {
            Alert.alert("Invalid Date", "The date cannot be in the past.");
            return;
          }

          const formattedDate = `${day.year}-${day.month
            .toString()
            .padStart(2, "0")}-${day.day.toString().padStart(2, "0")}`;
          setCurrentDate(formattedDate);
          setMarkedDates({
            [formattedDate]: { marked: true, selected: true },
          });
          onChangeDate(dateFormat(day.day, day.month, day.year));
        }}
        enableSwipeMonths={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 335,
    height: 360,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#fff",
  },
});

export default EventCalendar;
