package team.five.kiosk.domain;

import lombok.Getter;

@Getter
public class OrderDetail {
    private Long id;

    private Long productId;

    private Long orderId;

    private String size;

    private String temperature;

    private int count;

    public OrderDetail(Long productId, String size, String temperature, int count) {
        this.productId = productId;
        this.size = size;
        this.temperature = temperature;
        this.count = count;
    }
}
