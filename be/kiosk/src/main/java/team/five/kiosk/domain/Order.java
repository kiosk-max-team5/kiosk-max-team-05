package team.five.kiosk.domain;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class Order {
    private Long id;

    private Long paymentId;

    private int totalCost;

    private int inputCost;

    private LocalDateTime orderAt;

    @Builder
    public Order(final Long paymentId, final int totalCost, final int inputCost) {
        this.paymentId = paymentId;
        this.totalCost = totalCost;
        this.inputCost = inputCost;
    }

    public void complete() {
        inputCost = totalCost;
    }
}
