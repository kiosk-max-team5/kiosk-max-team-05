package team.five.kiosk.controller;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import team.five.kiosk.ControllerTestConfig;
import team.five.kiosk.dto.RequestOrder;
import team.five.kiosk.dto.RequestOrderProduct;

import java.util.List;
import java.util.Map;

import static org.mockito.BDDMockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class OrderControllerTest extends ControllerTestConfig {

    @DisplayName("주문이 생성되면 주문 id가 반환된다.")
    @Test
    public void createOrder() throws Exception {
        //given
        var requestOrderProducts = List.of(
                createRequestOrderProduct(1L, 2, "큰거", "차가운것"),
                createRequestOrderProduct(1L, 4, "큰거", "뜨거운것"));

        given(orderService.order(any(RequestOrder.class))).willReturn(1L);

        var content = Map.of(
                "payment", "card",
                "totalCost", 10000,
                "orderProducts", requestOrderProducts
        );

        //when
        var result = mockMvc.perform(post("/api/v1/orders")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(toJson(content)))
                .andExpect(status().isCreated());

        //then
        result.andExpectAll(
                jsonPath("$.status").value("201"),
                jsonPath("$.message").value(1L)
        );
    }

    private static RequestOrderProduct createRequestOrderProduct(Long productId, int count, String size, String temperature) {
        return RequestOrderProduct.builder()
                .productId(productId)
                .count(count)
                .size(size)
                .temperature(temperature)
                .build();
    }
}