package team.five.kiosk.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class RequestOrder {
    private String payment;

    private int totalPrice;

    @JsonIgnore(value = false)
    private int inputPrice;

    private List<RequestOrderProduct> orderProducts;
}
