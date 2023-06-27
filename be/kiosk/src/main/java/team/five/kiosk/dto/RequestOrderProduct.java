package team.five.kiosk.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class RequestOrderProduct {
    private Long productId;

    private int count;

    private String size;

    private String temperature;
}
