package team.five.kiosk.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.five.kiosk.domain.Product;
import team.five.kiosk.dto.ResponseProduct;
import team.five.kiosk.repository.ProductRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<ResponseProduct> getProducts(final String category) {
        checkCategory(category);

        List<Product> products = productRepository.findProductsBy(category);

        return products.stream()
                .map(ResponseProduct::from)
                .collect(Collectors.toList());
    }

    private void checkCategory(final String category) {
        if (!productRepository.isExistCategory(category)) {
            throw new IllegalStateException("카테고리 명이 잘못되었습니다.");
        }
    }
}