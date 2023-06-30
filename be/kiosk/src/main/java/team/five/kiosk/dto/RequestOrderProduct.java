package team.five.kiosk.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class RequestOrderProduct {
    private Long productId;
    private int count;
    private String size;
    private String temperature;

    @Builder
    public RequestOrderProduct(Long productId, int count, String size, String temperature) {
        this.productId = productId;
        this.count = count;
        this.size = size;
        this.temperature = temperature;
    }
}
