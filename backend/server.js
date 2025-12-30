/* eslint-disable no-undef */
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import path from 'path';

dotenv.config({
  path: path.resolve(process.cwd(), 'backend/.env'),
});

const app = express();
app.use(
  cors({
    origin: [process.env.CLIENT_URL, process.env.CLIENT_URL_LAN],
    methods: ['GET', 'POST'],
    credentials: true,
  })
);

app.use(express.json());
const PORT = process.env.PORT || 3031;

app.get('/', (req, res) => {
  res.send('Backend API running ✅');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running locally: http://localhost:${PORT}`);
  console.log(`✅ Server available on LAN: http://192.168.1.69:${PORT}`);
});

let con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

con.connect((err) => {
  if (err) throw err;
  console.log('Connected');
});

// Fetch Methods
app.get('/api/getAppSettings', (req, res) => {
  const brandName = req.query.name;
  const sql = 'SELECT * FROM app_settings where name = ?';
  con.query(sql, [brandName], (err, results) => {
    if (err) {
      console.error('Query error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

app.get('/api/getContactDetails', (req, res) => {
  const Contact = req.query.name;
  const sql = 'SELECT * FROM app_settings where name like ?';
  con.query(sql, [`${Contact}%`], (err, results) => {
    if (err) {
      console.error('Query error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

app.post('/api/saveQuery', (req, res) => {
  const { name, number, email, product, message, time_logged } = req.body;
  const sql = `
    INSERT INTO query_table (name, number, email, product, message, date_logged)
    VALUES (?, ?, ?, ?, ?, ?)`;
  con.query(
    sql,
    [name, number, email, product, message, time_logged],
    (err, results) => {
      if (err) {
        console.error('Query error:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    }
  );
});

app.get('/api/getContactRecords', (req, res) => {
  const sql =
    'SELECT qt.name,qt.number, qt.email, qt.product,qt.message,qt.date_logged, tat.acknowledged FROM query_table qt inner join ticketAcknowldgeTable tat on qt.name = tat.name and qt.email = tat.email';
  con.query(sql, (err, results) => {
    if (err) {
      console.error('Query error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

app.post('/api/acknowledgeDocument', (req, res) => {
  const { recordName, recordEmail } = req.body;
  const sql =
    'update ticketAcknowldgeTable set acknowledged = 1 where name = ? and email = ?';
  con.query(sql, [recordName, recordEmail], (err, results) => {
    if (err) {
      console.error('Query error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

app.post('/api/CheckSignon', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM signon where email = ? and password = ?';
  con.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error('Query error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

app.post('/api/CheckSignonTableByName', (req, res) => {
  const { name } = req.body;
  const sql = 'SELECT admin, name FROM signon where name = ?';
  con.query(sql, [name], (err, results) => {
    if (err) {
      console.error('Query error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

app.post('/api/SubmitContactForm', (req, res) => {
  const { name } = req.body;
  const sql =
    'Insert into contact_queries(name, number,email,product,message,message_sent)' +
    'values(?,?,?,?,?,?)';
  con.query(sql, [name], (err, results) => {
    if (err) {
      console.error('Query error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

app.post('/api/AcknowledgementTable', (req, res) => {
  const { name, email } = req.body;
  const sql =
    'Insert into ticketAcknowldgeTable(name,email,acknowledged)' +
    'values(?,?,?)';
  con.query(sql, [name, email, false], (err, results) => {
    if (err) {
      console.error('Query error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

app.get('/api/getDashboardStart', (req, res) => {
  const dashboardName = req.query.dashboardName;
  const sql = 'SELECT * FROM dashboardStats where statName = ?';
  con.query(sql, [dashboardName], (err, results) => {
    if (err) {
      console.error('Query error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

app.post('/api/registerView', (req, res) => {
  const { statName, description, ticket_created } = req.body;
  // Insert SQL Statement
  const SQL =
    'INSERT INTO dashboardStats(statName, description, ticket_created) VALUES(?,?,?)';
  con.query(SQL, [statName, description, ticket_created], (err, results) => {
    if (err) {
      console.error('Error Registering View:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json({ success: true, results });
  });
});
