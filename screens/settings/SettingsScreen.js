import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, TextInput, useWindowDimensions, Touchable, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { updateDoc, getDocs, collection, addDoc, orderBy, query, onSnapshot, where, doc } from 'firebase/firestore';
import { database } from '../../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import { acc } from 'react-native-reanimated';

const SettingsScreen = () => {
  const navigation = useNavigation();

  const [isMentor, setMentor] = useState(null);
  const [isAdmin, setAdmin] = useState(null);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [profilePicture, setPP] = useState(null);
  const [binusianId, setBinusianId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const m = await AsyncStorage.getItem('is_mentor');
      const a = await AsyncStorage.getItem('is_admin');
      const ui = await AsyncStorage.getItem('user_id');
      const un = await AsyncStorage.getItem('username');
      const e = await AsyncStorage.getItem('email');
      const pp = await AsyncStorage.getItem('profile_picture');
      const bi = await AsyncStorage.getItem('binusian_id');

      setMentor(m);
      setAdmin(a);
      setUserId(ui);
      setUsername(un);
      setEmail(e);
      setPP(pp);
      setBinusianId(bi);
    };

    fetchData();
  }, []);

  onLogout = async () => {  
    await AsyncStorage.removeItem('username');
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('is_mentor');
    await AsyncStorage.removeItem('is_admin');
    await AsyncStorage.removeItem('profile_picture');
    await AsyncStorage.removeItem('user_id');
    await AsyncStorage.removeItem('binusian_id');

    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#2064c8', 'transparent']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: 300,
        }}>
      </LinearGradient>
      <ScrollView>

        <View style={styles.titleContainer}>
          <Image source={images.setting} style={styles.titleImage} />
          <Text style={styles.title}>Settings</Text>
        </View>

        <View style={styles.profileContainer}>
          <View style={styles.profileImageContainer}>
            <Image source={{ uri: profilePicture }} style={styles.profileImage} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{username}</Text>
            <Text style={styles.textGrey}>{binusianId}</Text>
          </View>
        </View>

        <View style={styles.accountContainer}>
          <Text style={styles.textGrey}>Account</Text>

          <TouchableOpacity onPress={() => null} style={styles.accountItem} >
            <View style={{flexDirection:"row", alignItems: "center"}}>
              <Image source={images.profile} style={styles.accountItemImage} />
              <Text style={styles.accountItemText}>Account Details</Text>
            </View>
            <Image source={images.chevronRight} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => null} style={styles.accountItem} >
            <View style={{flexDirection:"row", alignItems: "center"}}>
              <Image source={images.lock} style={styles.accountItemImage} />
              <Text style={styles.accountItemText}>Change Password</Text>
            </View>
            <Image source={images.chevronRight} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => null} style={styles.accountItem} >
            <View style={{flexDirection:"row", alignItems: "center"}}>
              <Image source={images.privacy} style={[styles.accountItemImage, {height: 20, width: 30, marginRight: 3}]} />
              <Text style={styles.accountItemText}>Privacy Settings</Text>
            </View>
            <Image source={images.chevronRight} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => null} style={styles.accountItem} >
            <View style={{flexDirection:"row", alignItems: "center"}}>
              <Image source={images.approval} style={[styles.accountItemImage, {height: 20, width: 20, marginRight: 14}]} />
              <Text style={styles.accountItemText}>Approval List</Text>
            </View>
            <Image source={images.chevronRight} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onLogout()} style={styles.accountItem} >
            <View style={{flexDirection:"row", alignItems: "center"}}>
              <Image source={images.logout} style={styles.accountItemImage} />
              <Text style={styles.accountItemText}>Log Out</Text>
            </View>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    height: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 60,
    marginHorizontal: 24,
  },
  titleImage: {
    marginRight: 10,
    width: 24,
    height: 24,
  },
  profileContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 70,
  },
  profileInfo: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  profileName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  textGrey: {
    color: "#979797",
  },
  accountContainer: {
    marginTop: 20,
    marginHorizontal: 24,
  },
  accountTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  accountItem: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#979797",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  accountItemText: {
    fontSize: 16,
  },
  accountItemImage: {
    marginRight: 10,
    width: 24,
    height: 24,
  },

});

const images = {
  setting: require("../../assets/images/setting.png"),
  chevronRight: require("../../assets/images/chevron-right.png"),
  profile: require("../../assets/images/profile-icon.png"),
  lock: require("../../assets/images/lock.png"),
  privacy: require("../../assets/images/eye-closed.png"),
  approval: require("../../assets/images/approval-list.png"),
  logout: require("../../assets/images/logout.png"),
};

export default SettingsScreen;
