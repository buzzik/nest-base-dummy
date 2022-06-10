import { MigrationInterface, QueryRunner } from 'typeorm';

export class initTables1654861942370 implements MigrationInterface {
  name = 'initTables1654861942370';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "privileges" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_13f3ff98ae4d5565ec5ed6036cd" UNIQUE ("id"), CONSTRAINT "UQ_913e0b87d35069ac7bd7982d889" UNIQUE ("name"), CONSTRAINT "PK_13f3ff98ae4d5565ec5ed6036cd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, CONSTRAINT "UQ_c1433d71a4838793a49dcad46ab" UNIQUE ("id"), CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "roleId" uuid, CONSTRAINT "UQ_a3ffb1c0c8416b9fc6f907b7433" UNIQUE ("id"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "banned-users" ("id" SERIAL NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "UQ_b316b545a8a4aa0406b4a8e2528" UNIQUE ("id"), CONSTRAINT "UQ_9cf8af69ca8cc66f53c399eec3b" UNIQUE ("userId"), CONSTRAINT "REL_9cf8af69ca8cc66f53c399eec3" UNIQUE ("userId"), CONSTRAINT "PK_b316b545a8a4aa0406b4a8e2528" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "roles_privileges_privileges" ("rolesId" uuid NOT NULL, "privilegesId" uuid NOT NULL, CONSTRAINT "PK_e4116f68d9cd27b9254e5ff63a0" PRIMARY KEY ("rolesId", "privilegesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7537972735a4ed934221a0a198" ON "roles_privileges_privileges" ("rolesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_af30e6e46d0ffb3bf735f9566b" ON "roles_privileges_privileges" ("privilegesId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "banned-users" ADD CONSTRAINT "FK_9cf8af69ca8cc66f53c399eec3b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles_privileges_privileges" ADD CONSTRAINT "FK_7537972735a4ed934221a0a1988" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles_privileges_privileges" ADD CONSTRAINT "FK_af30e6e46d0ffb3bf735f9566bd" FOREIGN KEY ("privilegesId") REFERENCES "privileges"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "roles_privileges_privileges" DROP CONSTRAINT "FK_af30e6e46d0ffb3bf735f9566bd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles_privileges_privileges" DROP CONSTRAINT "FK_7537972735a4ed934221a0a1988"`,
    );
    await queryRunner.query(`ALTER TABLE "banned-users" DROP CONSTRAINT "FK_9cf8af69ca8cc66f53c399eec3b"`);
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_af30e6e46d0ffb3bf735f9566b"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_7537972735a4ed934221a0a198"`);
    await queryRunner.query(`DROP TABLE "roles_privileges_privileges"`);
    await queryRunner.query(`DROP TABLE "banned-users"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "roles"`);
    await queryRunner.query(`DROP TABLE "privileges"`);
  }
}
