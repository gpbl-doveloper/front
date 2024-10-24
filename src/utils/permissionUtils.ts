import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";

export const requestMediaLibraryPermission = async (): Promise<boolean> => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library is required!");
      return false;
    }
    return true;
  };
  