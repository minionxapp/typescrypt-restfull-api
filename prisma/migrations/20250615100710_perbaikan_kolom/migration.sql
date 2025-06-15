/*
  Warnings:

  - Made the column `name` on table `dev_tablexs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `desc` on table `dev_tablexs` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `dev_tablexs` MODIFY `name` VARCHAR(100) NOT NULL,
    MODIFY `desc` VARCHAR(100) NOT NULL;
