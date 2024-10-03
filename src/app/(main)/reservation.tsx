import { IconTextBtn } from "@/src/components/main/Button";
import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

export default function DiaryScreen() {
  const [imageData, setImageData] = React.useState([
    { imageUri: "" },
    { imageUri: "" },
    { imageUri: "" },
    { imageUri: "" },
  ]);
  return (
    <ScrollView style={styles.content}>
      {/* Teacher Name */}
      <Text style={styles.teacherName}>Teacher Name</Text>

      {/* Image Gallery */}
      <ScrollView style={styles.imageGallery} horizontal={true}>
        {imageData.map((data, index) => (
          <View style={styles.imageContainer}>
            <Image
              key={index}
              source={require("../../assets/images/icon.png")}
              style={styles.image}
            />
          </View>
        ))}
      </ScrollView>

      {/* Dog Card */}
      <View style={styles.dogCard}>
        <View style={styles.dogNameFaceContainer}>
          <View style={styles.dogFaceIcon}>
            <FontAwesome6 name="dog" size={24} color="black" />
          </View>
          <Text style={styles.dogName}>Dog Name</Text>
        </View>

        <Text style={styles.message}>
          Hi Mom!{"\n"}
          {"\n"}
          Today I had a great day doing this this this ..,{"\n"}
          {"\n"}I took a nap for about 2 hours and had a nice snack. Really
          loved it 🐾
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    paddingRight: 12,
  },
  container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
  },
  header: {
    backgroundColor: "#F4B2B0",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  content: {
    padding: 20,
  },
  teacherName: {
    fontSize: 24,
    marginBottom: 20,
  },
  imageGallery: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "#F4B2B0",
    padding: 15,
    borderRadius: 10,
    flexWrap: "nowrap",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: "#F4B2B0",
  },
  dogNameFaceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  dogFaceIcon: {
    backgroundColor: "#fff",
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  dogCard: {
    backgroundColor: "#F4B2B0",
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 10,
    marginBottom: 20,
    minHeight: 250,
    gap: 10,
  },
  dogName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "bold",
  },
  bottomNavigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
    backgroundColor: "#F4B2B0",
  },
  navItem: {
    fontSize: 18,
    color: "#fff",
  },
});
