import { ButtonBigSize } from "@/src/components/Buttons";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { postNotetoBackend } from "./writeNoteModel";
import { useFirebaseAuth } from "@/src/store/userStore";
import { useSelectedDogStore } from "@/src/store/dogStore";

const convertToISO = ({
  hour,
  minute,
  period,
}: {
  hour: string;
  minute: string;
  period: string;
}): string => {
  const date = new Date(); // 오늘 날짜 사용
  const isPM = period.toUpperCase() === "PM";
  const hour24 = isPM ? (parseInt(hour) % 12) + 12 : parseInt(hour) % 12;

  // 날짜에 시간 설정
  date.setHours(hour24, parseInt(minute), 0, 0);

  return date.toISOString(); // ISO 8601 형식 반환
};

function NoteScreen() {
  const [activities, setActivities] = useState("");
  const [note, setNote] = useState("");
  const [feedingTime, setFeedingTime] = useState<number>(0);
  const [feedingAmt, setFeedingAmt] = useState("Nothing");
  const [napStart, setNapStart] = useState({
    hour: "10",
    minute: "00",
    period: "AM",
  });
  const [napEnd, setNapEnd] = useState({
    hour: "10",
    minute: "00",
    period: "AM",
  });
  const navigation = useNavigation();
  const { idToken } = useFirebaseAuth();
  const { selectedDog } = useSelectedDogStore();
  if (!selectedDog) {
    navigation.goBack();
    return null;
  }

  const handleSubmit = () => {
    try {
      const diaryData = {
        activities,
        feedingTime,
        feedingAmt,
        napStart: convertToISO(napStart),
        napEnd: convertToISO(napEnd),
        note,
        dogId: selectedDog.id,
      };
      postNotetoBackend({ diaryData, idToken });
      navigation.goBack();
    } catch (error) {
      console.log("Failed to send note", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>← Note</Text>
      </TouchableOpacity>

      {/* Activities Section */}
      <ActivitiesSection activity={activities} setActivity={setActivities} />

      {/* Feeding Section */}
      <FeedingSection
        feedingTime={feedingTime}
        setFeedingTime={setFeedingTime}
        feedingAmount={feedingAmt}
        setFeedingAmount={setFeedingAmt}
      />

      {/* Nap Time Section */}
      <NapTimeSection
        napStartTime={napStart}
        napEndTime={napEnd}
        setNapStartTime={setNapStart}
        setNapEndTime={setNapEnd}
      />

      {/* Additional Notes Section */}
      <AdditionalNotesSection
        additionalNotes={note}
        setAdditionalNotes={setNote}
      />

      {/* Save and Send Buttons */}
      <View style={styles.saveButtonContainer}>
        {/* <ButtonBigSize
          text="Save Draft"
          buttonColor="white"
          onPress={() => {}}
        /> */}
        <ButtonBigSize text="Send" buttonColor="white" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
}

function NapTimeSection({
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
  return (
    <>
      <Text style={styles.sectionTitle}>Nap Time</Text>
      <View style={styles.timePickers}>
        <Text style={styles.subTitle}>From</Text>
        <View style={styles.timePickerRow}>
          <TextInput
            style={styles.timePickerInput}
            value={napStartTime.hour}
            onChangeText={(text) =>
              setNapStartTime((prev) => ({ ...prev, hour: text }))
            }
          />
          <Text>:</Text>
          <TextInput
            style={styles.timePickerInput}
            value={napStartTime.minute}
            onChangeText={(text) =>
              setNapStartTime((prev) => ({ ...prev, minute: text }))
            }
          />
          <TextInput
            style={styles.timePickerInput}
            value={napStartTime.period}
            onChangeText={(text) =>
              setNapStartTime((prev) => ({ ...prev, period: text }))
            }
          />
        </View>

        <Text style={styles.subTitle}>Until</Text>
        <View style={styles.timePickerRow}>
          <TextInput
            style={styles.timePickerInput}
            value={napEndTime.hour}
            onChangeText={(text) =>
              setNapEndTime((prev) => ({ ...prev, hour: text }))
            }
          />
          <Text>:</Text>
          <TextInput
            style={styles.timePickerInput}
            value={napEndTime.minute}
            onChangeText={(text) =>
              setNapEndTime((prev) => ({ ...prev, minute: text }))
            }
          />
          <TextInput
            style={styles.timePickerInput}
            value={napEndTime.period}
            onChangeText={(text) =>
              setNapEndTime((prev) => ({ ...prev, period: text }))
            }
          />
        </View>
      </View>
    </>
  );
}

function ActivitiesSection({
  activity,
  setActivity,
}: {
  activity: string;
  setActivity: (text: string) => void;
}) {
  return (
    <>
      <Text style={styles.sectionTitle}>Activities</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Enter the activities of the day"
        value={activity}
        onChangeText={setActivity}
        multiline
      />
    </>
  );
}
function AdditionalNotesSection({
  additionalNotes,
  setAdditionalNotes,
}: {
  additionalNotes: string;
  setAdditionalNotes: (text: string) => void;
}) {
  return (
    <>
      <Text style={styles.sectionTitle}>Additional Notes</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Enter additional notes"
        value={additionalNotes}
        onChangeText={setAdditionalNotes}
        multiline
      />
    </>
  );
}

function FeedingSection({
  feedingTime,
  setFeedingTime,
  feedingAmount,
  setFeedingAmount,
}: any) {
  return (
    <>
      <Text style={styles.sectionTitle}>Feeding</Text>
      <Text style={styles.subTitle}>Time</Text>
      <View style={styles.timeButtons}>
        {[1, 2, 3, 0].map((time) => (
          <TouchableOpacity
            key={time}
            style={[
              styles.timeButton,
              feedingTime === time && styles.activeButton,
            ]}
            onPress={() => setFeedingTime(time)}
          >
            <Text
              style={
                feedingTime === time
                  ? styles.activeButtonText
                  : styles.buttonText
              }
            >
              {time}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.subTitle}>How much</Text>
      <View style={styles.amountButtons}>
        {["All", "Some", "Nothing"].map((amount) => (
          <TouchableOpacity
            key={amount}
            style={[
              styles.timeButton,
              feedingAmount === amount && styles.activeButton,
            ]}
            onPress={() => setFeedingAmount(amount)}
          >
            <Text
              style={
                feedingAmount === amount
                  ? styles.activeButtonText
                  : styles.buttonText
              }
            >
              {amount}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FAF4EE",
    paddingBottom: 100,
  },
  backButton: {
    marginBottom: 20,
  },
  backText: {
    fontSize: 18,
    color: "#5C4033",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#5C4033",
    marginVertical: 10,
  },
  textArea: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 10,
    height: 60,
    marginBottom: 20,
    color: "#666",
  },
  subTitle: {
    fontSize: 14,
    color: "#5C4033",
    marginVertical: 5,
  },
  timeButtons: {
    flexDirection: "row",
    marginBottom: 10,
  },
  timeButton: {
    flex: 1,
    backgroundColor: "#F3EDE4",
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  activeButton: {
    backgroundColor: "#D3C1A5",
  },
  buttonText: {
    color: "#5C4033",
  },
  activeButtonText: {
    color: "#FFF",
  },
  amountButtons: {
    flexDirection: "row",
    marginBottom: 20,
  },
  timePickers: {
    flexDirection: "column",
    marginBottom: 20,
  },
  timePickerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  timePickerInput: {
    width: 40,
    textAlign: "center",
    backgroundColor: "#F3EDE4",
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 5,
  },
  saveButtonContainer: {
    gap: 16,
    marginBottom: 36,
  },
});

export default NoteScreen;

const a = {
  activities: "Fff",
  dogId: 2,
  feedingAmt: "Nothing",
  feedingTime: 0,
  napEnd: "2024-11-15T17:00:00.000Z",
  napStart: "2024-11-15T16:00:00.000Z",
  note: "Ddd",
};
