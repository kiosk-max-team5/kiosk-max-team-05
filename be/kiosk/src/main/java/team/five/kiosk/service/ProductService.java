package team.five.kiosk.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.five.kiosk.domain.Product;
import team.five.kiosk.dto.ResponseProduct;
import team.five.kiosk.global.common.StatusCode;
import team.five.kiosk.global.exception.CustomException;
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
            throw new CustomException(StatusCode.WRONG_CATEGORY_NAME);
        }
    }
}