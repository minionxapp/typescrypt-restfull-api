-- AlterTable
ALTER TABLE `dev_tables` ADD COLUMN `create_at` DATETIME(3) NULL,
    ADD COLUMN `create_by` VARCHAR(20) NOT NULL DEFAULT 'admin',
    ADD COLUMN `update_at` DATETIME(3) NULL,
    ADD COLUMN `update_by` VARCHAR(20) NULL;
