package team.five.kiosk.repository;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import team.five.kiosk.domain.Payment;

import javax.sql.DataSource;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Stream;

@Repository
public class PaymentRepository {

    private final NamedParameterJdbcTemplate jdbcTemplate;

    public PaymentRepository(final DataSource dataSource) {
        this.jdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
    }

    public Optional<Payment> findByName(final String name) {
        String sql = "SELECT * from payment p where p.name = :name";
        try (Stream<Payment> result = jdbcTemplate.queryForStream(sql, Map.of("name", name), toRowMapper())) {
            return result.findFirst();
        }
    }

    private static RowMapper<Payment> toRowMapper() {
        return (rs, rowNum) ->
                new Payment(
                        rs.getLong("id"),
                        rs.getString("name")
                );
    }


}

