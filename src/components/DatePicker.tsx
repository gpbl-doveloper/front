import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import reservationStyles from "../app/(main)/(teacher-home)/(reservation)/styles";

export function ReservationDate({ children }: { children?: React.ReactNode }) {
  const [date, setDate] = useState(new Date()); // 기본 날짜를 오늘 날짜로 설정

  const onChange = (event: any, selectedDate?: Date) => {
    if (event.type === "set" && selectedDate) {
      setDate(selectedDate); // 선택한 날짜로 설정
    }
  };

  // 날짜 포맷
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <View style={reservationStyles.dateContainer}>
      {/* 날짜 선택 버튼 */}
      <TouchableOpacity style={reservationStyles.dateButton}>
        <Text style={reservationStyles.dateText}>{formattedDate}</Text>
      </TouchableOpacity>

      {/* DateTimePicker */}
      <RNDateTimePicker
        value={date}
        mode="date"
        display="calendar"
        onChange={onChange}
      />
      {children}
    </View>
  );
}
