/*
  Warnings:

  - You are about to alter the column `desc` on the `projects` table. The data in that column could be lost. The data in that column will be cast from `VarChar(256)` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE `projects` MODIFY `desc` VARCHAR(100) NOT NULL,
    MODIFY `create_at` DATETIME(3) NULL,
    MODIFY `update_at` DATETIME(3) NULL;
