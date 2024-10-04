import { IconBtn, IconTextBtn } from "@/src/components/main/Button";
import { Href, router } from "expo-router";
import { StyleSheet, View } from "react-native";

export function DogNameAndMedicine(props: { userRole: string }) {
  return (
    // 상단 버튼, 강아지 이름 선택 및 약 아이콘
    <View style={styles.btnContainer}>
      <IconTextBtn
        title="Dog Name"
        icon="dog"
        onPress={() => router.push("/" as Href)}
      />
      {/* user == teacher이면 Icon누르면 /new-photo로, 
      user == dogowner이면 Icon누르면 /medicine */}
      {props.userRole ? (
        <IconBtn
          icon="medicinebox"
          onPress={() => router.push("/photo" as Href)}
        ></IconBtn>
      ) : (
        <IconBtn
          icon="medicinebox"
          onPress={() => router.push("/medicine" as Href)}
        ></IconBtn>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
});
