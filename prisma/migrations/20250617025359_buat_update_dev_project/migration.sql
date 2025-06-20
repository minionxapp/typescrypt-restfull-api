/*
  Warnings:

  - You are about to alter the column `desc` on the `dev_projects` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - Added the required column `create_by` to the `dev_projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `dev_projects` ADD COLUMN `create_at` DATETIME(3) NULL,
    ADD COLUMN `create_by` VARCHAR(20) NOT NULL,
    ADD COLUMN `update_at` DATETIME(3) NULL,
    ADD COLUMN `update_by` VARCHAR(20) NULL,
    MODIFY `desc` VARCHAR(100) NOT NULL;
