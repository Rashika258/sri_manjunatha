-- DropForeignKey
ALTER TABLE `invoiceitem` DROP FOREIGN KEY `invoiceitem_invoice_id_fkey`;

-- AddForeignKey
ALTER TABLE `invoiceitem` ADD CONSTRAINT `invoiceitem_invoice_id_fkey` FOREIGN KEY (`invoice_id`) REFERENCES `invoice`(`invoice_id`) ON DELETE CASCADE ON UPDATE CASCADE;
