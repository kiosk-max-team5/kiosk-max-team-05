package team.five.kiosk.dto;

import lombok.Getter;
import team.five.kiosk.domain.Order;
import team.five.kiosk.domain.OrderDetail;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class RequestOrder {
    private String payment;

    private int totalCost;

    private int inputCost;

    private List<RequestOrderProduct> orderProducts;

    public Order toOrder(final Long paymentId) {
        return Order.builder()
                .paymentId(paymentId)
                .totalCost(totalCost)
                .inputCost(inputCost)
                .build();
    }

    public List<OrderDetail> toOrderDetails(final Long orderId) {
        return orderProducts.stream().map(orderProduct -> getOrderDetail(orderId, orderProduct))
                .collect(Collectors.toList());
    }

    private static OrderDetail getOrderDetail(final Long orderId, final RequestOrderProduct orderProduct) {
        return OrderDetail.builder()
                .orderId(orderId)
                .productId(orderProduct.getProductId())
                .size(orderProduct.getSize())
                .temperature(orderProduct.getTemperature())
                .count(orderProduct.getCount())
                .build();
    }
}
