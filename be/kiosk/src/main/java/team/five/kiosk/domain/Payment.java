package team.five.kiosk.domain;

import lombok.Getter;

@Getter
public class Payment {
    private Long id;
    private String name;

    public Payment(final Long id, final String name) {
        this.id = id;
        this.name = name;
    }
}
