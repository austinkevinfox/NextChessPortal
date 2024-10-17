/*
  Warnings:

  - You are about to alter the column `result` on the `Game` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Game` MODIFY `result` VARCHAR(191) NOT NULL DEFAULT 'in_progress';
