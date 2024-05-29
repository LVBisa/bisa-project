import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const CreateCoursePoster = () => {
  return (
    <View>
      <Text style={styles.posterText}>Poster</Text>
      <View style={styles.dropbox}>
        <Text style={styles.dropboxDesc}>
          Drag and drop your file here, or click upload button below to upload
          JPG or PNG file
        </Text>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.uploadInput}>
            <Text style={styles.uploadText}>Upload</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  posterText: {
    fontSize: 14,
    paddingTop: 20,
    fontFamily: "Inter-Regular",
    fontWeight: "bold",
  },

  dropbox: {
    width: 333,
    height: 177,
    backgroundColor: "#EDFFFF",
    justifyContent: "center",
    marginTop: 5,
  },

  dropboxDesc: {
    fontSize: 11,
    textAlign: "center",
    paddingHorizontal: 50,
    color: "#6E7787",
    fontFamily: "Inter-Regular",
  },

  uploadInput: {
    width: 87,
    height: 28,
    justifyContent: "center",
    backgroundColor: "#EAECEF",
    marginTop: 20,
  },

  uploadText: {
    fontSize: 11,
    color: "#565E6C",
    textAlign: "center",
    fontFamily: "Inter-Regular",
  },
});

export default CreateCoursePoster;
