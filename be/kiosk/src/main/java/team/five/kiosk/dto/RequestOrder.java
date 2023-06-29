package team.five.kiosk.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import team.five.kiosk.domain.Order;
import team.five.kiosk.domain.OrderDetail;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
public class RequestOrder {
    private String payment;

    private int totalCost;

    private int inputCost;

    private List<RequestOrderProduct> orderProducts;

    @Builder
    public RequestOrder(String payment, int totalCost, int inputCost, List<RequestOrderProduct> orderProducts) {
        this.payment = payment;
        this.totalCost = totalCost;
        this.inputCost = inputCost;
        this.orderProducts = orderProducts;
    }

    public Order toOrder(final Long paymentId) {
        return Order.builder()
                .paymentId(paymentId)
                .totalCost(totalCost)
                .inputCost(inputCost)
                .build();
    }

    public List<OrderDetail> toOrderDetails(final Long orderId) {
        return orderProducts.stream()
                .map(orderProduct -> toOrderDetails(orderId, orderProduct))
                .collect(Collectors.toList());
    }

    private static OrderDetail toOrderDetails(final Long orderId, final RequestOrderProduct orderProduct) {
        return OrderDetail.builder()
                .orderId(orderId)
                .productId(orderProduct.getProductId())
                .size(orderProduct.getSize())
                .temperature(orderProduct.getTemperature())
                .count(orderProduct.getCount())
                .build();
    }
}
