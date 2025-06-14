/*
  Warnings:

  - You are about to drop the column `project_idname` on the `projects` table. All the data in the column will be lost.
  - Added the required column `name` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `project_id` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `projects` DROP COLUMN `project_idname`,
    ADD COLUMN `name` VARCHAR(100) NOT NULL,
    ADD COLUMN `project_id` INTEGER NOT NULL;
