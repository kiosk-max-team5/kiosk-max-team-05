package team.five.kiosk.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import team.five.kiosk.dto.RequestOrder;
import team.five.kiosk.dto.ResponseReceipt;
import team.five.kiosk.global.common.ApiResponse;
import team.five.kiosk.global.common.StatusCode;
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
                .body(ApiResponse.success(StatusCode.ORDER_SUCCESS.getCustomStatus(), orderId));
    }

    @GetMapping("/orders/{id}")
    public ResponseEntity<ApiResponse<ResponseReceipt>> getReceipt(@PathVariable Long id) {
        ResponseReceipt receipt = orderService.findOrderById(id);

        return ResponseEntity.ok(ApiResponse.success(StatusCode.RECEIPT_FETCH_SUCCESS.getCustomStatus(), receipt));
    }
}
