package team.five.kiosk.domain;

import lombok.Builder;
import lombok.Getter;

@Getter
public class OrderDetail {
    private Long id;

    private Long productId;

    private Long orderId;

    private String size;

    private String temperature;

    private int count;

    @Builder
    public OrderDetail(Long productId, Long orderId, String size, String temperature, int count) {
        this.productId = productId;
        this.orderId = orderId;
        this.size = size;
        this.temperature = temperature;
        this.count = count;
    }

}
