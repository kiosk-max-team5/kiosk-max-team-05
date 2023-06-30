package team.five.kiosk.global.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import team.five.kiosk.global.common.ApiResponse;
import team.five.kiosk.global.common.StatusCode;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<Object> handleCustomException(CustomException ex) {
        StatusCode statusCode = ex.getStatusCode();
        logger.error(statusCode.getCustomStatus() + " "+statusCode.getMessage());
        return ResponseEntity.status(statusCode.getHttpStatus())
                .body(ApiResponse.fail(statusCode.getCustomStatus(), statusCode.getMessage()));
    }
}
