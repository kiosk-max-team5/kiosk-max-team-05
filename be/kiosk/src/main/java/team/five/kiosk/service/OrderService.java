package team.five.kiosk.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.five.kiosk.dto.RequestOrder;
import team.five.kiosk.repository.OrderRepository;

import java.util.Optional;

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
        // orderProducts 저장

        return 1L;
    }
}
