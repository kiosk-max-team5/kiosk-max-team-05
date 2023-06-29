package team.five.kiosk.global.payment;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class CardPaymentManager implements PaymentManager {
    private static final Logger logger = LoggerFactory.getLogger(CardPaymentManager.class);
    private static final int MIN_DELAY_TIME = 3;
    private static final int MAX_DELAY_TIME = 7;
    private static final int MAX_RANDOM_TIME = 8;

    @Override
    public void process() {
        final int delayedTime = waitPaymentLoading();

        if (delayedTime > MAX_DELAY_TIME) {
            throw new IllegalArgumentException("결제 시간 초과");
        }
    }

    private int waitPaymentLoading() {
        final int randomDelayTime = MIN_DELAY_TIME + (int) Math.floor(Math.random() * MAX_RANDOM_TIME);

        try {
            Thread.sleep(randomDelayTime, 1000);
        } catch (InterruptedException e) {
            logger.info("결제 지연 시간 초과: " + randomDelayTime);
        }

        return randomDelayTime;
    }
}
