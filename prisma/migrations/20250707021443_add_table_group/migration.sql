-- CreateTable
CREATE TABLE `groups` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `desc` VARCHAR(250) NULL,
    `pic` VARCHAR(250) NULL,
    `status` VARCHAR(3) NOT NULL,
    `create_by` VARCHAR(20) NOT NULL,
    `update_by` VARCHAR(20) NULL,
    `create_at` DATETIME(3) NULL,
    `update_at` DATETIME(3) NULL,

    UNIQUE INDEX `groups_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
