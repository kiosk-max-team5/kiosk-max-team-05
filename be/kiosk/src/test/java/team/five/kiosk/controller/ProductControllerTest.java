package team.five.kiosk.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import team.five.kiosk.dto.ResponseProduct;
import team.five.kiosk.service.ProductService;

import java.util.List;

import static org.mockito.BDDMockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest
class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductService productService;

    @Test
    public void getProductsTest() throws Exception {
        //given
        final List<ResponseProduct> responseProducts = List.of(
                ResponseProduct.builder().id(1L).name("아메리카노").price(4000).imageUrl("url1").build(),
                ResponseProduct.builder().id(2L).name("카페라떼").price(4500).imageUrl("url2").build(),
                ResponseProduct.builder().id(3L).name("바닐라라떼").price(4500).imageUrl("url3").build()
        );

        given(productService.getProducts(anyString())).willReturn(responseProducts);

        //when
        final ResultActions result = mockMvc
                .perform(get("/api/v1/products").queryParam("category", "coffee"))
                .andExpect(status().isOk())
                .andDo(print());

        //then
        result.andExpect(jsonPath("status").isString());
        result.andExpect(jsonPath("status").value(200));
        result.andExpect(jsonPath("message[0].id").value(1L));
        result.andExpect(jsonPath("message[1].id").value(2L));
    }
}









