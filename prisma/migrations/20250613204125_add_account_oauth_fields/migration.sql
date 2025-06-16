/*
  Warnings:

  - You are about to drop the column `accessToken` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `idToken` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `tokenType` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Account` DROP COLUMN `accessToken`,
    DROP COLUMN `expiresAt`,
    DROP COLUMN `idToken`,
    DROP COLUMN `tokenType`,
    ADD COLUMN `access_token` VARCHAR(191) NULL,
    ADD COLUMN `expires_at` INTEGER NULL,
    ADD COLUMN `id_token` VARCHAR(191) NULL,
    ADD COLUMN `token_type` VARCHAR(191) NULL;
