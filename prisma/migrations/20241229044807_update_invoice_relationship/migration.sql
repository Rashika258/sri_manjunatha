/*
  Warnings:

  - You are about to drop the column `invoice_number` on the `invoiceitem` table. All the data in the column will be lost.
  - Added the required column `invoice_id` to the `invoiceitem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `invoiceitem` DROP FOREIGN KEY `invoiceItem_invoice_number_fkey`;

-- DropIndex
DROP INDEX `invoiceItem_invoice_number_fkey` ON `invoiceitem`;

-- AlterTable
ALTER TABLE `invoiceitem` DROP COLUMN `invoice_number`,
    ADD COLUMN `invoice_id` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `invoiceitem_invoice_id_idx` ON `invoiceitem`(`invoice_id`);

-- AddForeignKey
ALTER TABLE `invoiceitem` ADD CONSTRAINT `invoiceitem_invoice_id_fkey` FOREIGN KEY (`invoice_id`) REFERENCES `invoice`(`invoice_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
