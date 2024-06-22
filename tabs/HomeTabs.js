import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/home/HomeScreen";
import SettingsScreen from "../screens/settings/SettingsScreen";
import NotificationsScreen from "../screens/notifications/NotificationScreen";
import ScheduleScreen from "../screens/schedule/ScheduleScreen";
import { Image, StyleSheet } from "react-native";
import React from "react";

const Tab = createBottomTabNavigator();

const Home = ({ route }) => {

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false,
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          tabBarIcon: ({focused}) => (
          <Image
            source={focused ? images.homeActive : images.homeInactive}
            style={styles.icon}
          />
          )}}
      />
      <Tab.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{ headerShown: false,
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          tabBarIcon: ({focused}) => (
           <Image
             source={focused ? images.scheduleActive : images.scheduleInactive}
             style={styles.icon}
           />
          )}}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ headerShown: false,
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          tabBarIcon: ({focused}) => (
           <Image
             source={focused ? images.notificationActive : images.notificationInactive}
             style={styles.icon}
           />
          )}}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false,
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          tabBarIcon: ({focused}) => (
           <Image
             source={focused ? images.settingActive : images.settingInactive}
             style={styles.icon}
           />
          )}}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
  },
});

const images = {
  homeActive: require("../assets/images/home-active.png"),
  homeInactive: require("../assets/images/home-inactive.png"),
  scheduleActive: require("../assets/images/schedule-active.png"),
  scheduleInactive: require("../assets/images/schedule-inactive.png"),
  notificationActive: require("../assets/images/notification-active.png"),
  notificationInactive: require("../assets/images/notification-inactive.png"),
  settingActive: require("../assets/images/setting-active.png"),
  settingInactive: require("../assets/images/setting-inactive.png"),
};

export default Home;
