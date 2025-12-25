-- AlterTable
ALTER TABLE `notes` MODIFY COLUMN `title` TEXT NOT NULL,
                     MODIFY COLUMN `content` TEXT NULL,
                     MODIFY COLUMN `rejectionReason` TEXT NULL;

