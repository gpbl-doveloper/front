import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Dog,
  DogFromBackend,
  useDogStore,
  useSelectedDogStore,
} from "@/src/store/dogStore";
import { useNavigation } from "expo-router";

interface DogItemProps {
  dog: DogFromBackend | Dog;
  children?: React.ReactNode;
}

export function DogItem({ dog, children }: DogItemProps) {
  const navigation = useNavigation();
  const { setSelectedDog } = useSelectedDogStore();

  const handleTouch = () => {
    setSelectedDog(dog);
    navigation.navigate("DogDetail");
  };

  return (
    <TouchableOpacity style={styles.dogItemContainer} onPress={handleTouch}>
      <DogImagePlaceholder dog={dog} />
      <View style={styles.dogInfo}>
        <Text style={styles.dogName}>{dog.name}</Text>
        {children}
      </View>
    </TouchableOpacity>
  );
}

// DogImagePlaceholder 컴포넌트
export function DogImagePlaceholder({ dog }: { dog: DogFromBackend | Dog }) {
  return (
    <View style={styles.dogImageContainer}>
      <View style={styles.dogImagePlaceholder}>
        {dog?.img ? (
          <Image
            source={{ uri: dog?.img }}
            style={{
              width: 100,
              height: 114,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            }}
          />
        ) : (
          <Ionicons name="image-outline" size={30} color="#A3C0F7" />
        )}
      </View>
    </View>
  );
}

export function DogStatusInfoList({
  diaryPhotoStatus,
  diaryNoteStatus,
}: {
  diaryPhotoStatus: number;
  diaryNoteStatus: number;
}) {
  return (
    <View style={styles.tasksStatusContainer}>
      <DogStatusInfo
        type="image"
        statusText={diaryPhotoStatus ? "Classified" : "Not started"}
      />
      <DogStatusInfo
        type="document"
        statusText={diaryNoteStatus ? "Documented" : "Not started"}
      />
    </View>
  );
}

interface DogStatusInfoProps {
  type: "image" | "document";
  statusText: string;
}

function DogStatusInfo({ type, statusText }: DogStatusInfoProps) {
  const iconName = type === "image" ? "image-outline" : "document-outline";

  return (
    <View style={styles.statusContainer}>
      <Ionicons name={iconName} size={14} color="#A3A3A3" />
      <Text style={styles.dogStatus}>{statusText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  dogItemContainer: {
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "white",
    marginBottom: 10,
    alignItems: "center",
    paddingRight: 16,
    height: 114,
  },
  dogImageContainer: {
    width: 100,
    height: 114,
    backgroundColor: "#E5EDFF",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  dogImagePlaceholder: {
    width: 40,
    height: 114,
    justifyContent: "center",
    alignItems: "center",
  },
  dogInfo: {
    flex: 1,
    paddingLeft: 18,
    gap: 12,
    justifyContent: "center",
  },
  dogName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  tasksStatusContainer: {
    flexDirection: "column",
    gap: 6,
    paddingHorizontal: 4,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dogStatus: {
    color: "#A3A3A3",
    fontSize: 16,
    marginLeft: 6,
  },
});
