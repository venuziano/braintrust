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
        SELECT id,'HR' FROM clients WHERE name='Acme Corp';

      -- role assignments
      WITH u AS (SELECT id,name FROM users), r AS (SELECT id,name FROM roles)
      INSERT INTO user_roles(user_id,role_id)
      SELECT u.id, r.id
      FROM u JOIN r ON
        (u.name='Alice Admin' AND r.name='Admin')
        OR (u.name='Bob SE' AND r.name='Solutions Engineer')
        OR (u.name='Carol Client' AND r.name='Client');

      -- SE assignments
      INSERT INTO se_assignments (se_id,client_id)
      SELECT u.id,c.id
      FROM users u, clients c
      WHERE u.name='Bob SE';

      -- Carol as a client-user in Acme’s Sales dept
      INSERT INTO client_users(user_id,client_id,department_id,notify_email,notify_sms,billing_access,admin_access)
      SELECT u.id, c.id, d.id, TRUE, FALSE, TRUE, FALSE
      FROM users u
      JOIN clients c ON c.name='Acme Corp'
      JOIN departments d ON d.client_id=c.id AND d.name='Sales'
      WHERE u.name='Carol Client';

      -- one workflow, two nodes, one execution with exception
      INSERT INTO workflows(client_id,department_id,name,description,time_saved_per_exec,cost_saved_per_exec)
      SELECT c.id, d.id,'Invoice Processing','Auto-post invoices', '00:15:00', 25.00
      FROM clients c
      JOIN departments d ON d.client_id=c.id
      WHERE c.name='Acme Corp' AND d.name='Sales';

      WITH w AS (SELECT id FROM workflows WHERE name='Invoice Processing')
      INSERT INTO nodes (workflow_id,name,node_type,settings)
      VALUES 
        ((SELECT id FROM w),'Fetch Bills','api_call','{"endpoint":"bill.com","method":"GET"}'),
        ((SELECT id FROM w),'Post to Ariba','api_call','{"endpoint":"ariba","method":"POST"}');

      WITH e AS (
        INSERT INTO executions(workflow_id,succeeded,time_taken,cost_saved)
        SELECT id, FALSE, '00:02:00', 0.0 FROM workflows WHERE name='Invoice Processing'
        RETURNING id
      )
      INSERT INTO exceptions (execution_id,exception_type,severity,remedy)
      SELECT e.id,'Integration','High','Check API key'
      FROM e;

      INSERT INTO exception_notifications (exception_id,user_id,method)
      SELECT ex.id, u.id, 'email'
      FROM exceptions ex
      JOIN users u ON u.name='Bob SE';
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // This migration is for seeding data, so we can leave the down method empty
    // or truncate tables if necessary, but for this case, it is not required.
  }
}
