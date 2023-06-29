package team.five.kiosk.global.common;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum StatusCode {

    // -- [Order] -- //
    // 2xx code
    ORDER_SUCCESS(HttpStatus.CREATED, "O0001", "주문 성공"),
    RECEIPT_FETCH_SUCCESS(HttpStatus.OK, "O0002", "영수증 조회 성공"),

    // -- [Payment] -- //
    // 4xx code
    NOT_FOUND_PAYMENT(HttpStatus.NOT_FOUND, "PYE0001", "결제 수단이 존재하지 않습니다."),
    PAYMENT_TIME_OUT(HttpStatus.REQUEST_TIMEOUT, "PYE0002", "결제 시간 초과"),

    // -- [Product] -- //
    // 2xx code
    PRODUCT_LIST_FETCH_SUCCESS(HttpStatus.OK, "P0001", "상품 목록 조회"),

    // 4xx code
    WRONG_CATEGORY_NAME(HttpStatus.NOT_FOUND, "PE0001", "카테고리 명이 잘못되었습니다.");

    private final HttpStatus httpStatus;
    private final String customStatus;
    private final String message;
}
