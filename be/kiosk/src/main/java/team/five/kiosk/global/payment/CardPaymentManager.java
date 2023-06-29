package team.five.kiosk.global.payment;

public class CardPaymentManager implements PaymentManager {
    private static final int MIN_DELAY_TIME = 3;
    private static final int MAX_DELAY_TIME = 7;
    private static final int MAX_RANDOM_TIME = 8;

    @Override
    public void process() {
        final int delayedTime = generateRandomTimeDelay();

        if (delayedTime > MAX_DELAY_TIME) {
            throw new IllegalArgumentException("결제 시간 초과");
        }

        try {
            Thread.sleep(delayedTime, 1000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    private static int generateRandomTimeDelay() {
        return MIN_DELAY_TIME + (int) Math.floor(Math.random() * MAX_RANDOM_TIME);
    }
}
