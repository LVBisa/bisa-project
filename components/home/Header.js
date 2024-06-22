import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Header = ({ }) => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const un = await AsyncStorage.getItem('username');
      
      setUsername(un);
      
    };

    fetchData();
  }, []);
  return (
    <View style={styles.layout}>
      <Text style={styles.helloText}>Hello, {username}!</Text>
      <Text style={styles.subText}>What do you need today?</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    paddingTop: 50,
    paddingLeft: 20,
  },

  helloText: {
    fontSize: 24,
    fontWeight: "bold",
  },

  subText: {
    fontSize: 12,
    color: "#949494",
  },
});

export default Header;
