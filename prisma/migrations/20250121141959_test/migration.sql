-- AlterTable
ALTER TABLE `invoice` MODIFY `invoice_type` ENUM('MONTHLY', 'DAILY') NOT NULL DEFAULT 'DAILY';
