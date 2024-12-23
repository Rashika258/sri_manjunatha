/*
  Warnings:

  - Added the required column `product_category_id` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ecommerce_orders` DROP FOREIGN KEY `ecommerce_orders_ibfk_1`;

-- DropForeignKey
ALTER TABLE `invoices` DROP FOREIGN KEY `invoices_ibfk_1`;

-- AlterTable
ALTER TABLE `products` ADD COLUMN `product_category_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `product_categories` (
    `category_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_product_category_id_fkey` FOREIGN KEY (`product_category_id`) REFERENCES `product_categories`(`category_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
