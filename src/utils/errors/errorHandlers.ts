import { BaseError, ReservationError } from "./customErrors";

export const createErrorHandler =
    // 1. 첫 번째 함수: 에러 클래스를 받음
    (ErrorClass: typeof BaseError) =>
    // 2. 두 번째 함수: 실제 에러 핸들러
    (error: any, operation: string) => {
      // 3. 에러 로깅
      console.error(`Failed to ${operation}:`, error);
      // 4. 새로운 에러 객체를 throw
      throw new ErrorClass(`Failed to ${operation}`, error);
    };

export const handleReservationError = createErrorHandler(ReservationError);
