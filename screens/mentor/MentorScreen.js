import SearchBar from "../../components/event/SearchBar";
import React, { useState, useEffect } from "react";
import BackArrow from "../../components/UI/BackArrow";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, TextInput, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import MentorTab from "./MentorTab";
import CourseTab from "./CourseTab";
import AsyncStorage from "@react-native-async-storage/async-storage";

const renderScene = SceneMap({
  course: CourseTab,
  mentor: MentorTab,
});

const MentorScreen = () => {
  const layout = useWindowDimensions();
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'course', title: 'Courses' },
    { key: 'mentor', title: 'Mentor' },
  ]);

  const [isMentor, setMentor] = useState(null);
  const [isAdmin, setAdmin] = useState(null);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [profilePicture, setPP] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const m = await AsyncStorage.getItem('is_mentor');
      const a = await AsyncStorage.getItem('is_admin');
      const ui = await AsyncStorage.getItem('user_id');
      const un = await AsyncStorage.getItem('username');
      const e = await AsyncStorage.getItem('email');
      const pp = await AsyncStorage.getItem('profile_picture');

      setMentor(m);
      setAdmin(a);
      setUserId(ui);
      setUsername(un);
      setEmail(e);
      setPP(pp);
    };

    fetchData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.navbar}>
        <View style={styles.titleContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("HomeTabs")}>
            <View>
              <Image source={images.arrow} style={{ height: 24 }} />
            </View>
          </TouchableOpacity>
          <Text style={styles.navbarText}>Explore your need</Text>
        </View>
        <View style={styles.navbarIcon}>
          { (isMentor === 'true' || isMentor === null) && index === 1 ? 
            (<View></View>)
             : 
             (index === 0 ?
              <TouchableOpacity onPress={() => navigation.navigate("CourseCreate")}>
                <Image source={images.plus} style={{ height: 22, marginHorizontal: 10 }} />
              </TouchableOpacity> :
              <TouchableOpacity onPress={() => navigation.navigate("MentorCreate")}>
                <Image source={images.plus} style={{ height: 22, marginHorizontal: 10 }} />
              </TouchableOpacity>)
          }
          <TouchableOpacity onPress={() => navigation.navigate("ChatList")}>
            <Image source={images.chat} style={{ height: 21 }} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={styles.searchContainer}>
          <Image source={images.search} />
          <TextInput style={styles.searchText} placeholder="Search" />
        </View>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: Dimensions.get('window').width }}
          renderTabBar={props =>
            <TabBar
              {...props}
              style={styles.tabBar}
              indicatorStyle={styles.indicator}
              labelStyle={styles.label}
              inactiveColor="black"
            />
          }
        />
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  arrow: {
    height: 24,
    width: 24,
  },
  navbar: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
    height: 110,
    width: Dimensions.get("window").width,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#A3A3A3",
    alignItems: "center",
    backgroundColor: "white",
  },
  navbarText: {
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 10,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  navbarIcon: {
    flexDirection: "row",
    paddingRight: 10,
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 24,
    marginTop: 20,
    marginBottom: 10,
    paddingLeft: 15,
    width: Dimensions.get("window").width - 48,
    height: 40,
    backgroundColor: "#E2E1E1",
    opacity: 1,
    borderRadius: 12,
  },
  searchText: {
    paddingLeft: 10,
  },
  tabBar: {
    backgroundColor: '#ffffff',
  },
  indicator: {
    backgroundColor: '#1C61C7',
  },
  label: {
    color: '#1C61C7',
    fontFamily: 'Inter-Regular',
    textTransform: 'none'
  },
});

const images = {
  arrow: require("../../assets/images/arrow-back.png"),
  plus: require("../../assets/images/plus-circle.png"),
  chat: require("../../assets/images/chat.png"),
  search: require("../../assets/images/search.png"),
};

export default MentorScreen;

