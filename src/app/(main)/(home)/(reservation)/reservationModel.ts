import { getParentReservation } from "@/src/apis/apiReservations/get";
import { Alert, Linking } from "react-native";

export const parentReservationAPI = async (idToken: string) => {
  const response = await getParentReservation(idToken);
  return response.data.reservations;
};

export const makePhoneCall = (phoneNumber: string) => {
  Alert.alert("Make a Call", `Would you like to call ${phoneNumber}?`, [
    {
      text: "Cancel",
      style: "cancel",
    },
    {
      text: "Call",
      onPress: () => {
        const url = `tel:${phoneNumber.replace(/[^0-9]/g, "")}`;
        Linking.canOpenURL(url)
          .then((supported) => {
            if (supported) {
              return Linking.openURL(url);
            }
            Alert.alert("Unable to make a call");
          })
          .catch((err) => console.error("Error making call:", err));
      },
    },
  ]);
};
