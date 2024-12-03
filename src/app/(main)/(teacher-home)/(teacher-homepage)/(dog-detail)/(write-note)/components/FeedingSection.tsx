import { Text, View, TouchableOpacity } from "react-native";
import { writeNoteStyles } from "../styles/styles";

export function FeedingSection({
  feedingTime,
  setFeedingTime,
  feedingAmount,
  setFeedingAmount,
  }: any) {
    return (
      <>
        <Text style={writeNoteStyles.sectionTitle}>Feeding</Text>
        <Text style={writeNoteStyles.subTitle}>Time</Text>
        <View style={writeNoteStyles.timeButtons}>
          {[1, 2, 3, 0].map((time) => (
            <TouchableOpacity
              key={time}
              style={[
                writeNoteStyles.timeButton,
                feedingTime === time && writeNoteStyles.activeButton,
              ]}
              onPress={() => setFeedingTime(time)}
            >
              <Text
                style={
                  feedingTime === time
                    ? writeNoteStyles.activeButtonText
                    : writeNoteStyles.buttonText
                }
              >
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={writeNoteStyles.subTitle}>How much</Text>
        <View style={writeNoteStyles.amountButtons}>
          {["All", "Some", "Nothing"].map((amount) => (
            <TouchableOpacity
              key={amount}
              style={[
                writeNoteStyles.timeButton,
                feedingAmount === amount && writeNoteStyles.activeButton,
              ]}
              onPress={() => setFeedingAmount(amount)}
            >
              <Text
                style={
                  feedingAmount === amount
                    ? writeNoteStyles.activeButtonText
                    : writeNoteStyles.buttonText
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
  