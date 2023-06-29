package team.five.kiosk.dto;


import lombok.Getter;

@Getter
public class RequestOrderProduct {
    private Long productId;

    private int count;

    private String size;

    private String temperature;
}
