import { StyleSheet } from "react-native";

export const dogDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF4EE",
    padding: 20,
  },
  backButton: {
    marginBottom: 10,
  },
  infoCard: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  dogImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  dogInfo: {
    flex: 1,
  },
  dogName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3C3C3C",
  },
  dogDetails: {
    color: "#6B6B6B",
    fontSize: 14,
  },
  medicineRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  medicineText: {
    color: "#6B6B6B",
    fontSize: 14,
  },
  medicineInfo: {
    color: "#3C3C3C",
    fontSize: 14,
  },
  seeMoreContainer: {
    marginTop: 10,
    alignItems: "flex-end",
    paddingHorizontal: 10,
  },
  seeMoreText: {
    color: "brown",
    fontWeight: "bold",
    marginTop: 10,
  },
  divider: {
    borderBottomColor: "#DADADA",
    borderBottomWidth: 1,
    marginVertical: 20,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3C3C3C",
    marginBottom: 10,
  },
  reportContainer: {
    backgroundColor: "#FAF4EE",
  },
  reportOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  reportOptionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3C3C3C",
  },
  reportOptionSubText: {
    color: "#6B6B6B",
    fontSize: 14,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#5C4033", // 짙은 갈색
  },
  description: {
    fontSize: 14,
    color: "#6B6B6B",
  },
});
