package team.five.kiosk.repository;

import org.springframework.jdbc.core.namedparam.*;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;
import team.five.kiosk.domain.Order;
import team.five.kiosk.domain.OrderDetail;
import team.five.kiosk.dto.RequestOrder;

import javax.sql.DataSource;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Stream;

@Repository
public class OrderRepository {

    private final NamedParameterJdbcTemplate jdbcTemplate;

    public OrderRepository(final DataSource dataSource) {
        this.jdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
    }
    public Optional<Long> findPaymentIdByPaymentName(final RequestOrder requestOrder) {
        String sql = "select id from payment where name = :name";

        try (Stream<Long> result = jdbcTemplate.queryForStream(sql, Map.of("name", requestOrder.getPayment()), (rs, rowNum) -> rs.getLong("id"))) {
            return result.findFirst();
        }
    }

    public Long createOrder(final Order order) {
        String sql = "insert into `order` (payment_id, input_cost, total_cost)" +
                " values (:paymentId, :inputCost, :totalCost)";

        final SqlParameterSource param = new BeanPropertySqlParameterSource(order);

        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(sql, param, keyHolder);
        return keyHolder.getKey().longValue();
    }

    public void createAllOrderDetail(final List<OrderDetail> orderDetails) {
        String sql = "insert into order_detail (product_id, order_id, size, temperature, count) " +
                " values(:productId, :orderId, :size, :temperature, :count)";

        jdbcTemplate.batchUpdate(sql, SqlParameterSourceUtils.createBatch(orderDetails));
    }
}
