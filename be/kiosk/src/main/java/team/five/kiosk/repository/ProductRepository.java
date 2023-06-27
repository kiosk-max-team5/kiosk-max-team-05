package team.five.kiosk.repository;

import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;
import team.five.kiosk.domain.Product;

import javax.sql.DataSource;
import java.util.List;

@Repository
public class ProductRepository {

    private final NamedParameterJdbcTemplate jdbcTemplate;

    public ProductRepository(final DataSource dataSource) {
        this.jdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
    }


    public List<Product> findProductsBy(final String category) {
        String sql = "select * " +
                "from product p, category c " +
                "where p.category_id = c.id " +
                "and c.name = :name";
        SqlParameterSource params = new MapSqlParameterSource("name", category);
        return jdbcTemplate.query(sql, params,
                (rs, rowNum) -> new Product(
                        rs.getLong("id"),
                        rs.getLong("category_id"),
                        rs.getString("name"),
                        rs.getInt("price"),
                        rs.getString("image_url")
                ));
    }
}
