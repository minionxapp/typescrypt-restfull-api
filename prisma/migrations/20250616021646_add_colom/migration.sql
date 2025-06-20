/*
  Warnings:

  - Added the required column `project_id` to the `dev_tablexs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `dev_tablexs` ADD COLUMN `project_id` INTEGER NOT NULL;
