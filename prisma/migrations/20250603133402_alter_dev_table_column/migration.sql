/*
  Warnings:

  - You are about to drop the `dev_tables_coloumn` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `dev_tables_coloumn`;

-- CreateTable
CREATE TABLE `dev_tables_column` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `table_id` INTEGER NOT NULL,
    `table_name` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `desc` VARCHAR(255) NOT NULL,
    `type` VARCHAR(20) NOT NULL,
    `is_id` VARCHAR(2) NOT NULL,
    `is_null` VARCHAR(2) NOT NULL,
    `is_uniq` VARCHAR(2) NOT NULL,
    `default` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
