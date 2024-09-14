const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgres://default:0ofBkLw9rUXh@ep-orange-thunder-a2a3vi2n.eu-central-1.aws.neon.tech:5432/verceldb?sslmode=require',
});

export default pool;