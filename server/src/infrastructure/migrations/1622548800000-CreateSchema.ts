import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSchema1622548800000 implements MigrationInterface {
  name = 'CreateSchema1622548800000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "roles" (
        "id" SERIAL NOT NULL,
        "name" character varying NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "PK_c1433d744fa86b6b04828755346" PRIMARY KEY ("id")
      );
      CREATE TABLE "pipeline_phases" (
        "id" SERIAL NOT NULL,
        "name" character varying NOT NULL,
        "phase_order" integer NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "PK_a9b9a8ed2c938a3a0e1e2e9f3b4" PRIMARY KEY ("id")
      );
      CREATE TABLE "users" (
        "id" SERIAL NOT NULL,
        "name" character varying NOT NULL,
        "email" character varying NOT NULL,
        "phone" character varying,
        "password_hash" TEXT NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
      );
      CREATE TABLE "clients" (
        "id" SERIAL NOT NULL,
        "name" character varying NOT NULL,
        "url" character varying,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "PK_b7d3f9b1b1b1b1b1b1b1b1b1b1b" PRIMARY KEY ("id")
      );
      CREATE TABLE "departments" (
        "id" SERIAL NOT NULL,
        "client_id" integer NOT NULL,
        "name" character varying NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "PK_e8d8d8d8d8d8d8d8d8d8d8d8d8d" PRIMARY KEY ("id"),
        CONSTRAINT "FK_d8d8d8d8d8d8d8d8d8d8d8d8d8d" FOREIGN KEY ("client_id") REFERENCES "clients"("id")
      );
      CREATE TABLE "user_roles" (
        "user_id" integer NOT NULL,
        "role_id" integer NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "PK_f8f8f8f8f8f8f8f8f8f8f8f8f8f" PRIMARY KEY ("user_id", "role_id"),
        CONSTRAINT "FK_f8f8f8f8f8f8f8f8f8f8f8f8f8f" FOREIGN KEY ("user_id") REFERENCES "users"("id"),
        CONSTRAINT "FK_g8g8g8g8g8g8g8g8g8g8g8g8g8g" FOREIGN KEY ("role_id") REFERENCES "roles"("id")
      );
      CREATE TABLE "se_assignments" (
        "se_id" integer NOT NULL,
        "client_id" integer NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "PK_h8h8h8h8h8h8h8h8h8h8h8h8h8h" PRIMARY KEY ("se_id", "client_id"),
        CONSTRAINT "FK_h8h8h8h8h8h8h8h8h8h8h8h8h8h" FOREIGN KEY ("se_id") REFERENCES "users"("id"),
        CONSTRAINT "FK_i8i8i8i8i8i8i8i8i8i8i8i8i8i" FOREIGN KEY ("client_id") REFERENCES "clients"("id")
      );
      CREATE TABLE "client_users" (
        "id" SERIAL NOT NULL,
        "user_id" integer NOT NULL,
        "client_id" integer NOT NULL,
        "department_id" integer NOT NULL,
        "notify_email" boolean NOT NULL DEFAULT TRUE,
        "notify_sms" boolean NOT NULL DEFAULT FALSE,
        "billing_access" boolean NOT NULL DEFAULT FALSE,
        "admin_access" boolean NOT NULL DEFAULT FALSE,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "PK_j8j8j8j8j8j8j8j8j8j8j8j8j8j" PRIMARY KEY ("id"),
        CONSTRAINT "FK_j8j8j8j8j8j8j8j8j8j8j8j8j8j" FOREIGN KEY ("user_id") REFERENCES "users"("id"),
        CONSTRAINT "FK_k8k8k8k8k8k8k8k8k8k8k8k8k8k" FOREIGN KEY ("client_id") REFERENCES "clients"("id"),
        CONSTRAINT "FK_l8l8l8l8l8l8l8l8l8l8l8l8l8l" FOREIGN KEY ("department_id") REFERENCES "departments"("id")
      );
      CREATE TABLE "workflows" (
        "id" SERIAL NOT NULL,
        "client_id" integer NOT NULL,
        "department_id" integer NOT NULL,
        "name" character varying NOT NULL,
        "description" text,
        "time_saved_per_exec" interval,
        "cost_saved_per_exec" numeric(10, 2),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "PK_m8m8m8m8m8m8m8m8m8m8m8m8m8m" PRIMARY KEY ("id"),
        CONSTRAINT "FK_m8m8m8m8m8m8m8m8m8m8m8m8m8m" FOREIGN KEY ("client_id") REFERENCES "clients"("id"),
        CONSTRAINT "FK_n8n8n8n8n8n8n8n8n8n8n8n8n8n" FOREIGN KEY ("department_id") REFERENCES "departments"("id")
      );
      CREATE TABLE "nodes" (
        "id" SERIAL NOT NULL,
        "workflow_id" integer NOT NULL,
        "name" character varying NOT NULL,
        "node_type" character varying NOT NULL,
        "settings" jsonb,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "PK_o8o8o8o8o8o8o8o8o8o8o8o8o8o" PRIMARY KEY ("id"),
        CONSTRAINT "FK_o8o8o8o8o8o8o8o8o8o8o8o8o8o" FOREIGN KEY ("workflow_id") REFERENCES "workflows"("id")
      );
      CREATE TABLE "executions" (
        "id" SERIAL NOT NULL,
        "workflow_id" integer NOT NULL,
        "succeeded" boolean NOT NULL,
        "time_taken" interval,
        "cost_saved" numeric(10, 2),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "PK_p8p8p8p8p8p8p8p8p8p8p8p8p8p" PRIMARY KEY ("id"),
        CONSTRAINT "FK_p8p8p8p8p8p8p8p8p8p8p8p8p8p" FOREIGN KEY ("workflow_id") REFERENCES "workflows"("id")
      );
      CREATE TABLE "exceptions" (
        "id" SERIAL NOT NULL,
        "execution_id" integer NOT NULL,
        "exception_type" character varying NOT NULL,
        "severity" character varying NOT NULL,
        "remedy" text,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "PK_q8q8q8q8q8q8q8q8q8q8q8q8q8q" PRIMARY KEY ("id"),
        CONSTRAINT "FK_q8q8q8q8q8q8q8q8q8q8q8q8q8q" FOREIGN KEY ("execution_id") REFERENCES "executions"("id")
      );
      CREATE TABLE "exception_notifications" (
        "id" SERIAL NOT NULL,
        "exception_id" integer NOT NULL,
        "user_id" integer NOT NULL,
        "method" character varying NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "PK_r8r8r8r8r8r8r8r8r8r8r8r8r8r" PRIMARY KEY ("id"),
        CONSTRAINT "FK_r8r8r8r8r8r8r8r8r8r8r8r8r8r" FOREIGN KEY ("exception_id") REFERENCES "exceptions"("id"),
        CONSTRAINT "FK_s8s8s8s8s8s8s8s8s8s8s8s8s8s" FOREIGN KEY ("user_id") REFERENCES "users"("id")
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "exception_notifications";
      DROP TABLE "exceptions";
      DROP TABLE "executions";
      DROP TABLE "nodes";
      DROP TABLE "workflows";
      DROP TABLE "client_users";
      DROP TABLE "se_assignments";
      DROP TABLE "user_roles";
      DROP TABLE "departments";
      DROP TABLE "clients";
      DROP TABLE "users";
      DROP TABLE "pipeline_phases";
      DROP TABLE "roles";
    `);
  }
}
