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
} from "react-native";

function NoteScreen() {
  const [activity, setActivity] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [feedingTime, setFeedingTime] = useState<number | null>(null);
  const [feedingAmount, setFeedingAmount] = useState("Nothing");
  const [napStartTime, setNapStartTime] = useState({
    hour: "10",
    minute: "00",
    period: "AM",
  });
  const [napEndTime, setNapEndTime] = useState({
    hour: "10",
    minute: "00",
    period: "AM",
  });
  const navigation = useNavigation();

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
      <ActivitiesSection activity={activity} setActivity={setActivity} />

      {/* Feeding Section */}
      <FeedingSection
        feedingTime={feedingTime}
        setFeedingTime={setFeedingTime}
        feedingAmount={feedingAmount}
        setFeedingAmount={setFeedingAmount}
      />

      {/* Nap Time Section */}
      <NapTimeSection napStartTime={napStartTime} napEndTime={napEndTime} />

      {/* Additional Notes Section */}
      <AdditionalNotesSection
        additionalNotes={additionalNotes}
        setAdditionalNotes={setAdditionalNotes}
      />

      {/* Save and Send Buttons */}
      <View style={styles.saveButtonContainer}>
        <ButtonBigSize
          text="Save Draft"
          buttonColor="white"
          onPress={() => {}}
        />
        <ButtonBigSize text="Send" buttonColor="white" onPress={() => {}} />
      </View>
    </ScrollView>
  );
}

function NapTimeSection({ napStartTime, napEndTime }: any) {
  return (
    <>
      <Text style={styles.sectionTitle}>Nap Time</Text>
      <View style={styles.timePickers}>
        <Text style={styles.subTitle}>From</Text>
        <View style={styles.timePickerRow}>
          {/* Start Time */}
          <TextInput style={styles.timePickerInput} value={napStartTime.hour} />
          <Text>:</Text>
          <TextInput
            style={styles.timePickerInput}
            value={napStartTime.minute}
          />
          <TextInput
            style={styles.timePickerInput}
            value={napStartTime.period}
          />
        </View>

        <Text style={styles.subTitle}>Until</Text>
        <View style={styles.timePickerRow}>
          {/* End Time */}
          <TextInput style={styles.timePickerInput} value={napEndTime.hour} />
          <Text>:</Text>
          <TextInput style={styles.timePickerInput} value={napEndTime.minute} />
          <TextInput style={styles.timePickerInput} value={napEndTime.period} />
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
