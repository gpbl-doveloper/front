import { StyleSheet } from "react-native";

export const writeNoteStyles = StyleSheet.create({
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
  },
  timePickerButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  timeText: {
    color: "#5C4033",
    fontSize: 16,
  },
  buttonContainer: {
    gap: 8,
    marginBottom: 36,
  },
});
