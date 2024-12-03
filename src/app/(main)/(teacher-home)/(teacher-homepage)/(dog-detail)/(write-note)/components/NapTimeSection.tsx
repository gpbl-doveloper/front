import { Text, View } from "react-native";
import { writeNoteStyles } from "../styles/styles";
import RNDateTimePicker from "@react-native-community/datetimepicker";

export function NapTimeSection({
  napStartTime,
  napEndTime,
  setNapStartTime,
  setNapEndTime,
}: {
  napStartTime: { hour: string; minute: string; period: string };
  napEndTime: { hour: string; minute: string; period: string };
  setNapStartTime: React.Dispatch<
    React.SetStateAction<{ hour: string; minute: string; period: string }>
  >;
  setNapEndTime: React.Dispatch<
    React.SetStateAction<{ hour: string; minute: string; period: string }>
  >;
}) {
  // 현재 시간값을 Date 객체로 변환하는 함수
  const getTimeAsDate = (time: {
    hour: string;
    minute: string;
    period: string;
  }) => {
    const date = new Date();
    const hour = parseInt(time.hour);
    const minute = parseInt(time.minute);
    const isPM = time.period.toUpperCase() === "PM";

    date.setHours(isPM ? hour + 12 : hour);
    date.setMinutes(minute);
    return date;
  };

  const handleStartTimeChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      const hours = selectedDate.getHours();
      const minutes = selectedDate.getMinutes();
      const isPM = hours >= 12;
      setNapStartTime({
        hour: (hours % 12 || 12).toString(),
        minute: minutes.toString().padStart(2, "0"),
        period: isPM ? "PM" : "AM",
      });
    }
  };

  const handleEndTimeChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      const hours = selectedDate.getHours();
      const minutes = selectedDate.getMinutes();
      const isPM = hours >= 12;
      setNapEndTime({
        hour: (hours % 12 || 12).toString(),
        minute: minutes.toString().padStart(2, "0"),
        period: isPM ? "PM" : "AM",
      });
    }
  };

  return (
    <>
      <Text style={writeNoteStyles.sectionTitle}>Nap Time</Text>
      <View style={writeNoteStyles.timePickers}>
        <View style={writeNoteStyles.timePickerButton}>
          <Text style={writeNoteStyles.timeText}>From</Text>
          <RNDateTimePicker
            value={getTimeAsDate(napStartTime)}
            mode="time"
            is24Hour={false}
            display="default"
            onChange={handleStartTimeChange}
          />
        </View>

        <View style={writeNoteStyles.timePickerButton}>
          <Text style={writeNoteStyles.timeText}>Until</Text>
          <RNDateTimePicker
            value={getTimeAsDate(napEndTime)}
            mode="time"
            is24Hour={false}
            display="default"
            onChange={handleEndTimeChange}
          />
        </View>
      </View>
    </>
  );
}
