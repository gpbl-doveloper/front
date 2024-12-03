import { Text, TextInput } from "react-native";
import { writeNoteStyles } from "../styles/styles";

export function ActivitiesSection({
  activity,
  setActivity,
}: {
  activity: string;
  setActivity: (text: string) => void;
}) {
  return (
    <>
      <Text style={writeNoteStyles.sectionTitle}>Activities</Text>
      <TextInput
        style={writeNoteStyles.textArea}
        placeholder="Enter the activities of the day"
        value={activity}
        onChangeText={setActivity}
        multiline
      />
    </>
  );
}
