// // index.tsx
// import "../../../../global.css";
// import React, {useEffect} from "react";
// import {View, Text, StyleSheet, Alert} from "react-native";
// import {
//     VerticalList,
//     TodayCardComponent,
// } from "@/src/components/main/CardComponent";
// import {ScrollView} from "react-native-gesture-handler";
// import {useUserStore} from "@/src/store/userStore";
// import {DogNameAndMedicine} from "@/src/components/components";
// // import { getAllDiaryList } from "@/src/apis/apiDiary";
// import {Diary, useDiaryStore} from "@/src/store/diaryStore";
//
// export default function MainScreen() {
//     const user = useUserStore((state) => state.user); // 타입 자동 추론 (User | null)
//     const {diaries, setDiaries} = useDiaryStore();
//
//     const [todayDiary, setTodayDiary] = React.useState<Diary>({
//         // 초기값 설정
//         authorId: null,
//         content: "",
//         createdAt: "",
//         dogId: null,
//         files: [],
//         id: 0,
//     });
//
//     useEffect(() => {
//         const fetchDiaryList = async () => {
//             try {
//                 const result = await getAllDiaryList();
//                 if (result) {
//                     setDiaries(result.data.diarys);
//
//                     const latestDiary = result.data.diarys.sort(
//                         (a: Diary, b: Diary) =>
//                             new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//                     )[0];
//
//                     setTodayDiary(latestDiary);
//                 }
//             } catch (error) {
//                 console.error("Failed to fetch diary list:", error);
//             }
//         };
//
//         fetchDiaryList();
//     }, []);
//
//     return (
//         <ScrollView style={styles.mainContainer}>
//             <View>
//                 <Text style={styles.titleText}>
//                     Hello, {user ? user.email : "Guest"} 🐾
//                 </Text>
//
//                 <DogNameAndMedicine userRole={""}/>
//             </View>
//
//             {/* Today 메뉴 */}
//             <View style={styles.subContentContainer}>
//                 <Text style={styles.subTitleText}>Today</Text>
//
//                 <TodayCardComponent todayDiary={todayDiary}/>
//             </View>
//
//             {/* History 메뉴 */}
//             <View style={styles.subContentContainer}>
//                 <Text style={styles.subTitleText}>History</Text>
//                 {diaries.length === 0 && <Text>일기가 없습니다.</Text>}
//                 {/* 추후 url 수정 예정, 이전 알림장들 링크로 가야됨 (diary/숫자) */}
//                 <VerticalList dataList={diaries} url={"diary"}/>
//             </View>
//         </ScrollView>
//     );
// }
//
// const styles = StyleSheet.create({
//     titleText: {
//         fontSize: 24,
//         fontWeight: "bold",
//         marginVertical: 8,
//     },
//     mainContainer: {
//         display: "flex",
//         padding: 16,
//         gap: 24, //이거 적용 안됨
//         flexGrow: 1,
//     },
//     subTitleText: {
//         fontSize: 20,
//         fontWeight: "bold",
//         marginVertical: 16,
//         paddingHorizontal: 6,
//     },
//     subContentContainer: {
//         paddingHorizontal: 8,
//         paddingBottom: 32,
//     },
// });
