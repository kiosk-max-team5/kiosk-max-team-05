package team.five.kiosk.dto;

import lombok.Builder;
import lombok.Getter;
import team.five.kiosk.dao.OrderProductDAO;

import java.util.List;

@Getter
@Builder
public class ResponseOrderProduct {
    private String productName;
    private int count;

    public static ResponseOrderProduct from(OrderProductDAO orderProductDAO) {
        return ResponseOrderProduct.builder()
                .productName(orderProductDAO.getProductName())
                .count(orderProductDAO.getCount())
                .build();
    }
}
