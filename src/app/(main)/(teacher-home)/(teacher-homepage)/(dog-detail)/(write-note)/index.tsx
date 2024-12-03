import { ButtonBigSize } from "@/src/components/Buttons";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { postNoteAPI, sendNoteAPI } from "./writeNoteModel";
import { useFirebaseAuth } from "@/src/store/userStore";
import { useSelectedDogStore } from "@/src/store/dogStore";
import { convertToISO, isoToTimeObject } from "./utils/timeUtils";
import { writeNoteStyles } from "./styles/styles";
import { ActivitiesSection } from "./components/ActivitiesSection";
import { FeedingSection } from "./components/FeedingSection";
import { NapTimeSection } from "./components/NapTimeSection";
import { AdditionalNotesSection } from "./components/AdditionalNoteSection";
import { useSingleDiaryStore } from "@/src/store/diaryStore";

export function NoteScreen() {
  const { diary, setDiary } = useSingleDiaryStore();

  const [activities, setActivities] = useState(diary?.activities || "");
  const [note, setNote] = useState(diary?.note || "");
  const [feedingTime, setFeedingTime] = useState<number>(
    diary?.feedingTime || 0
  );
  const [feedingAmt, setFeedingAmt] = useState(diary?.feedingAmt || "Nothing");
  const [napStart, setNapStart] = useState(
    diary?.napStart
      ? isoToTimeObject(diary.napStart)
      : {
          hour: "10",
          minute: "00",
          period: "AM",
        }
  );
  const [napEnd, setNapEnd] = useState(
    diary?.napEnd
      ? isoToTimeObject(diary.napEnd)
      : {
          hour: "10",
          minute: "00",
          period: "AM",
        }
  );
  const navigation = useNavigation();
  const { idToken } = useFirebaseAuth();
  const { selectedDog } = useSelectedDogStore();
  if (!selectedDog) {
    navigation.goBack();
    return null;
  }

  const handleSubmit = async () => {
    const diaryData = {
      activities,
      feedingTime,
      feedingAmt,
      napStart: convertToISO(napStart),
      napEnd: convertToISO(napEnd),
      note,
      dogId: selectedDog.id,
    };

    try {
      const result = await postNoteAPI({ diaryData, idToken });
      setDiary(result);
    } catch (error) {
      console.log("Failed to send note", error);
    }
  };

  const handleSend = async () => {
    Alert.alert("Send Note", "Are you sure you want to send this note?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Send",
        onPress: async () => {
          try {
            await sendNoteAPI({ idToken, diaryId: diary?.id });
            navigation.goBack();
          } catch (error) {
            console.log("Failed to send note", error);
          }
        },
      },
    ]);
  };

  return (
    <ScrollView style={writeNoteStyles.container}>
      {/* Header */}
      <TouchableOpacity
        style={writeNoteStyles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={writeNoteStyles.backText}>← Note</Text>
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
      {/* 먼저 Save -> 그 다음 Send */}
      <View style={writeNoteStyles.buttonContainer}>
        <View style={writeNoteStyles.saveButtonContainer}>
          <ButtonBigSize
            text="Save"
            buttonColor="white"
            onPress={handleSubmit}
          />
        </View>
        <View style={writeNoteStyles.saveButtonContainer}>
          <ButtonBigSize text="Send" buttonColor="brown" onPress={handleSend} />
        </View>
      </View>
    </ScrollView>
  );
}
