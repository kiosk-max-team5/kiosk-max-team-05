package team.five.kiosk.controller;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.ResultActions;
import team.five.kiosk.ControllerTestConfig;
import team.five.kiosk.dto.ResponseProduct;

import java.util.List;

import static org.mockito.BDDMockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class ProductControllerTest extends ControllerTestConfig {

    @DisplayName("상품 리스트가 정상적으로 반환된다.")
    @Test
    public void getProductsTest() throws Exception {
        //given
        List<ResponseProduct> responseProducts = List.of(
                createResponseProduct(1L),
                createResponseProduct(2L),
                createResponseProduct(3L)
        );

        given(productService.getProducts(anyString())).willReturn(responseProducts);

        //when
        var result = mockMvc
                .perform(get("/api/v1/products").queryParam("category", anyString()))
                .andExpect(status().isOk())
                .andDo(print());

        //then
        result.andExpectAll(
                jsonPath("$.status").value(200),
                jsonPath("$.message[0].id").value(1L),
                jsonPath("$.message[1].id").value(2L),
                jsonPath("$.message[2].id").value(3L)
//                jsonPath("$.message").value(toJson(responseProducts))
        );

    }

    private static ResponseProduct createResponseProduct(Long id) {
        return ResponseProduct.builder()
                .id(id)
                .name("아메리카노")
                .price(4000)
                .imageUrl("url")
                .build();
    }
}