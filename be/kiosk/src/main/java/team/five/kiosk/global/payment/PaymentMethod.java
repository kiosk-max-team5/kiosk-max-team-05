package team.five.kiosk.global.payment;

import team.five.kiosk.domain.Payment;
import team.five.kiosk.global.common.StatusCode;
import team.five.kiosk.global.exception.CustomException;

import java.util.Arrays;

public enum PaymentMethod {
    CARD("card", new CardPaymentManager()),
    CASH("cash");

    private final String name;

    private PaymentManager paymentManager;

    PaymentMethod(String name, PaymentManager paymentManager) {
        this.name = name;
        this.paymentManager = paymentManager;
    }

    PaymentMethod(String name) {
        this.name = name;
    }

    public void process() {
        paymentManager.process();
    }

    public static PaymentMethod from(Payment payment) {
        String name = payment.getName().toLowerCase();

        return Arrays.stream(values())
                .filter(paymentMethod -> paymentMethod.name.equals(name))
                .findFirst()
                .orElseThrow(() -> new CustomException(StatusCode.NOT_FOUND_PAYMENT));
    }
}
