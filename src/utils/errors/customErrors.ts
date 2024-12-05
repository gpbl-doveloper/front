export class BaseError extends Error {
  // 1. 생성자
  constructor(
    message: string, // 에러 메시지
    public originalError?: any // 원본 에러 (옵션)
  ) {
    // 2. 부모 클래스(Error) 생성자 호출
    super(message);

    // 3. 에러 이름을 클래스 이름으로 설정
    this.name = this.constructor.name;
  }
}

export class ReservationError extends BaseError {
  constructor(message: string, originalError?: any) {
    super(message, originalError);
  }
}
