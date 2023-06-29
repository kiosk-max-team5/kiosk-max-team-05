package team.five.kiosk.global.payment;

import team.five.kiosk.domain.Payment;

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
                .orElseThrow(() -> new IllegalArgumentException("지원하지 않는 결제 수단"));
    }
}
