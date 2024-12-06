function isSameDay(createdAt: string) {
  // 오늘 날짜와 createdAt을 Date 객체로 변환
  const createdDate = new Date(createdAt);
  const today = new Date();

  // 연, 월, 일 비교
  return (
    createdDate.getFullYear() === today.getFullYear() &&
    createdDate.getMonth() === today.getMonth() &&
    createdDate.getDate() === today.getDate()
  );
}

export default isSameDay;
