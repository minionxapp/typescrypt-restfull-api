/*
  Warnings:

  - You are about to drop the `dev_project` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `dev_project`;

-- CreateTable
CREATE TABLE `dev_projects` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `desc` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
