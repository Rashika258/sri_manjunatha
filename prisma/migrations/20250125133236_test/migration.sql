/*
  Warnings:

  - A unique constraint covering the columns `[item_id]` on the table `invoiceitem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `invoiceitem_item_id_key` ON `invoiceitem`(`item_id`);
