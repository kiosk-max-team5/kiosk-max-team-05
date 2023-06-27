package team.five.kiosk.domain;

import java.time.LocalDateTime;

public class Order {
    private Long id;

    private Long payment_id;

    private int totalCost;

    private int inputCost;

    private LocalDateTime orderAt;
}
