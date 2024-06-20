import React, { useState, useEffect } from "react";
import HomeTabs from "./tabs/HomeTabs";
import * as Font from "expo-font";
import { Text, View } from "react-native";
import { registerRootComponent } from "expo";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/login/LoginScreen";
import MentorScreen from "./screens/mentor/MentorScreen";
import CourseDetail from "./screens/mentor/CourseDetail";
import MentorDetail from "./screens/mentor/MentorDetail";
import EventScreen from "./screens/event/EventScreen";
import ResourceScreen from "./screens/resource/ResourceScreen";
import ForumScreen from "./screens/forum/ForumScreen";
import { NavigationContainer } from "@react-navigation/native";
import EventDetailsScreen from "./screens/event/EventDetailsScreen";
import CreateEventScreen from "./screens/event/CreateEventScreen";
import UploadResource from "./screens/resource/UploadResource";
import ResourceDetail from "./screens/resource/ResourceDetail";
import CourseCreate from "./screens/mentor/CourseCreate";
import ChatListScreen from "./screens/mentor/chat/ChatListScreen";
import ChatScreen from "./screens/mentor/chat/ChatScreen";
import MentorCreate from "./screens/mentor/MentorCreate";

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [isReady, setIsReady] = useState(false);

  function handleUser(type, newValue) {
    setUser((prev) => ({
      ...prev,
      [type]: newValue,
    }));
  }

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
        "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
        "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
        "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.ttf"),
        "Inter-Light": require("./assets/fonts/Inter-Light.ttf"),
        "Inter-ExtraLight": require("./assets/fonts/Inter-ExtraLight.ttf"),
        "Inter-Thin": require("./assets/fonts/Inter-Thin.ttf"),
        "Inter-Black": require("./assets/fonts/Inter-Black.ttf"),
        "Inter-ExtraBold": require("./assets/fonts/Inter-ExtraBold.ttf"),
      });
      setIsReady(true);
    };

    loadFont();
  }, []);

  if (isReady) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {(props) => (
              <LoginScreen {...props} user={user} handleUser={handleUser} />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="HomeTabs"
            component={HomeTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Mentor"
            component={MentorScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CourseDetail"
            component={CourseDetail}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CourseCreate"
            component={CourseCreate}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MentorCreate"
            component={MentorCreate}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MentorDetail"
            component={MentorDetail}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ChatList"
            component={ChatListScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Event"
            component={EventScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EventDetails"
            component={EventDetailsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreateEvent"
            component={CreateEventScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Resource"
            component={ResourceScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Forum"
            component={ForumScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UploadResource"
            component={UploadResource}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ResourceDetail"
            component={ResourceDetail}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
}

registerRootComponent(App);
