package team.five.kiosk.global;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class ApiResponse<T> {

    private final String status;
    private final T message;

    public static <T> ApiResponse<T> success(String status, T message) {
        return new ApiResponse<>(status, message);
    }
}
