import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { collection, query, where, getDocs } from "@firebase/firestore";
import { database } from "../../config/firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInButton = ({ user }) => {
  const navigation = useNavigation();
  const { email, password } = user;

  async function signIn() {
    const { email, password } = user;
    if (!email || !password) {
      Alert.alert("please enter both email and password");
      return false;
    }

    const users = collection(database, "用户");
    const q = query(users, where("email", "==", email));
    const userData = await getDocs(q);

    if(userData.empty){
      Alert.alert("Account not found");
      return false;
    }
    
    const userDoc = userData.docs[0];
    const data = userDoc.data();
    if(data.password !== password){
      Alert.alert("Password is incorrect");
      return false;
    }

    await AsyncStorage.setItem('username', userDoc.data().username);
    await AsyncStorage.setItem('email', userDoc.data().email);
    await AsyncStorage.setItem('is_mentor', userDoc.data().is_mentor.toString());
    await AsyncStorage.setItem('is_admin', userDoc.data().is_admin.toString());
    await AsyncStorage.setItem('profile_picture', userDoc.data().profile_picture);
    await AsyncStorage.setItem('user_id', userDoc.data().user_id);
    await AsyncStorage.setItem('binusian_id', userDoc.data().binusian_id);


    navigation.navigate("HomeTabs", { email: userDoc.data().username});


  }

  return (
    <View style={styles.layout}>
      <TouchableOpacity onPress={() => signIn()} disabled={!email || !password}>
        <View
          style={!email || !password ? styles.buttonDisabled : styles.button}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flexDirection: "row",
    justifyContent: "center",
  },

  button: {
    backgroundColor: "#0961F5",
    width: 320,
    height: 43,
    marginTop: 25,
    borderRadius: 16,
    flexDirection: "column",
    justifyContent: "center",
  },

  buttonDisabled: {
    backgroundColor: "#979797",
    width: 320,
    height: 43,
    marginTop: 25,
    borderRadius: 16,
    flexDirection: "column",
    justifyContent: "center",
  },

  buttonText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
});

export default SignInButton;
