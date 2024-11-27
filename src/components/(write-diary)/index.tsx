// import {useState} from "react";
// import {
//     Alert,
//     Button,
//     StyleSheet,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View,
// } from "react-native";
// import {ScrollView} from "react-native-gesture-handler";
// import Feather from "@expo/vector-icons/Feather";
// import {HorizontalImageGallery} from "@/src/components/main/CardComponent";
// import {Href, router} from "expo-router";
// import {CancelTwoButtons} from "@/src/components/main/Button";
// import {useAddDiaryStore} from "@/src/store/diaryStore";
// import {postCenterDiary} from "../../apis/apiDiaries/post";
//
// export default function NewDiary() {
//     // 강아지 활동 내용 + 강아지 이미지
//     const {
//         inputDiaryContent,
//         setInputDiaryContent,
//         inputDiaryFiles = [],
//         setInputDiaryFiles,
//     } = useAddDiaryStore();
//     // GPT로 번역이 되었는지 여부, 삭제할지 사용할지 고민
//     const [checkGenerate, setCheckGenerate] = useState<boolean>(false);
//
//     function handleSubmit() {
//         if (inputDiaryFiles.length === 0) {
//             Alert.alert("Please add at least 1 image.");
//             return;
//         } else if (!inputDiaryContent) {
//             Alert.alert("Please enter the diary content.");
//             return;
//         }
//         let inputData = {
//             inputDiaryContent: inputDiaryContent,
//             inputDiaryFiles: inputDiaryFiles,
//         };
//         postCenterDiary(inputData);
//         router.replace("/teacher-home" as Href);
//     }
//
//     return (
//         <ScrollView contentContainerStyle={styles.mainContainer}>
//             {/* 임시 코드임, 사진 삭제 기능 나오면 코드 제거 */}
//             <TouchableOpacity onPress={() => setInputDiaryFiles([])}>
//                 {/* </임시코드> */}
//
//                 <View>
//                     {/* 추후 props로 Dog Name 받고, Dog Name은 변수로 추가 */}
//                     <Text style={styles.titleText}>Hello, Dog Name🐾</Text>
//                 </View>
//
//                 {/* <임시코드> */}
//             </TouchableOpacity>
//             {/* </임시코드> */}
//
//             {/* 이미지 선택 컴포넌트 */}
//             {inputDiaryFiles?.length ? (
//                 <HorizontalImageGallery imageData={inputDiaryFiles}/>
//             ) : (
//                 <AddImageContainer/>
//             )}
//
//             {/* 텍스트 입력 컴포넌트 */}
//             {checkGenerate ? (
//                 // 나중에 axios 통신하고 결과값을 받아서 렌더링하는 방식으로 변경
//                 <TextGeneratedContainer
//                     text={inputDiaryContent}
//                     setCheckGenerate={setCheckGenerate}
//                 />
//             ) : (
//                 <TextInputContainer
//                     inputValue={inputDiaryContent}
//                     changeValue={setInputDiaryContent}
//                     setCheckGenerate={setCheckGenerate}
//                 />
//             )}
//
//             {/* 하단 제출 버튼 */}
//             <CancelTwoButtons
//                 leftButtonFunction={() => router.back()}
//                 rightButtonFunction={handleSubmit}
//             />
//         </ScrollView>
//     );
// }
//
// function AddImageContainer() {
//     return (
//         <View style={styles.photoContainer}>
//             <View style={styles.photoBtnContainer}>
//                 <Feather name="plus-circle" size={24} color="black"/>
//                 <Button
//                     title="Add Photos"
//                     onPress={() => {
//                         router.push(`/photo` as Href);
//                     }}
//                 />
//             </View>
//         </View>
//     );
// }
//
// function TextInputContainer({
//                                 inputValue,
//                                 changeValue,
//                                 setCheckGenerate,
//                             }: {
//     inputValue: string;
//     changeValue: (value: string) => void;
//     setCheckGenerate: (value: boolean) => void;
// }) {
//     return (
//         <View style={styles.textInputContainer}>
//             <TextInput
//                 value={inputValue}
//                 onChangeText={changeValue}
//                 placeholder="Enter dog activity"
//                 multiline={true}
//                 style={{lineHeight: 25}}
//             />
//             <View style={styles.BtnContainer}>
//                 <TouchableOpacity
//                     style={styles.generateBtn}
//                     onPress={() => {
//                         setCheckGenerate(true);
//                     }}
//                 >
//                     <Text>Generate</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// }
//
// //나중에 컴포넌트화 시켜서 따로 빼기
// function TextGeneratedContainer({
//                                     text,
//                                     setCheckGenerate,
//                                 }: {
//     text: string;
//     setCheckGenerate: (value: boolean) => void;
// }) {
//     const 내용 =
//         "Hi Mom!\n\nToday I had a great day doing this this this ..,\n\nI took a nap for about 2 hours and had a nice snack. Really loved it 🐾 ";
//
//     return (
//         <TouchableOpacity
//             style={styles.textGeneratedContainer}
//             onPress={() => setCheckGenerate(false)}
//         >
//             <Text>{내용}</Text>
//         </TouchableOpacity>
//     );
// }
//
// const styles = StyleSheet.create({
//     textGeneratedContainer: {
//         backgroundColor: "#FCB3AD",
//         padding: 16,
//         borderRadius: 16,
//         marginTop: 20,
//         shadowColor: "#000",
//         shadowOffset: {width: 0, height: 4},
//         shadowOpacity: 0.25,
//         shadowRadius: 4,
//         elevation: 4,
//     },
//     BtnContainer: {
//         flexDirection: "row",
//         justifyContent: "flex-end",
//     },
//     generateBtn: {
//         width: 100,
//         backgroundColor: "#FCB3AD",
//         height: 40,
//         justifyContent: "center",
//         alignItems: "center",
//         borderRadius: 16,
//     },
//     textInputContainer: {
//         justifyContent: "space-between",
//         marginTop: 20,
//         backgroundColor: "#F6F6F6",
//         shadowColor: "#000",
//         shadowOffset: {width: 0, height: 4},
//         shadowOpacity: 0.25,
//         shadowRadius: 4,
//         elevation: 4,
//         padding: 16,
//         borderRadius: 16,
//         minHeight: 180,
//     },
//     photoBtnContainer: {
//         flexDirection: "row",
//         alignItems: "center",
//     },
//     photoContainer: {
//         flex: 1,
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexDirection: "row",
//         backgroundColor: "#F6F6F6",
//         shadowColor: "#000",
//         shadowOffset: {width: 0, height: 4},
//         shadowOpacity: 0.25,
//         shadowRadius: 4,
//         elevation: 4,
//         padding: 10,
//         borderRadius: 16,
//         minHeight: 130,
//     },
//     titleText: {
//         fontSize: 24,
//         fontWeight: "bold",
//         marginVertical: 8,
//     },
//     mainContainer: {
//         flex: 1,
//         padding: 20,
//         gap: 20,
//         justifyContent: "space-between",
//     },
//     image: {
//         width: 160,
//         height: 160,
//     },
// });
