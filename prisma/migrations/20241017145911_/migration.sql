/*
  Warnings:

  - You are about to alter the column `result` on the `Game` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE `Game` MODIFY `result` VARCHAR(50) NOT NULL,
    MODIFY `url` VARCHAR(255) NULL;
