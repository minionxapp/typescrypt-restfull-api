/*
  Warnings:

  - You are about to drop the column `username` on the `projects` table. All the data in the column will be lost.
  - Added the required column `create_by` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `projects` DROP COLUMN `username`,
    ADD COLUMN `create_at` DATETIME(3) NULL,
    ADD COLUMN `create_by` VARCHAR(20) NOT NULL,
    ADD COLUMN `update_at` DATETIME(3) NULL,
    ADD COLUMN `update_by` VARCHAR(20) NULL;
