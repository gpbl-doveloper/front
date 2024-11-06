import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const data = [
  {
    id: "1",
    name: "Chloe",
    status: "Pending",
    age: "2 years old",
    breed: "Retriever",
    medicine: "Peniciline",
    time: "3pm",
    owner: "Kellan Nam",
    phone: "(657) 412 4677",
    email: "Happy@gmail.com",
    image: "https://example.com/dog-image.jpg",
  },
  {
    id: "2",
    name: "Buddy",
    status: "Accepted",
    age: "3 years old",
    breed: "Bulldog",
    medicine: "Vaccine",
    time: "4pm",
    owner: "Jane Doe",
    phone: "(555) 123 4567",
    email: "jane@gmail.com",
    image: "https://example.com/dog-image.jpg",
  },
  {
    id: "3",
    name: "Max",
    status: "Declined",
    age: "1 year old",
    breed: "Poodle",
    medicine: "Antibiotics",
    time: "2pm",
    owner: "John Smith",
    phone: "(555) 765 4321",
    email: "john@gmail.com",
    image: "https://example.com/dog-image.jpg",
  },
];

// AppointmentCard 컴포넌트
function AppointmentCard({ item }: { item: any }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image source={{ uri: item.image }} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.ageBreed}>
            {item.age}, {item.breed}
          </Text>
        </View>
        <Ionicons name="alert-circle" size={20} color="black" />
      </View>

      <View style={styles.infoRow}>
        <Ionicons name="medkit" size={20} color="#FF6B6B" />
        <Text style={styles.label}> Medicine</Text>
        <Text style={styles.value}>
          {item.medicine} ( at {item.time})
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Ionicons name="person" size={20} color="black" />
        <Text style={styles.label}> Owner’s name</Text>
        <Text style={styles.value}>{item.owner}</Text>
      </View>

      <View style={styles.infoRow}>
        <Ionicons name="call" size={20} color="black" />
        <Text style={styles.label}> Phone number</Text>
        <Text style={styles.value}>{item.phone}</Text>
      </View>

      <View style={styles.infoRow}>
        <Ionicons name="mail" size={20} color="black" />
        <Text style={styles.label}> Email</Text>
        <Text style={styles.value}>{item.email}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.declineButton}>
          <Text style={styles.declineButtonText}>Decline</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.acceptButton}>
          <Text style={styles.acceptButtonText}>Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// StatusTabs 컴포넌트
function StatusTabs({
  selectedStatus,
  onSelectStatus,
}: {
  selectedStatus: string;
  onSelectStatus: (status: string) => void;
}) {
  return (
    <View style={styles.tabContainer}>
      {["Pending", "Accepted", "Declined"].map((status) => (
        <TouchableOpacity
          key={status}
          onPress={() => onSelectStatus(status)}
          style={[styles.tab, selectedStatus === status && styles.activeTab]}
        >
          <Text
            style={[
              styles.tabText,
              selectedStatus === status && styles.activeTabText,
            ]}
          >
            {status}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// ReservationPage 컴포넌트
function ReservationPage() {
  const [selectedStatus, setSelectedStatus] = useState("Pending");

  const filteredData = data.filter((item) => item.status === selectedStatus);

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>Sep.13</Text>
      <StatusTabs selectedStatus={selectedStatus} onSelectStatus={setSelectedStatus} />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AppointmentCard item={item} />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  dateText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginRight: 10,
    backgroundColor: "#F0F0F0",
  },
  activeTab: {
    backgroundColor: "black",
  },
  tabText: {
    fontSize: 14,
    color: "#A3A3A3",
  },
  activeTabText: {
    color: "white",
  },
  listContent: {
    paddingBottom: 20,
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
  },
  label: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
    marginLeft: 5,
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
  declineButton: {
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  declineButtonText: {
    color: "#333",
    fontWeight: "bold",
  },
  acceptButton: {
    backgroundColor: "#333",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  acceptButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default ReservationPage;
