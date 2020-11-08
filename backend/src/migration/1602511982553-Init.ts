import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1602511982553 implements MigrationInterface {
    name = 'Init1602511982553'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `official_position` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(32) NOT NULL DEFAULT '', `positionvalue` int NOT NULL, `start_date` date NULL, `end_date` date NULL, `delflg` tinyint NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `official_rank` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(32) NOT NULL DEFAULT '', `rankvalue` int NOT NULL, `start_date` date NULL, `end_date` date NULL, `delflg` tinyint NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `org_layer` (`id` int NOT NULL AUTO_INCREMENT, `layerno` int NOT NULL, `name` varchar(32) NOT NULL, `start_date` date NULL, `end_date` date NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `org_section` (`id` int NOT NULL AUTO_INCREMENT, `layer_id` int NOT NULL, `order` int NOT NULL, `name` varchar(32) NOT NULL, `path` varchar(255) NOT NULL, `start_date` date NULL, `end_date` date NULL, `parentId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `personal_info` (`id` int NOT NULL AUTO_INCREMENT, `user_cd` char(8) NOT NULL, `key` varchar(32) NOT NULL, `value` varchar(255) NOT NULL, `delflg` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user` (`code` char(8) NOT NULL, `lastName` varchar(32) NOT NULL, `firstName` varchar(32) NOT NULL, `delflg` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (`code`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user_organization` (`user_cd` char(8) NOT NULL, `section_id` int NOT NULL, `position_id` int NOT NULL, `priority` int NOT NULL DEFAULT 0, `start_date` date NULL, `end_date` date NULL, PRIMARY KEY (`user_cd`, `section_id`, `position_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user_position` (`user_cd` char(8) NOT NULL, `position_id` int NOT NULL, `section_id` int NOT NULL, `start_date` date NULL, `end_date` date NULL, `delflg` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (`user_cd`, `position_id`, `section_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user_rank` (`user_cd` char(8) NOT NULL, `rank_id` int NOT NULL, `start_date` date NULL, `end_date` date NULL, `delflg` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (`user_cd`, `rank_id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `org_section` ADD CONSTRAINT `FK_61e7f7b8fd9ef413dcec3551f09` FOREIGN KEY (`parentId`) REFERENCES `org_section`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("CREATE VIEW `view_user_organization` AS SELECT `u`.`code` AS `user_cd`, `uo`.`priority` AS `priority`, `uo`.`start_date` AS `start_date`, `uo`.`end_date` AS `end_date`, `os`.`order` AS `order`, `os`.`path` AS `path`, `op`.`title` AS `title`, u.lastname AS `lastname`, u.firstname AS `firstname` FROM `user` `u` LEFT JOIN `user_organization` `uo` ON `u`.`code` = `uo`.`user_cd`  LEFT JOIN `org_section` `os` ON `uo`.`section_id` = `os`.`id`  LEFT JOIN `official_position` `op` ON `uo`.`position_id` = `op`.`id` WHERE `u`.`delflg` = 0 AND `uo`.`end_date` is NULL AND `os`.`end_date` is NULL");
        await queryRunner.query("INSERT INTO `people`.`typeorm_metadata`(`type`, `schema`, `name`, `value`) VALUES (?, ?, ?, ?)", ["VIEW","people","view_user_organization","SELECT `u`.`code` AS `user_cd`, `uo`.`priority` AS `priority`, `uo`.`start_date` AS `start_date`, `uo`.`end_date` AS `end_date`, `os`.`order` AS `order`, `os`.`path` AS `path`, `op`.`title` AS `title`, u.lastname AS `lastname`, u.firstname AS `firstname` FROM `user` `u` LEFT JOIN `user_organization` `uo` ON `u`.`code` = `uo`.`user_cd`  LEFT JOIN `org_section` `os` ON `uo`.`section_id` = `os`.`id`  LEFT JOIN `official_position` `op` ON `uo`.`position_id` = `op`.`id` WHERE `u`.`delflg` = 0 AND `uo`.`end_date` is NULL AND `os`.`end_date` is NULL"]);
        await queryRunner.query("CREATE VIEW `view_latest_personal_info` AS SELECT `pi1`.`id` AS `id`, `pi1`.`user_cd` AS `user_cd`, `pi1`.`key` AS `key`, `pi1`.`value` AS `value` FROM `personal_info` `pi1`, (SELECT `pi2`.`user_cd` AS `user_cd`, MAX(`pi2`.`id`) AS `max_id` FROM `personal_info` `pi2` WHERE `pi2`.`delflg` = 0 GROUP BY `pi2`.`user_cd`, `pi2`.`key`) `pi3` WHERE `pi1`.`user_cd` = pi3.user_cd AND `pi1`.`id` = pi3.max_id");
        await queryRunner.query("INSERT INTO `people`.`typeorm_metadata`(`type`, `schema`, `name`, `value`) VALUES (?, ?, ?, ?)", ["VIEW","people","view_latest_personal_info","SELECT `pi1`.`id` AS `id`, `pi1`.`user_cd` AS `user_cd`, `pi1`.`key` AS `key`, `pi1`.`value` AS `value` FROM `personal_info` `pi1`, (SELECT `pi2`.`user_cd` AS `user_cd`, MAX(`pi2`.`id`) AS `max_id` FROM `personal_info` `pi2` WHERE `pi2`.`delflg` = 0 GROUP BY `pi2`.`user_cd`, `pi2`.`key`) `pi3` WHERE `pi1`.`user_cd` = pi3.user_cd AND `pi1`.`id` = pi3.max_id"]);
        await queryRunner.query("CREATE VIEW `view_user_position` AS SELECT `u`.`code` AS `user_cd`, `up`.`start_date` AS `start_date`, `up`.`end_date` AS `end_date`, `op`.`title` AS `title`, `op`.`positionvalue` AS `positionvalue`, u.lastname AS `lastname`, u.firstname AS `firstname` FROM `user` `u` LEFT JOIN `user_position` `up` ON `u`.`code` = `up`.`user_cd`  LEFT JOIN `official_position` `op` ON `up`.`position_id` = `op`.`id` WHERE `u`.`delflg` = 0 AND `up`.`end_date` is NULL AND `op`.`end_date` is NULL AND `op`.`delflg` = 0");
        await queryRunner.query("INSERT INTO `people`.`typeorm_metadata`(`type`, `schema`, `name`, `value`) VALUES (?, ?, ?, ?)", ["VIEW","people","view_user_position","SELECT `u`.`code` AS `user_cd`, `up`.`start_date` AS `start_date`, `up`.`end_date` AS `end_date`, `op`.`title` AS `title`, `op`.`positionvalue` AS `positionvalue`, u.lastname AS `lastname`, u.firstname AS `firstname` FROM `user` `u` LEFT JOIN `user_position` `up` ON `u`.`code` = `up`.`user_cd`  LEFT JOIN `official_position` `op` ON `up`.`position_id` = `op`.`id` WHERE `u`.`delflg` = 0 AND `up`.`end_date` is NULL AND `op`.`end_date` is NULL AND `op`.`delflg` = 0"]);
        await queryRunner.query("CREATE VIEW `view_user_rank` AS SELECT `u`.`code` AS `user_cd`, `ur`.`start_date` AS `start_date`, `ur`.`end_date` AS `end_date`, `or`.`title` AS `title`, `or`.`rankvalue` AS `rankvalue`, u.lastname AS `lastname`, u.firstname AS `firstname` FROM `user` `u` LEFT JOIN `user_rank` `ur` ON `u`.`code` = `ur`.`user_cd`  LEFT JOIN `official_rank` `or` ON `ur`.`rank_id` = `or`.`id` WHERE `u`.`delflg` = 0 AND `ur`.`end_date` is NULL AND `or`.`end_date` is NULL AND `or`.`delflg` = 0");
        await queryRunner.query("INSERT INTO `people`.`typeorm_metadata`(`type`, `schema`, `name`, `value`) VALUES (?, ?, ?, ?)", ["VIEW","people","view_user_rank","SELECT `u`.`code` AS `user_cd`, `ur`.`start_date` AS `start_date`, `ur`.`end_date` AS `end_date`, `or`.`title` AS `title`, `or`.`rankvalue` AS `rankvalue`, u.lastname AS `lastname`, u.firstname AS `firstname` FROM `user` `u` LEFT JOIN `user_rank` `ur` ON `u`.`code` = `ur`.`user_cd`  LEFT JOIN `official_rank` `or` ON `ur`.`rank_id` = `or`.`id` WHERE `u`.`delflg` = 0 AND `ur`.`end_date` is NULL AND `or`.`end_date` is NULL AND `or`.`delflg` = 0"]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DELETE FROM `people`.`typeorm_metadata` WHERE `type` = 'VIEW' AND `schema` = ? AND `name` = ?", ["people","view_user_rank"]);
        await queryRunner.query("DROP VIEW `view_user_rank`");
        await queryRunner.query("DELETE FROM `people`.`typeorm_metadata` WHERE `type` = 'VIEW' AND `schema` = ? AND `name` = ?", ["people","view_user_position"]);
        await queryRunner.query("DROP VIEW `view_user_position`");
        await queryRunner.query("DELETE FROM `people`.`typeorm_metadata` WHERE `type` = 'VIEW' AND `schema` = ? AND `name` = ?", ["people","view_latest_personal_info"]);
        await queryRunner.query("DROP VIEW `view_latest_personal_info`");
        await queryRunner.query("DELETE FROM `people`.`typeorm_metadata` WHERE `type` = 'VIEW' AND `schema` = ? AND `name` = ?", ["people","view_user_organization"]);
        await queryRunner.query("DROP VIEW `view_user_organization`");
        await queryRunner.query("ALTER TABLE `org_section` DROP FOREIGN KEY `FK_61e7f7b8fd9ef413dcec3551f09`");
        await queryRunner.query("DROP TABLE `user_rank`");
        await queryRunner.query("DROP TABLE `user_position`");
        await queryRunner.query("DROP TABLE `user_organization`");
        await queryRunner.query("DROP TABLE `user`");
        await queryRunner.query("DROP TABLE `personal_info`");
        await queryRunner.query("DROP TABLE `org_section`");
        await queryRunner.query("DROP TABLE `org_layer`");
        await queryRunner.query("DROP TABLE `official_rank`");
        await queryRunner.query("DROP TABLE `official_position`");
    }

}
