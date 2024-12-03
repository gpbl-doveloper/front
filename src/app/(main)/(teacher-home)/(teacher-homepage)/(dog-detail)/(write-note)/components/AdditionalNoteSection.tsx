import { Text, TextInput } from "react-native";
import { writeNoteStyles } from "../styles/styles";

export function AdditionalNotesSection({
  additionalNotes,
  setAdditionalNotes,
}: {
  additionalNotes: string;
  setAdditionalNotes: (text: string) => void;
}) {
  return (
    <>
      <Text style={writeNoteStyles.sectionTitle}>Additional Notes</Text>
      <TextInput
        style={writeNoteStyles.textArea}
        placeholder="Enter additional notes"
        value={additionalNotes}
        onChangeText={setAdditionalNotes}
        multiline
      />
    </>
  );
}
