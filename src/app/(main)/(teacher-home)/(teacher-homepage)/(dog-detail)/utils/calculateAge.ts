export const calculateAge = (bod: string): number => {
  const birthDate = new Date(bod); // bod를 Date 객체로 변환
  const today = new Date(); // 현재 날짜

  let age = today.getFullYear() - birthDate.getFullYear(); // 연도 차이 계산
  const isBeforeBirthday =
    today.getMonth() < birthDate.getMonth() || // 현재 월이 생일 월보다 이전인지 확인
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() < birthDate.getDate()); // 같은 월이면 생일이 지났는지 확인

  if (isBeforeBirthday) {
    age--; // 생일이 아직 오지 않았다면 나이에서 1 빼기
  }

  return age;
};
