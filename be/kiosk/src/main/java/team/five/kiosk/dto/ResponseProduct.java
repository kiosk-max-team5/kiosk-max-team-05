package team.five.kiosk.dto;

import lombok.Builder;
import lombok.Getter;
import team.five.kiosk.domain.Product;

@Getter
@Builder
public class ResponseProduct {
    private Long id;
    private String name;
    private int price;
    private String imageUrl;

    public static ResponseProduct from(Product product) {
        return ResponseProduct.builder()
                .id(product.getId())
                .name(product.getName())  
                .price(product.getPrice())
                .imageUrl(product.getImageUrl())
                .build();
    }
}
