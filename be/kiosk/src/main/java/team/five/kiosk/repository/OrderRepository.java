package team.five.kiosk.repository;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import team.five.kiosk.dto.RequestOrder;

import javax.sql.DataSource;
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
}
