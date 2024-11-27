import React from "react";
import { View, Image, StyleSheet } from "react-native";

interface SelectableImageProps {
  uri: string;
  isSelected: boolean;
}

export function SelectableImage({ uri, isSelected }: SelectableImageProps) {
  return (
    <View style={styles.imageWrapper}>
      <Image
        source={{ uri }}
        style={[styles.image, isSelected && styles.selectedImage]}
      />
      {isSelected && <View style={styles.overlay} />}
    </View>
  );
}

const styles = StyleSheet.create({
  imageWrapper: {
    position: "relative",
  },
  image: {
    width: 110,
    height: 110,
    margin: 5,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedImage: {
    borderColor: "pink",
    borderWidth: 4,
  },
  overlay: {
    position: "absolute",
    top: 5,
    left: 5,
    width: 110,
    height: 110,
    backgroundColor: "rgba(255, 192, 203, 0.5)",
  },
});
