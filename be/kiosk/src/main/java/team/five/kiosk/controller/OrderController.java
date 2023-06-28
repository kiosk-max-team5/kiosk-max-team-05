package team.five.kiosk.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team.five.kiosk.dto.RequestOrder;
import team.five.kiosk.global.ApiResponse;
import team.five.kiosk.service.OrderService;

@RequiredArgsConstructor
@RequestMapping("/api/v1")
@RestController
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/orders")
    public ResponseEntity<ApiResponse<Long>> order(@RequestBody RequestOrder requestOrder) {
        final Long orderId = orderService.order(requestOrder);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("201", orderId));
    }
}
