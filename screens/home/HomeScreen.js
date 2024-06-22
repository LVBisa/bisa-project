import { ScrollView, SafeAreaView, StyleSheet, RefreshControl } from "react-native";
import Header from "../../components/home/Header";
import Banner from "../../components/home/Banner/Banner";
import Category from "../../components/home/Category/Category";
import TopCourse from "../../components/home/TopCourse/TopCourse";
import TopEvent from "../../components/home/TopEvent/TopEvent";
import TopResource from "../../components/home/TopResource/TopResource";
import React, {useState} from "react";

const HomeScreen = ({ route }) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
        <Header/>
        <Banner />
        <Category />
        <TopCourse />
        <TopEvent />
        <TopResource />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "white",
  },
});

export default HomeScreen;
