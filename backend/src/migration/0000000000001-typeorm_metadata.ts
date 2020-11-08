import {MigrationInterface, QueryRunner} from "typeorm";

export class Typeorm_metadata0000000000001 implements MigrationInterface {
    name = 'Typeorm_metadata0000000000001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `typeorm_metadata` (`type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL, `database` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL, `schema` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL, `table` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL, `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL, `value` text COLLATE utf8mb4_unicode_ci DEFAULT NULL) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `typeorm_metadata`");
    }

}
