import { ButtonBigSize } from "@/src/components/Buttons";
import { useSelectedDogStore } from "@/src/store/dogStore";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { makeReservationAPI } from "../(add-reservation)/addReservationModel";
import { useFirebaseAuth } from "@/src/store/userStore";
import { useSelectedCenterStore } from "@/src/store/centerStore";
import { useNavigation } from "expo-router";

export function ChooseDatePage() {
  const [date, setDate] = useState(new Date()); // 기본 날짜를 오늘 날짜로 설정
  const { centerId } = useSelectedCenterStore();
  const navigation = useNavigation();
  // 현재 시간으로 설정
  const [time, setTime] = useState(() => {
    const now = new Date();
    now.setSeconds(0);
    now.setMilliseconds(0);
    return now;
  });
  const { selectedDog } = useSelectedDogStore();
  const { idToken } = useFirebaseAuth();

  const onDateChange = (event: any, selectedDate?: Date) => {
    if (event.type === "set" && selectedDate) {
      setDate(selectedDate);
    }
  };

  const onTimeChange = (event: any, selectedTime?: Date) => {
    if (event.type === "set" && selectedTime) {
      setTime(selectedTime);
    }
  };
  const onMakeReservation = async () => {
    if (!selectedDog) {
      // 선택된 강아지가 없을 경우 처리
      return;
    }
    const finalDateTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes()
    );

    // 로컬 시간대로 조정
    const offset = finalDateTime.getTimezoneOffset() * 60000;
    const localDateTime = new Date(finalDateTime.getTime() - offset);

    const reservationData = {
      dogId: selectedDog.id,
      date: localDateTime.toISOString(),
      centerId: centerId,
    };

    const response = await makeReservationAPI(idToken, reservationData);
    navigation.navigate("index");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Date/Time</Text>
      <View style={styles.dateContainer}>
        <RNDateTimePicker
          value={date}
          mode="date"
          display="inline"
          onChange={onDateChange}
          style={styles.datePicker}
          timeZoneName="America/Los_Angeles" // 캘리포니아 시간대
        />
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>Time</Text>
          <RNDateTimePicker
            value={time}
            mode="time"
            display="inline"
            onChange={onTimeChange}
            style={styles.datePicker}
            timeZoneName="America/Los_Angeles" // 캘리포니아 시간대
          />
        </View>
      </View>
      <ButtonBigSize
        buttonColor="brown"
        onPress={onMakeReservation}
        text="Make Reservation"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8EE",
    gap: 12,
    paddingVertical: 24,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  dateContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  datePicker: {},
  timeText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    alignItems: "center",
    padding: 12,
  },
});
