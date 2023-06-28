package team.five.kiosk.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class RequestOrder {
    private String payment;

    private int totalCost;

    private int inputCost;

    private List<RequestOrderProduct> orderProducts;
}
