package team.five.kiosk.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import team.five.kiosk.dto.ResponseProduct;
import team.five.kiosk.global.ApiResponse;
import team.five.kiosk.service.ProductService;

import java.util.List;

@RequestMapping("/api/v1")
@RestController
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping("/products")
    public ResponseEntity<ApiResponse> getProducts(@RequestParam String category) {
        List<ResponseProduct> products = productService.getProducts(category);
        return ResponseEntity.ok(ApiResponse.success("200", products));
    }
}
