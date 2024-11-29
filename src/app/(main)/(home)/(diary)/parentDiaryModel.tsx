import {
  DiaryRequestParams,
  getParentDiary,
} from "../../../../apis/apiDiaries/get";

export const getDiaryfromAPI = async ({
  dogId,
  date,
  idToken,
}: DiaryRequestParams) => {
  try {
    const result = await getParentDiary({
      dogId: dogId,
      date: date,
      idToken: idToken,
    });
    console.log("getDiaryfromAPI result : ", result);

    return result;
  } catch (error) {
    console.error("getDiaryfromAPI error : ", error);
    throw error;
  }
};

// 아래처럼 정리하면 더 좋음 - 다만 이러면 지금처럼 diaryNote가 null이 오면 안됨
// // 다이어리 데이터 인터페이스 정의
// export interface DiaryNote {
//   activities: string[];
//   napStart: string;
//   napEnd: string;
//   feedingTime: string;
//   feedingAmt: number;
//   note: string;
// }

// export interface DiaryResponse {
//   data: {
//     diaryNote: DiaryNote;
//   };
//   message: string;
//   status: number;
// }

// export const getDiaryfromAPI = async ({
//   dogId,
//   date,
//   idToken,
// }: DiaryRequestParams): Promise<DiaryResponse> => {
//   try {
//     const result = await getParentDiary({
//       dogId,
//       date,
//       idToken,
//     });

//     // 데이터 유효성 검사
//     if (!result?.data?.diaryNote) {
//       throw new Error('다이어리 데이터가 올바르지 않습니다.');
//     }

//     // 필요한 경우 데이터 변환 로직 추가
//     const transformedData: DiaryResponse = {
//       data: {
//         diaryNote: {
//           ...result.data.diaryNote,
//           // 필요한 경우 데이터 변환
//           feedingAmt: Number(result.data.diaryNote.feedingAmt),
//         }
//       },
//       message: result.message,
//       status: result.status
//     };

//     return transformedData;
//   } catch (error) {
//     console.error("getDiaryfromAPI error : ", error);
//     throw error;
//   }
// };
