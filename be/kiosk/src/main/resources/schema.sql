CREATE TABLE category (
      id bigint unsigned NOT NULL AUTO_INCREMENT,
      name varchar(20) NOT NULL COMMENT '카테고리명',
      PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE product (
    id bigint unsigned NOT NULL AUTO_INCREMENT,
    category_id bigint unsigned NOT NULL,
    name varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '상품 이름',
    price int NOT NULL COMMENT '상품 가격',
    image_url varchar(512) NOT NULL COMMENT '상품 이미지',
    PRIMARY KEY (id),
    KEY `category_id` (`category_id`),
    CONSTRAINT `category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;