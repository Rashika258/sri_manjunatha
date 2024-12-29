/*
  Warnings:

  - Added the required column `hsn` to the `invoiceitem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `invoice` MODIFY `customer_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `invoiceitem` ADD COLUMN `hsn` INTEGER NOT NULL;
