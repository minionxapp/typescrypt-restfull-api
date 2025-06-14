/*
  Warnings:

  - You are about to drop the column `create_at` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `create_by` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `update_by` on the `projects` table. All the data in the column will be lost.
  - Added the required column `username` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `projects` DROP COLUMN `create_at`,
    DROP COLUMN `create_by`,
    DROP COLUMN `update_at`,
    DROP COLUMN `update_by`,
    ADD COLUMN `username` VARCHAR(100) NOT NULL;
