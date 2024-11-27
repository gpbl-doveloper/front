import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { ButtonBigSize } from "../../../components/Buttons";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
import { PostParentDogProps } from "../../../apis/apiDogs/post";
import { postParentDogAPI } from "./addDogsModel";
import { useFirebaseAuth } from "../../../store/userStore";
import { useRoute } from "@react-navigation/native";

type RootStackParamList = {
  PhotoSelector: {
    selectedPhotos: string[];
  };
};
type RouteProps = RouteProp<
  {
    AddDog: {
      selectedPhotos?: string[];
    };
  },
  "AddDog"
>;

export default function AddDog() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProps>(); // route 객체로 전달된 데이터 수신
  const [dogName, setDogName] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [breed, setBreed] = useState("");

  const [genderOpen, setGenderOpen] = useState<boolean>(false);
  const [gender, setGender] = useState("Female");
  const [neuteringOpen, setNeuteringOpen] = useState<boolean>(false);
  const [neutering, setNeutering] = useState("Done");

  const { idToken } = useFirebaseAuth();

  const GENDER_OPTIONS = [
    { label: "Female", value: "Female" },
    { label: "Male", value: "Male" },
  ];
  const NEUTERING_OPTIONS = [
    { label: "Done", value: "Done" },
    { label: "Not Done", value: "Not Done" },
  ];

  // 선택된 사진 상태
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);

  // PhotoSelector에서 전달된 사진 데이터 처리
  useEffect(() => {
    if (route.params?.selectedPhotos) {
      setSelectedPhotos(route.params.selectedPhotos);
    }
  }, [route.params]);

  const handlePhotoSelect = () => {
    navigation.navigate("PhotoSelector", {
      selectedPhotos: selectedPhotos, // 현재 선택된 사진들도 전달
    });
  };

  const renderPhotoPreview = () => {
    console.log("Selected Photos ㄹ:", selectedPhotos);
    if (selectedPhotos.length === 0) {
      return (
        <TouchableOpacity
          style={styles.pictureContainer}
          onPress={handlePhotoSelect}
        >
          <Text style={styles.about}>Add 10+ photos of your dog</Text>
          <View style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>📷</Text>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.photoPreviewContainer}>
        <TouchableOpacity
          style={styles.addMorePhotos}
          onPress={handlePhotoSelect}
        >
          <Text style={styles.addMorePhotosText}>Edit Photos</Text>
        </TouchableOpacity>
        <FlatList
          data={selectedPhotos}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }} // 이제 URI를 직접 사용
              style={styles.previewImage}
              onError={(error) =>
                console.log("Image Error:", error.nativeEvent.error)
              }
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  };

  const HandleSubmit = async () => {
    const isoDate = new Date(
      `${birthYear}-${birthMonth}-${birthDay}T00:00:00.000Z`
    ).toISOString();

    const dogDetailsData: PostParentDogProps = {
      name: dogName,
      sex: gender,
      isNeutered: neutering === "Done",
      breed: breed,
      bod: isoDate,
    };

    const result = await postParentDogAPI(
      idToken,
      selectedPhotos,
      dogDetailsData
    );
    console.log("result", result);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Dog</Text>

      {/* Picture Upload */}
      {renderPhotoPreview()}
      {/* Dog name */}
      <TextInputField
        title="Dog Name"
        placeholder="Dog name"
        value={dogName}
        onChangeText={setDogName}
      />

      {/* Date of Birth */}
      <DateOfBirthInput
        birthMonth={birthMonth}
        setBirthMonth={setBirthMonth}
        birthDay={birthDay}
        setBirthDay={setBirthDay}
        birthYear={birthYear}
        setBirthYear={setBirthYear}
      />

      {/* Breed */}
      <TextInputField
        title="Breed"
        placeholder="Breed"
        value={breed}
        onChangeText={setBreed}
      />

      {/* Gender Picker */}
      <BasicContainer title={"Gender"}>
        <DropDownPicker
          open={genderOpen}
          value={gender}
          items={GENDER_OPTIONS}
          setOpen={setGenderOpen}
          setValue={setGender}
          style={styles.picker}
        />
      </BasicContainer>

      {/* Neutering Picker */}
      <BasicContainer title={"Neutering"}>
        <DropDownPicker
          open={neuteringOpen}
          value={neutering}
          items={NEUTERING_OPTIONS}
          setOpen={setNeuteringOpen}
          setValue={setNeutering}
          style={styles.picker}
        />
      </BasicContainer>

      {/* Submit Button */}
      <ButtonBigSize
        text={"Submit"}
        buttonColor={"black"}
        onPress={HandleSubmit}
        disabled={false}
      />
    </ScrollView>
  );
}
interface TextInputFieldProps {
  title: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

function TextInputField({
  title,
  placeholder,
  value,
  onChangeText,
}: TextInputFieldProps) {
  return (
    <BasicContainer title={title}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </BasicContainer>
  );
}

// DropDownPicker의 setOpen과 interface에서 저장해둔 타입이 맞지 않아 잠시 봉인

// interface DropdownFieldProps {
//     title: string; // 컨테이너 제목
//     open: boolean; // 드롭다운 열림 상태
//     value: any; // 현재 선택된 값
//     items: any[]; // 드롭다운 항목
//     setOpen: (open: boolean) => void; // 열림 상태 설정 함수
//     setValue: (value: any) => void; // 선택된 값 설정 함수
//     style?: any; // 커스텀 스타일
// }

// function DropdownField({
//                            title,
//                            open,
//                            value,
//                            items,
//                            setOpen,
//                            setValue,
//                            style,
//                        }: DropdownFieldProps) {
//     // @ts-ignore
//     return (
//         <BasicContainer title={title}>
//             <DropDownPicker
//                 open={open}
//                 value={value}
//                 items={items}
//                 setOpen={(open: boolean) => setOpen(open)}
//                 setValue={setValue}
//                 style={style}
//             />
//         </BasicContainer>
//     );
// }

function DateOfBirthInput({
  birthMonth,
  setBirthMonth,
  birthDay,
  setBirthDay,
  birthYear,
  setBirthYear,
}: any) {
  return (
    <BasicContainer title={"Date of Birth"}>
      <View style={styles.dateContainer}>
        <TextInput
          style={[styles.input, styles.dateInput]}
          placeholder="MM"
          keyboardType="numeric"
          value={birthMonth}
          onChangeText={setBirthMonth}
        />
        <TextInput
          style={[styles.input, styles.dateInput]}
          placeholder="DD"
          keyboardType="numeric"
          value={birthDay}
          onChangeText={setBirthDay}
        />
        <TextInput
          style={[styles.input, styles.dateInput]}
          placeholder="YYYY"
          keyboardType="numeric"
          value={birthYear}
          onChangeText={setBirthYear}
        />
      </View>
    </BasicContainer>
  );
}

function BasicContainer({ title, children }: any) {
  return (
    <View style={styles.BasicContainer}>
      <Text style={styles.subTitle}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fdf3e7", // 배경색
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  pictureContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  about: {
    fontSize: 16,
    color: "#6b4f4f",
    marginBottom: 20,
  },
  uploadButton: {
    alignSelf: "center",
    backgroundColor: "#8b5a2b",
    padding: 10,
    borderRadius: 50,
    marginBottom: 20,
  },
  uploadButtonText: {
    fontSize: 24,
    color: "white",
  },
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
    borderColor: "#dcdcdc",
    borderWidth: 1,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateInput: {
    flex: 1,
    marginRight: 10,
  },
  BasicContainer: {
    gap: 10,
  },
  picker: {
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  // 선택된 사진 미리보기
  photoPreviewContainer: {
    marginBottom: 20,
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 8,
  },
  addMorePhotos: {
    marginBottom: 10,
    padding: 8,
    backgroundColor: "#8b5a2b",
    borderRadius: 8,
    alignSelf: "flex-end",
  },
  addMorePhotosText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
});
