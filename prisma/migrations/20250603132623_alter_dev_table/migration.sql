/*
  Warnings:

  - Added the required column `project_id` to the `dev_tables` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `dev_tables` ADD COLUMN `project_id` INTEGER NOT NULL;
