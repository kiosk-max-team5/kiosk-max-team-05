package team.five.kiosk.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.five.kiosk.domain.Order;
import team.five.kiosk.domain.OrderDetail;
import team.five.kiosk.dto.RequestOrder;
import team.five.kiosk.repository.OrderRepository;

import java.util.List;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class OrderService {

    private final OrderRepository orderRepository;


    @Transactional
    public Long order(RequestOrder requestOrder) {
        // 결제 수단(payment) 조회
        Long paymentId = orderRepository.findPaymentIdByPaymentName(requestOrder)
                .orElseThrow(() -> new IllegalArgumentException("지원하지 않는 결제 방법입니다."));

        // order 저장
        Order order = requestOrder.toOrder(paymentId);
        if ("card".equals(requestOrder.getPayment())) {

            order.payCard();
        }
        Long orderId = orderRepository.createOrder(order);

        // orderDetail 저장
        List<OrderDetail> orderDetails = requestOrder.toOrderDetails(orderId);
        orderRepository.createOrderDetail(orderDetails);

        return orderId;
    }
}
