import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { useNavigation } from "expo-router";
import { Header2Buttons } from "@/src/components/Header";
import { PhotoList } from "./PhotoList";
import { getPhotos, requestPermission } from "./photoModel";
import { NavigationProp } from "@react-navigation/native";

type NavigationParams = {
  AddDog: {
    selectedPhotos: string[];
  };
};

export default function PhotoSelector() {
  const navigation = useNavigation<NavigationProp<NavigationParams>>();
  const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([]);
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [selectedPhotoUris, setSelectedPhotoUris] = useState<string[]>([]);

  const getTodayPhotos = async () => {
    requestPermission();
    const assets = await getPhotos();

    const assetInfoPromises = assets.assets.map(async (asset) => {
      const assetInfo = await MediaLibrary.getAssetInfoAsync(asset);
      return { ...asset, uri: assetInfo.localUri || asset.uri };
    });

    const updatedAssets = await Promise.all(assetInfoPromises);
    setPhotos(updatedAssets);
  };

  const toggleSelectPhoto = async (id: string) => {
    const asset = photos.find((photo) => photo.id === id);
    if (!asset) return;

    const assetInfo = await MediaLibrary.getAssetInfoAsync(asset);
    const uri = assetInfo.localUri || assetInfo.uri;

    setSelectedPhotos((prevSelected) => {
      if (prevSelected.includes(id)) {
        setSelectedPhotoUris((prev) =>
          prev.filter((photoUri) => photoUri !== uri)
        );
        return prevSelected.filter((photoId) => photoId !== id);
      } else {
        setSelectedPhotoUris((prev) => [...prev, uri]);
        return [...prevSelected, id];
      }
    });
  };

  const handleConfirm = () => {
    navigation.navigate("AddDog", {
      selectedPhotos: selectedPhotoUris, // URI 배열을 전달
    });
  };

  useEffect(() => {
    getTodayPhotos();
  }, []);

  return (
    <View style={styles.container}>
      <Header2Buttons
        onCancel={() => navigation.goBack()}
        onDone={handleConfirm}
      />

      {photos.length === 0 ? (
        <Text style={styles.errorText}>No photos found for today.</Text>
      ) : (
        <PhotoList
          photos={photos}
          selectedPhotos={selectedPhotos}
          toggleSelectPhoto={toggleSelectPhoto}
        />
      )}
      <View style={styles.buttonContainer}>
        <Text style={styles.selectCountText}>
          Selected ({selectedPhotos.length})
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  selectCountText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    padding: 8,
    justifyContent: "space-between",
  },
  errorText: {
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 20,
    margin: 10,
  },
});
