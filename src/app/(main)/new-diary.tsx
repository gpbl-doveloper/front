import { useState } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ScrollView } from "react-native-gesture-handler";
import Feather from "@expo/vector-icons/Feather";
import ReactLogo from "../../assets/images/icon.png";
import { HorizontalImageGallery } from "@/src/components/main/CardComponent";
import { Href, router, Stack } from "expo-router";

// 알림장 작성 페이지 진행중 - 현재는 공식문서 내용 그대로 작성중
export default function NewDiary() {
  const [image, setImage] = useState<string[] | null>([
    ReactLogo,
    ReactLogo,
    ReactLogo,
  ]);
  const [dogActivityText, setDogActivityText] = useState<string>("");
  const [checkGenerate, setCheckGenerate] = useState<boolean>(false);
  const [imageSelected, setImageSelected] = useState<boolean>(false);

  // image picker 코드
  // const pickImage = async () => {
  //   // No permissions request is necessary for launching the image library
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     setImage(result.assets[0].uri);
  //   }
  // };

  return (
    <ScrollView style={styles.mainContainer}>
      <View>
        <Text style={styles.titleText}>Hello, Dog Name🐾</Text>
      </View>

      {imageSelected ? (
        <HorizontalImageGallery imageData={image} />
      ) : (
        <HorizontalAddImageContainer
          image={image}
          setImageSelected={setImageSelected}
        />
      )}

      {checkGenerate ? (
        // 나중에 axios 통신하고 결과값을 받아서 렌더링하는 방식으로 변경
        <TextGeneratedContainer text={dogActivityText} />
      ) : (
        <TextInputContainer
          inputValue={dogActivityText}
          changeValue={setDogActivityText}
          setCheckGenerate={setCheckGenerate}
        />
      )}
    </ScrollView>
  );
}

function HorizontalAddImageContainer({
  setImageSelected,
}: {
  setImageSelected: (value: boolean) => void;
}) {
  return (
    <View style={styles.photoContainer}>
      <View style={styles.photoBtnContainer}>
        <Feather name="plus-circle" size={24} color="black" />
        <Button
          title="Add Photos"
          onPress={() => {
            setImageSelected(true);
            router.push(`/photos` as Href);
          }}
        />
      </View>
    </View>
  );
}

function TextGeneratedContainer({ text }: { text: string }) {
  const 내용 =
    "Hi Mom!\n\nToday I had a great day doing this this this ..,\n\nI took a nap for about 2 hours and had a nice snack. Really loved it 🐾 ";

  return (
    <View style={styles.textGeneratedContainer}>
      {/* {data.files.map((file, index) => (
        <Image key={index} source={{ uri: file }} style={styles.image} />
      ))} */}
      <Text>{내용}</Text>
    </View>
  );
}

function TextInputContainer({
  inputValue,
  changeValue,
  setCheckGenerate,
}: {
  inputValue: string;
  changeValue: (value: string) => void;
  setCheckGenerate: (value: boolean) => void;
}) {
  return (
    <View style={styles.textInputContainer}>
      <TextInput
        value={inputValue}
        onChangeText={changeValue}
        placeholder="Enter dog activity"
        multiline={true}
        style={{ lineHeight: 25 }}
      />
      <View style={styles.BtnContainer}>
        <TouchableOpacity
          style={styles.generateBtn}
          onPress={() => {
            setCheckGenerate(true);
          }}
        >
          <Text>Generate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textGeneratedContainer: {
    backgroundColor: "#FCB3AD",
    padding: 16,
    borderRadius: 16,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  BtnContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  generateBtn: {
    width: 100,
    backgroundColor: "#FCB3AD",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  textInputContainer: {
    justifyContent: "space-between",
    marginTop: 20,
    backgroundColor: "#F6F6F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    padding: 16,
    borderRadius: 16,
    minHeight: 180,
  },
  photoBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  photoContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#F6F6F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    padding: 10,
    borderRadius: 16,
    minHeight: 180,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 8,
  },
  mainContainer: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  image: {
    width: 160,
    height: 160,
  },
});
