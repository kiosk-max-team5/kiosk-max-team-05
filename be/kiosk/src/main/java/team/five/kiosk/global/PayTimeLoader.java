package team.five.kiosk.global;

public class PayTimeLoader {

    // 3~ 10 사이 랜덤한 숫자를 리턴한다.
     public static int load() {
        return (int) (Math.floor(Math.random() * 8) + 3);
    }
}
