/*
  Warnings:

  - You are about to drop the column `invoice_id` on the `invoiceitem` table. All the data in the column will be lost.
  - Added the required column `invoice_number` to the `invoiceitem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `invoiceitem` DROP FOREIGN KEY `invoiceItem_invoice_id_fkey`;

-- DropIndex
DROP INDEX `invoiceItem_invoice_id_fkey` ON `invoiceitem`;

-- AlterTable
ALTER TABLE `invoiceitem` DROP COLUMN `invoice_id`,
    ADD COLUMN `invoice_number` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE INDEX `invoiceItem_invoice_number_fkey` ON `invoiceitem`(`invoice_number`);

-- AddForeignKey
ALTER TABLE `invoiceitem` ADD CONSTRAINT `invoiceItem_invoice_number_fkey` FOREIGN KEY (`invoice_number`) REFERENCES `invoice`(`invoice_number`) ON DELETE RESTRICT ON UPDATE CASCADE;
