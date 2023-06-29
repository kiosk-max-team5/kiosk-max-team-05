package team.five.kiosk.service;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.transaction.annotation.Transactional;
import team.five.kiosk.IntegrationTestConfig;
import team.five.kiosk.dto.ResponseProduct;
import team.five.kiosk.global.exception.CustomException;

import java.util.List;

import static org.assertj.core.api.Assertions.*;

@Transactional
class ProductServiceTest extends IntegrationTestConfig {

    @Autowired
    private ProductService productService;

    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;

    @Test
    @DisplayName("커피의 개수는 5개보다 많다")
    public void checkProductSizeByCategory() throws Exception {
        //when
        List<ResponseProduct> coffeeProducts = productService.getProducts("coffee");

        //then
        assertThat(coffeeProducts.size()).isGreaterThan(5);
    }

    @Test
    @DisplayName("잘못된 카테고리로 조회를 하면 예외가 발생한다.")
    public void checkCategoryName() throws Exception {
        //given
        String wrongName = "coff";

        //when
        assertThatThrownBy(() -> productService.getProducts(wrongName))
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