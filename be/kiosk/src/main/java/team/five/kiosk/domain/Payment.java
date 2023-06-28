package team.five.kiosk.domain;

import lombok.Getter;

@Getter
public class Payment {
    private static final int PAY_TIME_OUT = 7;
    private Long id;
    private String name;

    public Payment(final Long id, final String name) {
        this.id = id;
        this.name = name;
    }

    public boolean isCash() {
        return "cash".equals(name);
    }

    public void pay(final int loadingTime) {
        if (isCash()) {
            return;
        }
        if (loadingTime > PAY_TIME_OUT) {
            throw new IllegalArgumentException("결제에 실패했습니다.");
        }

    }
}
