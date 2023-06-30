package team.five.kiosk.dao;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class ReceiptDAO {
    private Long orderNumber;
    private List<OrderProductDAO> orderProducts;
    private String payment;
    private int inputCost;
    private int totalCost;
}
