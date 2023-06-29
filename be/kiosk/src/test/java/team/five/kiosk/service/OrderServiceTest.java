package team.five.kiosk.service;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureWebMvc;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.transaction.annotation.Transactional;
import team.five.kiosk.IntegrationTestConfig;
import team.five.kiosk.domain.Payment;
import team.five.kiosk.dto.RequestOrder;
import team.five.kiosk.dto.RequestOrderProduct;

import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.BDDMockito.*;

@AutoConfigureWebMvc
@Transactional
class OrderServiceTest extends IntegrationTestConfig {
    @Autowired
    OrderService orderService;

    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;

    @MockBean
    private PaymentService paymentService;

    @DisplayName("카드 결제 후에 Order의 inputCost가 totalCost로 변경 된다.")
    @Test
    public void createOrder() throws Exception {
        //given
        final Payment payment = new Payment(1L, "card");
        final int totalCost = 10000;
        final RequestOrder requestOrder = RequestOrder.builder()
                .payment("card")
                .totalCost(totalCost)
                .orderProducts(List.of(createRequestOrderProduct()))
                .build();

        when(paymentService.findPayment(anyString())).thenReturn(payment);
        when(paymentService.pay(any(Payment.class))).thenReturn(true);

        //when
        final Long orderId = orderService.order(requestOrder);

        //then
        assertThat(getInputCostBy(orderId)).isEqualTo(totalCost);
    }

    private int getInputCostBy(Long orderId) {
        String sql = "select o.input_cost from `order` o where o.id = :orderId";

        return jdbcTemplate.queryForObject(
                sql,
                Map.of("orderId", orderId),
                (rs, rowNum) -> rs.getInt("input_cost")
        );
    }

    private static RequestOrderProduct createRequestOrderProduct() {
        return RequestOrderProduct.builder()
                .productId(1L)
                .count(2)
                .size("큰거")
                .temperature("차가운것")
                .build();
    }
}