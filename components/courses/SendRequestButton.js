import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const SendRequestButton = ({ onChange, isDisabled }) => {
  return (
    <View style={{ alignItems: "center", marginTop: 20 }}>
      <TouchableOpacity onPress={() => onChange()} 
      style={
        isDisabled ? 
        {...styles.layout, backgroundColor: "#BDBDBD"} : 
        styles.layout
      } disabled={isDisabled}>
        <Text style={styles.sendRequestText}>Send Request</Text>
      </TouchableOpacity>
    </View>
    //   }}>
    //     <Text style={styles.sendRequestText}>Send Request</Text>
    //   </TouchableOpacity>
    // </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    width: 119,
    height: 30,
    backgroundColor: "#1C61C7",
    justifyContent: "center",
  },

  sendRequestText: {
    color: "white",
    textAlign: "center",
    fontFamily: "Inter-Bold",
  },
});

export default SendRequestButton;
