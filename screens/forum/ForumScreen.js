import { View, Text, StyleSheet, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import BackArrow from "../../components/UI/BackArrow";
import SearchButton from "../../components/forum/SearchButton";
import ViewAllButton from "../../components/forum/ViewAllButton";
import DiscussionSelections from "../../components/forum/DiscussionSelections";

const ForumScreen = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={true} style={{height: "100%", backgroundColor: "white"}}>
      <View style={styles.arrow}></View>
      <View style={styles.container}>
        <View style={styles.header_container}>
          <View style={styles.back_arrow_container}>
            <BackArrow />
          </View>

          <View style={styles.discover_container}>
            <Text style={styles.discover_text}>D I S C O V E R</Text>
          </View>

          <View style={styles.search_button}>
            <SearchButton />
          </View>
        </View>

        <View>
          <View style={styles.categories_title_container}>
            <View>
              <Text style={styles.categories_text}>Categories</Text>
            </View>
            <View style={styles.viewall_text}>
              <ViewAllButton />
            </View>
          </View>

          <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={true}>
              {/* Artificial Intelligence*/}
              <View style={styles.categories_box}>
                <View style={styles.categories_box_container}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      marginHorizontal: 20,
                      marginVertical: 5,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 20,
                        textAlign: "center",
                      }}
                    >
                      Artificial{"\n"}Intelligence
                    </Text>
                  </View>

                  {/* container buat gambar forum dan jumlahnya */}
                  <View style={styles.forumImgAndCount}>
                    <View style={styles.forumImgAndCount_Container}>
                      <View>
                        <Image
                          style={styles.forum_img}
                          source={require("../../assets/images/forum-logo.png")}
                        ></Image>
                      </View>

                      <View>
                        <Text style={{ color: "white", fontSize: 15 }}>
                          260
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.container_img}>
                    <Image
                      source={require("../../assets/images/artificial-intelligence.png")}
                      style={{ width: 50, height: 50 }}
                    ></Image>
                  </View>
                </View>
              </View>
              {/* =========================== */}
              {/* Data Structures */}
              <View style={styles.categories_box}>
                <View style={styles.categories_box_container_2}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      marginHorizontal: 20,
                      marginVertical: 5,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 20,
                        textAlign: "center",
                      }}
                    >
                      Data{"\n"}Structures
                    </Text>
                  </View>

                  {/* container buat gambar forum dan jumlahnya */}
                  <View style={styles.forumImgAndCount}>
                    <View style={styles.forumImgAndCount_Container}>
                      <View>
                        <Image
                          style={styles.forum_img}
                          source={require("../../assets/images/forum-logo.png")}
                        ></Image>
                      </View>

                      <View>
                        <Text style={{ color: "white", fontSize: 15 }}>
                          343
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.container_img}>
                    <Image
                      source={require("../../assets/images/data-structure.png")}
                      style={{ width: 50, height: 50 }}
                    ></Image>
                  </View>
                </View>
              </View>
              {/*======================*/}

              {/* Software Engineer */}
              <View style={styles.categories_box}>
                <View style={styles.categories_box_container}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      marginHorizontal: 20,
                      marginVertical: 5,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 20,
                        textAlign: "center",
                      }}
                    >
                      Software{"\n"}Engineer
                    </Text>
                  </View>

                  {/* container buat gambar forum dan jumlahnya */}
                  <View style={styles.forumImgAndCount}>
                    <View style={styles.forumImgAndCount_Container}>
                      <View>
                        <Image
                          style={styles.forum_img}
                          source={require("../../assets/images/forum-logo.png")}
                        ></Image>
                      </View>

                      <View>
                        <Text style={{ color: "white", fontSize: 15 }}>
                          1.2k
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.container_img}>
                    <Image
                      source={require("../../assets/images/software-engineer.png")}
                      style={{ width: 50, height: 50 }}
                    ></Image>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>

        <View style={styles.discussions_container}>
          <View style={{ paddingLeft: 20 }}>
            <Text style={{ fontWeight: "bold", fontSize: 25 }}>
              Discussions
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <DiscussionSelections></DiscussionSelections>
          </ScrollView>
        </View>

        {/* Thread Selections */}
        <ScrollView>
          <View style={styles.thread_selections_border}>
            <View style={styles.thread_selections}>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <View>
                  <Image
                    source={require("../../assets/images/profile-picture.png")}
                  ></Image>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: 10,
                  }}
                >
                  <View style={{ marginVertical: 2 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                      Claire
                    </Text>
                  </View>

                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <View
                      style={{
                        borderWidth: 2,
                        borderRadius: 5,
                        borderColor: "#CCFF00",
                      }}
                    >
                      <Text
                        style={{ backgroundColor: "#CCFF00", fontSize: 12 }}
                      >
                        Data Science
                      </Text>
                    </View>

                    <View style={{ marginLeft: 5 }}>
                      <Text style={{ color: "rgba(0,0,0,0.3)" }}>just now</Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    marginHorizontal: 90,
                    padding: 10,
                  }}
                >
                  <Image
                    source={require("../../assets/images/three-dots.png")}
                  ></Image>
                </View>
              </View>

              <View>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vestibulum dictum cursus magna sed semper. .
                </Text>
              </View>
            </View>

            {/* Test */}
            <View style={styles.thread_selections}>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <View>
                  <Image
                    source={require("../../assets/images/profile-picture.png")}
                  ></Image>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: 10,
                  }}
                >
                  <View style={{ marginVertical: 2 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                      Claire
                    </Text>
                  </View>

                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <View
                      style={{
                        borderWidth: 2,
                        borderRadius: 5,
                        borderColor: "#CCFF00",
                      }}
                    >
                      <Text
                        style={{ backgroundColor: "#CCFF00", fontSize: 12 }}
                      >
                        Data Science
                      </Text>
                    </View>

                    <View style={{ marginLeft: 5 }}>
                      <Text style={{ color: "rgba(0,0,0,0.3)" }}>just now</Text>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    marginHorizontal: 90,
                    padding: 10,
                  }}
                >
                  <Image
                    source={require("../../assets/images/three-dots.png")}
                  ></Image>
                </View>
              </View>

              <View>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vestibulum dictum cursus magna sed semper. .
                </Text>
              </View>
            </View>
            {/* test lagi */}
            <View style={styles.thread_selections}>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <View>
                  <Image
                    source={require("../../assets/images/profile-picture.png")}
                  ></Image>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: 10,
                  }}
                >
                  <View style={{ marginVertical: 2 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                      Claire
                    </Text>
                  </View>

                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <View
                      style={{
                        borderWidth: 2,
                        borderRadius: 5,
                        borderColor: "#CCFF00",
                      }}
                    >
                      <Text
                        style={{ backgroundColor: "#CCFF00", fontSize: 12 }}
                      >
                        Data Science
                      </Text>
                    </View>

                    <View style={{ marginLeft: 5 }}>
                      <Text style={{ color: "rgba(0,0,0,0.3)" }}>just now</Text>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    marginHorizontal: 90,
                    padding: 10,
                  }}
                >
                  <Image
                    source={require("../../assets/images/three-dots.png")}
                  ></Image>
                </View>
              </View>

              <View>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vestibulum dictum cursus magna sed semper. .
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  thread_selections: {
    Width: 50,
    Height: 50,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },

  thread_selections_border: {
    marginHorizontal: 15,
    borderRadius: 10,
  },

  discussions_choice_container: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 10,
    width: 500,
    justifyContent: "space-between",
    height: 25,
  },

  discussions_container: {
    marginVertical: 20,
    justifyContent: "space-between",
  },

  container_img: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginHorizontal: 20,
    marginVertical: -20,
  },

  forum_img: {
    width: 25,
    height: 25,
    marginHorizontal: 5,
  },

  forumImgAndCount_Container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  forumImgAndCount: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "auto",
    marginVertical: 10,
    marginHorizontal: 40,
  },

  categories_box: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    rowGap: 10,
    marginHorizontal: 10,
  },

  categories_box_container: {
    width: 180,
    height: 170,
    backgroundColor: "#008DDA",
    borderRadius: 15,
  },

  categories_box_container_2: {
    width: 180,
    height: 170,
    backgroundColor: "#41C9E2",
    borderRadius: 15,
  },

  arrow: {
    paddingTop: 50,
    paddingLeft: 10,
  },

  container: {
    display: "flex",
    flexDirection: "column",
  },

  header_container: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    position: "relative",
  },

  discover_container: {
    alignItems: "center",
  },

  discover_text: {
    fontWeight: "bold",
    alignContent: "center",
    fontSize: 27,
    alignContent: "center",
  },

  back_arrow_container: {
    height: 25,
  },

  categories_text: {
    fontWeight: "bold",
    fontSize: 25,
    paddingLeft: 20,
  },

  viewall_text: {
    marginVertical: 5,
    paddingRight: 10,
    marginTop: 10,
  },

  categories_title_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },

  selectedText: {
    color: "black",
  },
  notSelectedText: {
    color: "grey",
  },
});

export default ForumScreen;
