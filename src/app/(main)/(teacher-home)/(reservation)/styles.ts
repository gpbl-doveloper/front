import { StyleSheet } from "react-native";

export const reservationStyles = StyleSheet.create({
  listContent: {
    paddingBottom: 20,
  },
  dateButton: {
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },

  dateContainer: {
    borderRadius: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateText: {
    fontSize: 36,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    gap: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  ageBreed: {
    color: "#888",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    gap: 8,
  },
  label: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
    marginLeft: 4,
  },
  value: {
    fontSize: 16,
    color: "#666",
    marginLeft: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  noDataText: {
    fontSize: 20,
  },
});

export default reservationStyles;
