/*
  Warnings:

  - You are about to alter the column `create_at` on the `projects` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime`.
  - You are about to alter the column `update_at` on the `projects` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `projects` MODIFY `create_at` DATETIME NULL,
    MODIFY `update_at` DATETIME NULL;
