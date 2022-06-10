import { MigrationInterface, QueryRunner } from 'typeorm';

export class seeds1654596530290 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO privileges (id,name) VALUES
            ('bf1f96ed-3c92-4538-8e0a-50ce09d7bb6c', 'POST_CREATE'),
            ('bf4235f3-80fc-4b46-b911-c97a746522b5', 'POST_UPDATE'),
            ('5c51a16a-6879-41f6-be91-8718a157ee29', 'POST_DELETE'),
            ('b10761e9-38b9-4e6a-ae2c-beb839a4d74a', 'USER_DELETE'),
            ('98aec650-c179-43d2-9843-16e6c15624a8', 'USER_UPDATE'),
            ('26b1650a-d726-474f-abeb-f0fdc0bb0e24', 'USER_UPDATE_SELF'),
            ('0232b475-7cdf-4029-be5f-2f6615d32f1b', 'USER_GET'),
            ('0b89d44b-25ba-4cc2-8b98-eea507ca7a0f', 'ROLE_CREATE'),
            ('6f21bf1d-60cd-4392-a297-81c2d52c3f76', 'ROLE_UPDATE'),
            ('69941621-7f1f-4044-951a-fa41ac065349', 'ROLE_DELETE'),
            ('375c4719-7c28-4c47-b352-f484efd9cbc1', 'ROLE_GET'),
            ('eaa93925-7ffb-4664-9e3f-8dad6fdca664', 'PRIVILEGE_CREATE'),
            ('892d1cd8-d112-4118-aa27-ab19f92afe6d', 'PRIVILEGE_UPDATE'),
            ('9c709f97-a554-4521-b73b-54627680aba0', 'PRIVILEGE_DELETE'),
            ('44794cbc-3acd-4083-9476-dd0adfdba446', 'PRIVILEGE_GET');
          `,
    );
    await queryRunner.query(
      `INSERT INTO roles (id,name,description) VALUES ('61397ecf-e3c3-40fd-ba2d-edc4ded3813c','ADMIN', 'Admin'), ('5021553f-4e4f-4635-90ef-c0400fa893d4','USER', 'User')`,
    );

    await queryRunner.query(
      `INSERT INTO users (id,email,password,"roleId") VALUES ('605cc418-5292-4066-a24e-8d434828e355','admin@mail.com','$2b$10$oVBfyRRZwycqkUhsqL2RUujrb2thFQ/mdiAqULMBjOfpDQDrPIOG.','61397ecf-e3c3-40fd-ba2d-edc4ded3813c')`,
    );
    // ADMIN privileges
    await queryRunner.query(
      `INSERT INTO "roles_privileges_privileges"("rolesId", "privilegesId") VALUES
          ('61397ecf-e3c3-40fd-ba2d-edc4ded3813c',	'bf1f96ed-3c92-4538-8e0a-50ce09d7bb6c'),
          ('61397ecf-e3c3-40fd-ba2d-edc4ded3813c',	'bf4235f3-80fc-4b46-b911-c97a746522b5'),
          ('61397ecf-e3c3-40fd-ba2d-edc4ded3813c',	'5c51a16a-6879-41f6-be91-8718a157ee29'),
          ('61397ecf-e3c3-40fd-ba2d-edc4ded3813c',	'b10761e9-38b9-4e6a-ae2c-beb839a4d74a'),
          ('61397ecf-e3c3-40fd-ba2d-edc4ded3813c',	'98aec650-c179-43d2-9843-16e6c15624a8'),
          ('61397ecf-e3c3-40fd-ba2d-edc4ded3813c',	'26b1650a-d726-474f-abeb-f0fdc0bb0e24'),
          ('61397ecf-e3c3-40fd-ba2d-edc4ded3813c',	'0232b475-7cdf-4029-be5f-2f6615d32f1b'),
          ('61397ecf-e3c3-40fd-ba2d-edc4ded3813c',	'0b89d44b-25ba-4cc2-8b98-eea507ca7a0f'),
          ('61397ecf-e3c3-40fd-ba2d-edc4ded3813c',	'6f21bf1d-60cd-4392-a297-81c2d52c3f76'),
          ('61397ecf-e3c3-40fd-ba2d-edc4ded3813c',	'69941621-7f1f-4044-951a-fa41ac065349'),
          ('61397ecf-e3c3-40fd-ba2d-edc4ded3813c',	'375c4719-7c28-4c47-b352-f484efd9cbc1'),
          ('61397ecf-e3c3-40fd-ba2d-edc4ded3813c',	'eaa93925-7ffb-4664-9e3f-8dad6fdca664'),
          ('61397ecf-e3c3-40fd-ba2d-edc4ded3813c',	'892d1cd8-d112-4118-aa27-ab19f92afe6d'),
          ('61397ecf-e3c3-40fd-ba2d-edc4ded3813c',	'9c709f97-a554-4521-b73b-54627680aba0'),
          ('61397ecf-e3c3-40fd-ba2d-edc4ded3813c',	'44794cbc-3acd-4083-9476-dd0adfdba446');
          `,
    );
    // USER privileges
    await queryRunner.query(
      `INSERT INTO "roles_privileges_privileges"("rolesId", "privilegesId") VALUES
      ('5021553f-4e4f-4635-90ef-c0400fa893d4',	'bf1f96ed-3c92-4538-8e0a-50ce09d7bb6c'),
      ('5021553f-4e4f-4635-90ef-c0400fa893d4',	'26b1650a-d726-474f-abeb-f0fdc0bb0e24');
          `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return;
  }
}
