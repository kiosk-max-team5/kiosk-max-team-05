package team.five.kiosk.repository;

import org.springframework.jdbc.core.namedparam.*;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;
import team.five.kiosk.dao.OrderProductDAO;
import team.five.kiosk.dao.ReceiptDAO;
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

    public List<OrderProductDAO> findProductNameAndCountByOrderId(Long id) {
        String sql = " select p.name, od.count " +
                " from `order` o " +
                " join order_detail od on o.id = od.order_id " +
                " join product p on od.product_id = p.id " +
                " where o.id = :id";

        MapSqlParameterSource param = new MapSqlParameterSource("id", id);
        return jdbcTemplate.query(sql, param, (rs, rowNum) -> new OrderProductDAO(
                rs.getString("name"),
                rs.getInt("count")));
    }

    public ReceiptDAO findOrderByOrderId(Long id, List<OrderProductDAO> orderProductDAOS) {
        String sql = " SELECT ( " +
                "           SELECT " +
                "               seq_no " +
                "           FROM ( " +
                "                    SELECT " +
                "                        o.id as order_id, " +
                "                        ROW_NUMBER() OVER (ORDER BY o.order_at) AS seq_no " +
                "                    FROM `order` o " +
                "                    WHERE DATE(o.order_at) = CURDATE() " +
                "                ) AS temp " +
                "           WHERE order_id = :id " +
                "       ) AS seq_no, p.name, o2.input_cost, o2.total_cost " +
                " from `order` o2 " +
                "         join payment p on o2.payment_id = p.id " +
                " where o2.id = :id";

        MapSqlParameterSource param = new MapSqlParameterSource("id", id);
        return jdbcTemplate.queryForObject(sql, param, (rs, rowNum) -> new ReceiptDAO(
                rs.getLong("seq_no"),
                orderProductDAOS,
                rs.getString("name"),
                rs.getInt("input_cost"),
                rs.getInt("total_cost")
        ));
    }

    public void createSalesLog(final List<OrderDetail> orderDetails) {
        String sql = "insert into sales_log (product_id, count) " +
                " values(:productId, :count)";

        jdbcTemplate.batchUpdate(sql, SqlParameterSourceUtils.createBatch(orderDetails));
    }
}
