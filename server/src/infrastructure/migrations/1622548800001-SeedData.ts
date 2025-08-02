import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedData1622548800001 implements MigrationInterface {
  name = 'SeedData1622548800001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      -- roles
      INSERT INTO roles (name) VALUES 
        ('Admin'),
        ('Solutions Engineer'),
        ('Client');

      -- pipeline phases
      INSERT INTO pipeline_phases (name, phase_order) VALUES
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
        ('Production deploy',              11);

      -- two users
      INSERT INTO users (name,email,phone, password_hash) VALUES
        ('Alice Admin','alice@braintrust.com','+1-555-0100', 'password1'),
        ('Bob SE','bob.se@contractor.com','+1-555-0101', 'password2'),
        ('Carol Client','carol@acme.com','+1-555-0102', 'password3');

      -- two clients
      INSERT INTO clients (name,url) VALUES
        ('Acme Corp','https://acme.example.com'),
        ('Globex Inc','https://globex.example.com');

      -- departments for Acme
      INSERT INTO departments (client_id,name)
        SELECT id,'Sales' FROM clients WHERE name='Acme Corp'
      UNION ALL
        SELECT id,'HR'    FROM clients WHERE name='Acme Corp';

      -- departments for Globex
      INSERT INTO departments (client_id,name)
        SELECT id,'Sales' FROM clients WHERE name='Globex Inc'
      UNION ALL
        SELECT id,'HR'    FROM clients WHERE name='Globex Inc';

      -- role assignments
      WITH u AS (SELECT id,name FROM users), r AS (SELECT id,name FROM roles)
      INSERT INTO user_roles(user_id,role_id)
      SELECT u.id, r.id
      FROM u JOIN r ON
        (u.name='Alice Admin' AND r.name='Admin')
        OR (u.name='Bob SE'      AND r.name='Solutions Engineer')
        OR (u.name='Carol Client' AND r.name='Client');

      -- SE assignments (Bob SE ➔ both clients)
      INSERT INTO se_assignments (se_id,client_id)
      SELECT u.id,c.id
      FROM users u, clients c
      WHERE u.name='Bob SE';

      -- Carol as a client-user in Acme's Sales dept
      INSERT INTO client_users(user_id,client_id,department_id,notify_email,notify_sms,billing_access,admin_access)
      SELECT u.id, c.id, d.id, TRUE, FALSE, TRUE, FALSE
      FROM users u
      JOIN clients c ON c.name='Acme Corp'
      JOIN departments d ON d.client_id=c.id AND d.name='Sales'
      WHERE u.name='Carol Client';

      -- seed 100 workflows per client (all in the Sales department) with dates spread across the last year
      INSERT INTO workflows(client_id,department_id,name,description,time_saved_per_exec,cost_saved_per_exec,created_at)
      SELECT 
        c.id, 
        d.id,
        concat('Workflow ', gs) AS name,
        'Auto-task ' || gs AS description,
        '00:10:00' AS time_saved_per_exec,
        10.00 AS cost_saved_per_exec,
        -- Generate dates spread across the last year (365 days)
        -- Use a more predictable distribution: 1-100 days ago
        CURRENT_DATE - INTERVAL '1 day' * (gs - 1) AS created_at
      FROM clients c
      JOIN departments d 
        ON d.client_id = c.id 
       AND d.name = 'Sales'
      CROSS JOIN generate_series(1,100) AS gs;

      -- for the first 5 workflows of each client, insert one execution + one exception
      WITH wf AS (
        SELECT id,
               client_id,
               ROW_NUMBER() OVER (PARTITION BY client_id ORDER BY id) AS rn
        FROM workflows
      ),
      execs AS (
        INSERT INTO executions (workflow_id,succeeded,time_taken,cost_saved)
        SELECT id, FALSE, '00:02:00', 10.0
        FROM wf
        WHERE rn <= 5
        RETURNING id
      )
      INSERT INTO exceptions (execution_id,exception_type,severity,remedy)
      SELECT execs.id, 'Integration','High','Check API key'
      FROM execs;

      -- notify Bob SE about every exception
      INSERT INTO exception_notifications (exception_id,user_id,method)
      SELECT ex.id, u.id, 'email'
      FROM exceptions ex
      JOIN users u ON u.name='Bob SE';
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // no-op or truncate if needed
  }
}
