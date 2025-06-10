/*
  Warnings:

  - Added the required column `table_name` to the `dev_tables_coloumn` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `dev_tables_coloumn` ADD COLUMN `table_name` VARCHAR(100) NOT NULL;
