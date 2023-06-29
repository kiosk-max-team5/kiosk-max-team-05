package team.five.kiosk.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import team.five.kiosk.domain.Payment;
import team.five.kiosk.global.payment.PaymentMethod;
import team.five.kiosk.repository.PaymentRepository;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PaymentServiceTest {
    @InjectMocks
    PaymentService paymentService;

    @Mock
    PaymentRepository paymentRepository;
    @Mock
    PaymentMethod paymentMethod;
    @Test
    public void test() throws Exception {
        final Payment cardPayment = new Payment(1L, "card");
        //given
        doNothing().when(paymentMethod).process();

        //when
        paymentService.pay(cardPayment);

        //then
    }
}