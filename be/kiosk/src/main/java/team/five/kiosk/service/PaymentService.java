package team.five.kiosk.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import team.five.kiosk.domain.Payment;
import team.five.kiosk.global.common.StatusCode;
import team.five.kiosk.global.exception.CustomException;
import team.five.kiosk.service.payment.PaymentMethod;
import team.five.kiosk.repository.PaymentRepository;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;

    public Payment findPayment(String name) {
        return paymentRepository.findByName(name)
                .orElseThrow(() -> new CustomException(StatusCode.NOT_FOUND_PAYMENT));
    }

    public boolean pay(final Payment payment) {
        final PaymentMethod paymentMethod = PaymentMethod.from(payment);
        if (paymentMethod == PaymentMethod.CASH) {
            return false;
        }

        paymentMethod.process();

        return true;
    }
}
