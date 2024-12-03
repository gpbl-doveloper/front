export const convertToISO = ({
  hour,
  minute,
  period,
}: {
  hour: string;
  minute: string;
  period: string;
}): string => {
  const date = new Date();
  const isPM = period.toUpperCase() === "PM";
  const hour24 = isPM ? (parseInt(hour) % 12) + 12 : parseInt(hour) % 12;
  date.setHours(hour24, parseInt(minute), 0, 0);
  return date.toISOString();
};

export function isoToTimeObject(isoString: string) {
  if (!isoString) return { hour: "10", minute: "00", period: "AM" };

  const date = new Date(isoString);
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const period = hours >= 12 ? "PM" : "AM";

  // 12시간제로 변환
  if (hours > 12) {
    hours -= 12;
  } else if (hours === 0) {
    hours = 12;
  }

  return {
    hour: hours.toString(),
    minute: minutes,
    period: period,
  };
}

export const getTimeAsDate = (time: {
  hour: string;
  minute: string;
  period: string;
}) => {
  const date = new Date();
  const hour = parseInt(time.hour);
  const minute = parseInt(time.minute);
  const isPM = time.period.toUpperCase() === "PM";

  date.setHours(isPM ? hour + 12 : hour);
  date.setMinutes(minute);
  return date;
};
