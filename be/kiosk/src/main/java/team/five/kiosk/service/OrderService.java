package team.five.kiosk.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.five.kiosk.dao.OrderProductDAO;
import team.five.kiosk.dao.ReceiptDAO;
import team.five.kiosk.domain.Order;
import team.five.kiosk.domain.OrderDetail;
import team.five.kiosk.domain.Payment;
import team.five.kiosk.dto.RequestOrder;
import team.five.kiosk.dto.ResponseOrderProduct;
import team.five.kiosk.dto.ResponseReceipt;
import team.five.kiosk.repository.OrderRepository;

import java.util.ArrayList;
import java.util.List;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final PaymentService paymentService;

    @Transactional
    public Long order(final RequestOrder requestOrder) {
        // 결제 수단(payment) 조회
        Payment payment = paymentService.findPayment(requestOrder.getPayment());
        Order order = requestOrder.toOrder(payment.getId());

        // 결제 처리
        if (paymentService.pay(payment)) {
            order.completedPayment();
        }

        // 주문 저장
        Long orderId = orderRepository.createOrder(order);

        // 주문 상세 저장
        List<OrderDetail> orderDetails = requestOrder.toOrderDetails(orderId);
        orderRepository.createAllOrderDetail(orderDetails);

        return orderId;
    }

    public ResponseReceipt findOrderById(Long id) {
        List<OrderProductDAO> orderProductDAOS = orderRepository.findProductNameAndCountByOrderId(id);

        ReceiptDAO receiptDAO = orderRepository.findOrderByOrderId(id, orderProductDAOS);
        return ResponseReceipt.from(receiptDAO);
    }
}
