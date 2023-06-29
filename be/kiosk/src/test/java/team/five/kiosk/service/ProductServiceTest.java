package team.five.kiosk.service;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.transaction.annotation.Transactional;
import team.five.kiosk.dto.ResponseProduct;
import team.five.kiosk.global.exception.CustomException;
import team.five.kiosk.repository.ProductRepository;

import java.util.List;

@SpringBootTest
@Transactional
class ProductServiceTest {

    @Autowired ProductService productService;
    @Autowired ProductRepository productRepository;
    @Autowired NamedParameterJdbcTemplate jdbcTemplate;


    @Test
    @DisplayName("카테고리명이 주어졌을 때 해당하는 메뉴의 개수가 옳게 나오는지 테스트")
    public void checkProductSizeByCategory() throws Exception {
        //given
        createSalesLog(2, 12);

        //when
        List<ResponseProduct> products = productService.getProducts("coffee");

        //then
        Assertions.assertThat(products.size()).isEqualTo(9);
    }

    @Test
    @DisplayName("주어진 카테고리와 db의 카테고리의 이름이 맞는지 확인하는 테스트")
    public void checkCategoryName() throws Exception {
        //given
        String wrongName = "coff";

        //when
        Assertions.assertThatThrownBy(() -> productService.getProducts(wrongName))
                .isInstanceOf(CustomException.class);
    }

    private void createSalesLog(final int productId, final int count) {
        String sql = "insert into sales_log (product_id, count) values(:productId, :count)";
        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("productId", productId);
        params.addValue("count", count);
        jdbcTemplate.update(sql, params);
    }
}