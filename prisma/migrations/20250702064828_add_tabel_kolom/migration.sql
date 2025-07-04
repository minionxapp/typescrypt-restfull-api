-- CreateTable
CREATE TABLE `dev_table_koloms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `table_id` INTEGER NOT NULL,
    `table_name` VARCHAR(100) NOT NULL,
    `desc` VARCHAR(100) NOT NULL,
    `length` INTEGER NOT NULL,
    `is_id` VARCHAR(100) NOT NULL,
    `is_null` VARCHAR(100) NOT NULL,
    `is_uniq` VARCHAR(100) NOT NULL,
    `default` VARCHAR(100) NOT NULL,
    `type` VARCHAR(100) NOT NULL,
    `create_by` VARCHAR(20) NOT NULL,
    `update_by` VARCHAR(20) NULL,
    `create_at` DATETIME(3) NULL,
    `update_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
