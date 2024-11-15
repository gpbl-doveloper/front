// app.config.js
import "dotenv/config";

export default ({ config }) => {
  return {
    ...config,
    extra: {
      apiKey: process.env.FIREBASE_API_KEY,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID,
      router: {
        exclude: ["**/_*.tsx", "**/inner/[**]"], // 제외할 경로 추가
      },
      apiUrl: process.env.REACT_APP_API_URL,
    },
  };
};
