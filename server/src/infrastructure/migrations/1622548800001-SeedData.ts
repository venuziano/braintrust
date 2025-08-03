import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedData1622548800001 implements MigrationInterface {
  name = 'SeedData1622548800001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      -- 1) roles
      WITH data AS (
        SELECT v.name,
               now() - random() * INTERVAL '365 days' AS ts
        FROM (VALUES
          ('Admin'),
          ('Solutions Engineer'),
          ('Client')
        ) AS v(name)
      )
      INSERT INTO roles (name, created_at, updated_at)
      SELECT name, ts, ts
      FROM data;

      -- 2) pipeline phases
      WITH data AS (
        SELECT v.name,
               v.phase_order,
               now() - random() * INTERVAL '365 days' AS ts
        FROM (VALUES
          ('Discovery: Initial Survey',      1),
          ('Discovery: Process deep dive',   2),
          ('ADA Proposal Sent',              3),
          ('ADA Proposal Review done',       4),
          ('ADA Contract Sent',              5),
          ('ADA Contract Signed',            6),
          ('Credentials collected',          7),
          ('Factory build initiated',        8),
          ('Test plan generated',            9),
          ('Testing started',                10),
          ('Production deploy',              11)
        ) AS v(name, phase_order)
      )
      INSERT INTO pipeline_phases (name, phase_order, created_at, updated_at)
      SELECT name, phase_order, ts, ts
      FROM data;

      -- 3) users
      WITH data AS (
        SELECT u.name,
               u.email,
               u.phone,
               u.hash   AS password_hash,
               now() - random() * INTERVAL '365 days' AS ts
        FROM (VALUES
          ('Alice Admin','alice@braintrust.com','+1-555-0100', md5('password1')),
          ('Bob SE','bob.se@contractor.com','+1-555-0101', md5('password2')),
          ('Carol Client','carol@acme.com','+1-555-0102', md5('password3'))
        ) AS u(name, email, phone, hash)
      )
      INSERT INTO users (name, email, phone, password_hash, created_at, updated_at)
      SELECT name, email, phone, password_hash, ts, ts
      FROM data;

      -- 4) clients
      WITH data AS (
        SELECT name,
               url,
               now() - random() * INTERVAL '365 days' AS ts
        FROM (VALUES
          ('Acme Corp','https://acme.example.com'),
          ('Globex Inc','https://globex.example.com')
        ) AS v(name, url)
        UNION ALL
        SELECT
          'Client '   || i,
          'https://client' || i || '.example.com',
          now() - random() * INTERVAL '365 days'
        FROM generate_series(1,20) AS s(i)
      )
      INSERT INTO clients (name, url, created_at, updated_at)
      SELECT name, url, ts, ts
      FROM data;

      -- 5) departments (Sales & HR per client)
      WITH data AS (
        SELECT c.id   AS client_id,
               d.name AS name,
               now() - random() * INTERVAL '365 days' AS ts
        FROM clients c
        CROSS JOIN (VALUES ('Sales'), ('HR')) AS d(name)
      )
      INSERT INTO departments (client_id, name, created_at, updated_at)
      SELECT client_id, name, ts, ts
      FROM data;

      -- 6) role assignments
      WITH u AS (
        SELECT id, name FROM users
      ), r AS (
        SELECT id, name FROM roles
      ), data AS (
        SELECT u.id AS user_id,
               r.id AS role_id,
               now() - random() * INTERVAL '365 days' AS ts
        FROM u
        JOIN r ON
          (u.name='Alice Admin'    AND r.name='Admin')
          OR (u.name='Bob SE'       AND r.name='Solutions Engineer')
          OR (u.name='Carol Client' AND r.name='Client')
      )
      INSERT INTO user_roles (user_id, role_id, created_at, updated_at)
      SELECT user_id, role_id, ts, ts
      FROM data;

      -- 7) SE assignments (Bob SE → all clients)
      WITH se AS (
        SELECT id FROM users WHERE name = 'Bob SE'
      ), data AS (
        SELECT se.id AS se_id,
               c.id  AS client_id,
               now() - random() * INTERVAL '365 days' AS ts
        FROM se
        CROSS JOIN clients c
      )
      INSERT INTO se_assignments (se_id, client_id, created_at, updated_at)
      SELECT se_id, client_id, ts, ts
      FROM data;

      -- 8) client_users (Carol in Acme's Sales)
      WITH cu AS (
        SELECT u.id AS user_id,
               c.id AS client_id,
               d.id AS department_id
        FROM users u
        JOIN clients c ON c.name = 'Acme Corp'
        JOIN departments d
          ON d.client_id = c.id
         AND d.name      = 'Sales'
        WHERE u.name = 'Carol Client'
      ), data AS (
        SELECT cu.user_id,
               cu.client_id,
               cu.department_id,
               TRUE  AS notify_email,
               FALSE AS notify_sms,
               TRUE  AS billing_access,
               FALSE AS admin_access,
               now() - random() * INTERVAL '365 days' AS ts
        FROM cu
      )
      INSERT INTO client_users (
        user_id, client_id, department_id,
        notify_email, notify_sms, billing_access, admin_access,
        created_at, updated_at
      )
      SELECT
        user_id, client_id, department_id,
        notify_email, notify_sms, billing_access, admin_access,
        ts, ts
      FROM data;

      -- 9) workflows (100 per client in Sales)
      WITH sales_depts AS (
        SELECT id AS department_id, client_id
        FROM departments
        WHERE name = 'Sales'
      ), data AS (
        SELECT
          sd.client_id,
          sd.department_id,
          concat('Workflow ', gs) AS name,
          'Auto-task ' || gs       AS description,
          '00:10:00'::interval      AS time_saved_per_exec,
          10.00                     AS cost_saved_per_exec,
          now() - random() * INTERVAL '365 days' AS ts
        FROM sales_depts sd
        CROSS JOIN generate_series(1,100) AS gs
      )
      INSERT INTO workflows (
        client_id, department_id, name, description,
        time_saved_per_exec, cost_saved_per_exec,
        created_at, updated_at
      )
      SELECT
        client_id, department_id, name, description,
        time_saved_per_exec, cost_saved_per_exec,
        ts, ts
      FROM data;

      -- 10) executions + exceptions + notifications
      WITH first_five AS (
        SELECT id AS workflow_id,
               ROW_NUMBER() OVER (PARTITION BY client_id ORDER BY id) AS rn
        FROM workflows
      ), exec_data AS (
        SELECT
          ff.workflow_id,
          FALSE       AS succeeded,
          '00:02:00'::interval AS time_taken,
          10.0        AS cost_saved,
          now() - random() * INTERVAL '365 days' AS ts
        FROM first_five ff
        WHERE ff.rn <= 5
      ), inserted_execs AS (
        INSERT INTO executions (
          workflow_id, succeeded, time_taken,
          cost_saved, created_at, updated_at
        )
        SELECT
          workflow_id, succeeded, time_taken,
          cost_saved, ts, ts
        FROM exec_data
        RETURNING id
      ), ex_data AS (
        SELECT
          ie.id         AS execution_id,
          'Integration' AS exception_type,
          'High'        AS severity,
          'Check API key' AS remedy,
          now() - random() * INTERVAL '365 days' AS ts
        FROM inserted_execs ie
      ), inserted_ex AS (
        INSERT INTO exceptions (
          execution_id, exception_type, severity,
          remedy, created_at, updated_at
        )
        SELECT
          execution_id, exception_type, severity,
          remedy, ts, ts
        FROM ex_data
        RETURNING id
      ), notify_data AS (
        SELECT
          ix.id      AS exception_id,
          u.id       AS user_id,
          'email'    AS method,
          now() - random() * INTERVAL '365 days' AS ts
        FROM inserted_ex ix
        JOIN users u ON u.name = 'Bob SE'
      )
      INSERT INTO exception_notifications (
        exception_id, user_id, method,
        created_at, updated_at
      )
      SELECT
        exception_id, user_id, method,
        ts, ts
      FROM notify_data;
    `);

    await queryRunner.query(`
      WITH client_cte AS (
        -- find Carol’s client
        SELECT c.id AS client_id
        FROM clients c
        JOIN client_users cu ON cu.client_id = c.id
        JOIN users u          ON u.id         = cu.user_id
        WHERE u.name = 'Carol Client'
      ), data AS (
        SELECT
          3,
          pp.id                           AS pipeline_phase_id,
          -- statuses: first 3 completed, 4th in_progress, rest not_started
          CASE
            WHEN pp.phase_order <= 3 THEN 'completed'
            WHEN pp.phase_order = 4 THEN 'in_progress'
            ELSE 'not_started'
          END::pipeline_phase_status AS status,
          -- random completed_at for the completed ones
          CASE
            WHEN pp.phase_order <= 3 THEN now() - random() * INTERVAL '365 days'
            ELSE NULL
          END AS completed_at,
          -- created_at / updated_at watermark
          now() - random() * INTERVAL '365 days' AS ts
        FROM client_cte
        CROSS JOIN pipeline_phases pp
      )
      INSERT INTO client_pipeline_progress (
        client_id,
        pipeline_phase_id,
        status,
        completed_at,
        created_at,
        updated_at
      )
      SELECT
        client_id,
        pipeline_phase_id,
        status,
        completed_at,
        ts,
        ts
      FROM data;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // no-op or truncate if needed
  }
}
