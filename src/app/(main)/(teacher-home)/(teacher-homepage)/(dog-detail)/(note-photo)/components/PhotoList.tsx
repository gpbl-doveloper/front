import React from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { SelectableImage } from "@/src/components/photoSelector/SelectableImage";

interface PhotoListProps {
  photos: MediaLibrary.Asset[] | any[];
  selectedPhotos: string[];
  toggleSelectPhoto: (id: string) => void;
}

export function PhotoList({
  photos,
  selectedPhotos,
  toggleSelectPhoto,
}: PhotoListProps) {
  return (
    <FlatList
      data={photos}
      keyExtractor={(item) => item.id}
      numColumns={3}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => toggleSelectPhoto(item.id)}>
          <SelectableImage
            uri={item?.fileURL}
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
