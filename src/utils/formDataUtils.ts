import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";

export const createDiaryFormData = async (
  content: string,
  fileIds?: string[]
): Promise<FormData> => {
  const formData = new FormData();
  formData.append("content", content);

  if (fileIds && fileIds.length > 0) {
    await addFilesToFormData(fileIds, formData);
  }

  return formData;
};

export const createAuthFormData = async (
  token: string,
  username: string
): Promise<FormData> => {
  const formData = new FormData();
  formData.append("token", token);
  formData.append("username", username);

  return formData;
};

// 파일을 FormData에 추가하는 함수
export const addFilesToFormData = async (
  fileIds: string[],
  formData: FormData
) => {
  await Promise.all(
    fileIds.map(async (assetId, index) => {
      const asset = await MediaLibrary.getAssetInfoAsync(assetId);
      const fileUri = asset.localUri || asset.uri;

      if (fileUri) {
        const fileInfo = await FileSystem.getInfoAsync(fileUri);
        if (fileInfo.exists) {
          const fileData = {
            uri: fileUri,
            type: asset.mediaType === "photo" ? "image/jpeg" : "image/png",
            name: asset.filename || `file-${index}.jpg`,
          };
          formData.append("files", fileData);
        }
      }
    })
  );
};
