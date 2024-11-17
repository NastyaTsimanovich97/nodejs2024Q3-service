import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1731845950651 implements MigrationInterface {
    name = 'Init1731845950651'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "fav" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_5b599fa3e2db35e989237949af5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "track" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "artist_id" uuid, "album_id" uuid, "duration" integer NOT NULL, CONSTRAINT "PK_0631b9bcf521f8fab3a15f2c37e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "artist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "album" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artist_id" uuid, CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "login" character varying NOT NULL, "password" character varying NOT NULL, "version" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fav_artists_artist" ("favId" uuid NOT NULL, "artistId" uuid NOT NULL, CONSTRAINT "PK_4ebf342a63b1d678ae107498c87" PRIMARY KEY ("favId", "artistId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_13d85914666a52b91d5dd104f2" ON "fav_artists_artist" ("favId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c65613788f9ce94f6e84b324c7" ON "fav_artists_artist" ("artistId") `);
        await queryRunner.query(`CREATE TABLE "fav_albums_album" ("favId" uuid NOT NULL, "albumId" uuid NOT NULL, CONSTRAINT "PK_06cbe0fd2ad99fa98ce8aa7754e" PRIMARY KEY ("favId", "albumId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_aa6b8034edabc391c1e43640c4" ON "fav_albums_album" ("favId") `);
        await queryRunner.query(`CREATE INDEX "IDX_28db650411c86ed74aee16922c" ON "fav_albums_album" ("albumId") `);
        await queryRunner.query(`CREATE TABLE "fav_tracks_track" ("favId" uuid NOT NULL, "trackId" uuid NOT NULL, CONSTRAINT "PK_2a0c3fa8c780eaaaa2466fc80f6" PRIMARY KEY ("favId", "trackId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a6d76ae9c216a9e617c7ea5151" ON "fav_tracks_track" ("favId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6db20f07f4d8785b509f1b67e9" ON "fav_tracks_track" ("trackId") `);
        await queryRunner.query(`ALTER TABLE "track" ADD CONSTRAINT "FK_ee355f43e4481bb45755c50e984" FOREIGN KEY ("artist_id") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "track" ADD CONSTRAINT "FK_5902805b5cdc8b4fcf983f7df52" FOREIGN KEY ("album_id") REFERENCES "album"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "album" ADD CONSTRAINT "FK_ecbc0c0cfffc519f7f2407b0465" FOREIGN KEY ("artist_id") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fav_artists_artist" ADD CONSTRAINT "FK_13d85914666a52b91d5dd104f23" FOREIGN KEY ("favId") REFERENCES "fav"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "fav_artists_artist" ADD CONSTRAINT "FK_c65613788f9ce94f6e84b324c72" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fav_albums_album" ADD CONSTRAINT "FK_aa6b8034edabc391c1e43640c4a" FOREIGN KEY ("favId") REFERENCES "fav"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "fav_albums_album" ADD CONSTRAINT "FK_28db650411c86ed74aee16922c0" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fav_tracks_track" ADD CONSTRAINT "FK_a6d76ae9c216a9e617c7ea5151a" FOREIGN KEY ("favId") REFERENCES "fav"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "fav_tracks_track" ADD CONSTRAINT "FK_6db20f07f4d8785b509f1b67e9c" FOREIGN KEY ("trackId") REFERENCES "track"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fav_tracks_track" DROP CONSTRAINT "FK_6db20f07f4d8785b509f1b67e9c"`);
        await queryRunner.query(`ALTER TABLE "fav_tracks_track" DROP CONSTRAINT "FK_a6d76ae9c216a9e617c7ea5151a"`);
        await queryRunner.query(`ALTER TABLE "fav_albums_album" DROP CONSTRAINT "FK_28db650411c86ed74aee16922c0"`);
        await queryRunner.query(`ALTER TABLE "fav_albums_album" DROP CONSTRAINT "FK_aa6b8034edabc391c1e43640c4a"`);
        await queryRunner.query(`ALTER TABLE "fav_artists_artist" DROP CONSTRAINT "FK_c65613788f9ce94f6e84b324c72"`);
        await queryRunner.query(`ALTER TABLE "fav_artists_artist" DROP CONSTRAINT "FK_13d85914666a52b91d5dd104f23"`);
        await queryRunner.query(`ALTER TABLE "album" DROP CONSTRAINT "FK_ecbc0c0cfffc519f7f2407b0465"`);
        await queryRunner.query(`ALTER TABLE "track" DROP CONSTRAINT "FK_5902805b5cdc8b4fcf983f7df52"`);
        await queryRunner.query(`ALTER TABLE "track" DROP CONSTRAINT "FK_ee355f43e4481bb45755c50e984"`);
        await queryRunner.query(`DROP INDEX "IDX_6db20f07f4d8785b509f1b67e9"`);
        await queryRunner.query(`DROP INDEX "IDX_a6d76ae9c216a9e617c7ea5151"`);
        await queryRunner.query(`DROP TABLE "fav_tracks_track"`);
        await queryRunner.query(`DROP INDEX "IDX_28db650411c86ed74aee16922c"`);
        await queryRunner.query(`DROP INDEX "IDX_aa6b8034edabc391c1e43640c4"`);
        await queryRunner.query(`DROP TABLE "fav_albums_album"`);
        await queryRunner.query(`DROP INDEX "IDX_c65613788f9ce94f6e84b324c7"`);
        await queryRunner.query(`DROP INDEX "IDX_13d85914666a52b91d5dd104f2"`);
        await queryRunner.query(`DROP TABLE "fav_artists_artist"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "album"`);
        await queryRunner.query(`DROP TABLE "artist"`);
        await queryRunner.query(`DROP TABLE "track"`);
        await queryRunner.query(`DROP TABLE "fav"`);
    }

}
