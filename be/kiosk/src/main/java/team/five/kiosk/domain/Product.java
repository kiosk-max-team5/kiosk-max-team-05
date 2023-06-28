package team.five.kiosk.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Product {

    private Long id;
    private Long categoryId;
    private String name;
    private int price;
    private String imageUrl;

    public Product(final Long categoryId, final String name, final int price, final String imageUrl) {
        this.categoryId = categoryId;
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
    }

}
