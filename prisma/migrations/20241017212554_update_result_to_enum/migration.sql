/*
  Warnings:

  - You are about to alter the column `result` on the `Game` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `Game` MODIFY `result` ENUM('WHITE', 'BLACK', 'DRAW', 'IN_PROGRESS') NOT NULL DEFAULT 'IN_PROGRESS';
