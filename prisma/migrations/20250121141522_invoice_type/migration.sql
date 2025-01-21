/*
  Warnings:

  - You are about to alter the column `invoice_number` on the `invoice` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - A unique constraint covering the columns `[invoice_type,invoice_number]` on the table `invoice` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `invoice_type` to the `invoice` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `invoice_invoice_number_key` ON `invoice`;

-- AlterTable
ALTER TABLE `invoice` ADD COLUMN `invoice_type` ENUM('MONTHLY', 'DAILY') NOT NULL,
    MODIFY `invoice_number` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `invoice_invoice_type_invoice_number_key` ON `invoice`(`invoice_type`, `invoice_number`);
