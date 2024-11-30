import React from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { SelectableImage } from "./SelectableImage";
import * as MediaLibrary from "expo-media-library";

interface PhotoListProps {
    photos: MediaLibrary.Asset[];
    selectedPhotos: string[];
    toggleSelectPhoto: (id: string) => void;
  }

export function PhotoList({ photos, selectedPhotos, toggleSelectPhoto }: PhotoListProps) {
  return (
    <FlatList
      data={photos}
      keyExtractor={(item) => item.id}
      numColumns={3}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => toggleSelectPhoto(item.id)}>
          <SelectableImage
            uri={item.uri}
            isSelected={selectedPhotos.includes(item.id)}
          />
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  imageWrapper: {
    position: "relative",
  },
});
