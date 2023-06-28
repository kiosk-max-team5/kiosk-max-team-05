package team.five.kiosk.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.five.kiosk.domain.Order;
import team.five.kiosk.domain.OrderDetail;
import team.five.kiosk.domain.Payment;
import team.five.kiosk.dto.RequestOrder;
import team.five.kiosk.repository.OrderRepository;

import java.util.List;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final PaymentService paymentService;

    @Transactional
    public Long order(RequestOrder requestOrder) {
        // 결제 수단(payment) 조회
        Payment payment = paymentService.findPayment(requestOrder.getPayment());

        // order 저장
        Order order = requestOrder.toOrder(payment.getId());
        paymentService.process(payment);

        //TODO: 메서드명 수정필요
        order.complete();

        Long orderId = orderRepository.createOrder(order);

        // orderDetail 저장
        List<OrderDetail> orderDetails = requestOrder.toOrderDetails(orderId);
        orderRepository.createOrderDetail(orderDetails);

        return orderId;
    }

}
