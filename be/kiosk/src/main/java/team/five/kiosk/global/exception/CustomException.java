package team.five.kiosk.global.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import team.five.kiosk.global.common.StatusCode;

@Getter
@RequiredArgsConstructor
public class CustomException extends RuntimeException {

    private final StatusCode statusCode;

}
