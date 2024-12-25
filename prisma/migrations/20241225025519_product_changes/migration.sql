-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_product_category_id_fkey`;

-- AlterTable
ALTER TABLE `products` MODIFY `adinath_price` DECIMAL(10, 2) NULL,
    MODIFY `monthly_bill_price` DECIMAL(10, 2) NULL,
    MODIFY `product_category_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_product_category_id_fkey` FOREIGN KEY (`product_category_id`) REFERENCES `product_categories`(`category_id`) ON DELETE SET NULL ON UPDATE CASCADE;
