import { ButtonBigSize } from "@/src/components/Buttons";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export function ChooseDatePage() {
  const [date, setDate] = useState(new Date()); // 기본 날짜를 오늘 날짜로 설정
  const [time, setTime] = useState(new Date());

  const onChange = (event: any, selectedDate?: Date) => {
    if (event.type === "set" && selectedDate) {
      setDate(selectedDate); // 선택한 날짜로 설정
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Date/Time</Text>
      <View style={styles.dateContainer}>
        <RNDateTimePicker
          value={date}
          mode="date"
          display="inline"
          onChange={onChange}
          style={styles.datePicker}
        />
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>Time</Text>
          <RNDateTimePicker
            value={time}
            mode="time"
            display="inline"
            onChange={onChange}
            style={styles.datePicker}
          />
        </View>
      </View>
      <ButtonBigSize
        buttonColor="brown"
        onPress={() => {
          console.log(date);
        }}
        text="Next"
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
