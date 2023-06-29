package team.five.kiosk.global.common;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum StatusCode {

    // -- [payment] -- //
    // 4xx error code
    NOT_FOUND_PAYMENT(HttpStatus.NOT_FOUND, "PE0001", "결제 수단이 존재하지 않습니다."),
    PAYMENT_TIME_OUT(HttpStatus.REQUEST_TIMEOUT, "PE0002", "결제 시간 초과"),

    // -- [Product] -- //
    // 4xx error code
    WRONG_CATEGORY_NAME(HttpStatus.NOT_FOUND, "CE0001", "카테고리 명이 잘못되었습니다.");


    private final HttpStatus httpStatus;
    private final String customStatus;
    private final String message;
}
