package team.five.kiosk.dto;

import lombok.Builder;
import lombok.Getter;
import team.five.kiosk.dao.OrderProductDAO;
import team.five.kiosk.dao.ReceiptDAO;

import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
public class ResponseReceipt {
    private Long orderNumber;
    private List<ResponseOrderProduct> orderProducts;
    private String payment;
    private int inputCost;
    private int totalCost;

    public static ResponseReceipt from(ReceiptDAO receiptDAO) {
        return ResponseReceipt.builder()
                .orderNumber(receiptDAO.getOrderNumber())
                .orderProducts(toResponseDTO(receiptDAO.getOrderProducts()))
                .payment(receiptDAO.getPayment())
                .inputCost(receiptDAO.getInputCost())
                .totalCost(receiptDAO.getTotalCost())
                .build();
    }

    private static List<ResponseOrderProduct> toResponseDTO(List<OrderProductDAO> orderProducts) {
        List<ResponseOrderProduct> responseOrderProducts = new ArrayList<>();
        for (OrderProductDAO orderProduct : orderProducts) {
            responseOrderProducts.add(ResponseOrderProduct.from(orderProduct));
        }
        return responseOrderProducts;
    }
}
