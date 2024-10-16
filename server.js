const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PW,
  database: 'tarefa1',
});

const executeQuery = async (query, values = []) => {
  const connection = await db.getConnection();
  try {
    const [results] = await connection.query(query, values);
    return results;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  } finally {
    connection.release();
  }
};

app.post('/submit', async (req, res) => {
  const { contact, generalInfo, address } = req.body;

  try {
    const logradouroQuery = `
      INSERT INTO logradouro (type, name) 
      VALUES (?, ?) 
      ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id);
    `;
    const logradouroValues = [address.tipo_logradouro, address.street];
    const logradouroResult = await executeQuery(logradouroQuery, logradouroValues);
    const logradouroId = logradouroResult.insertId || logradouroResult[0].id;

    const bairroQuery = `
      INSERT INTO bairro (name) 
      VALUES (?) 
      ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id);
    `;
    const bairroValues = [address.bairro];
    const bairroResult = await executeQuery(bairroQuery, bairroValues);
    const bairroId = bairroResult.insertId || bairroResult[0].id;

    const cidadeQuery = `
      INSERT INTO cidade (name) 
      VALUES (?) 
      ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id);
    `;
    const cidadeValues = [address.cidade];
    const cidadeResult = await executeQuery(cidadeQuery, cidadeValues);
    const cidadeId = cidadeResult.insertId || cidadeResult[0].id;

    const allDataQuery = `
      INSERT INTO all_data (first_name, last_name, birthday, sex, cpf, logradouro_id, bairro_id, city_id, number, cep, email, phone)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    const allDataValues = [
      generalInfo.firstName,
      generalInfo.lastName,
      generalInfo.nascimento,
      generalInfo.sex,
      generalInfo.cpf,
      logradouroId,
      bairroId,
      cidadeId,
      address.number,
      address.cep,
      contact.mail,
      contact.phone,
    ];

    await executeQuery(allDataQuery, allDataValues);
    res.status(201).json({ message: 'Data submitted successfully!' });

  } catch (err) {
    console.error('Error inserting data:', err);
    res.status(500).json({ error: 'Failed to submit data' });
  }
});

app.delete('/delete-row/:id', async (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM all_data WHERE id = ?";
  try {
    const result = await executeQuery(sql, [id]);
    if (result.affectedRows === 0) {
      return res.status(404).send('Row not found');
    }
    res.status(204).send(); 
  } catch (err) {
    console.error('Error deleting row:', err);
    res.status(500).send('Error deleting row');
  }
});


app.put('/update-row/:id', async (req, res) => {
  const id = req.params.id;
  const {first_name, last_name, birthday, sex, cpf, type, bairro, cidade, street, number, cep, email, phone} = req.body;
  const formattedBirthday = new Date(birthday).toISOString().split('T')[0];  
  try {
    const logradouroResult = await executeQuery(
      'SELECT id FROM logradouro WHERE type = ? AND name = ?',
      [type, street]
    );
    if (logradouroResult.length === 0) {
      return res.status(404).send('Logradouro not found');
    }
    const logradouro_id = logradouroResult[0].id;

    const bairroResult = await executeQuery('SELECT id FROM bairro WHERE name = ?', [bairro]);
    if (bairroResult.length === 0) {
      return res.status(404).send('Bairro not found');
    }
    const bairro_id = bairroResult[0].id;

    const cidadeResult = await executeQuery('SELECT id FROM cidade WHERE name = ?', [cidade]);
    if (cidadeResult.length === 0) {
      return res.status(404).send('Cidade not found');
    }
    const cidade_id = cidadeResult[0].id;

  const updateQuery = `
      UPDATE all_data
      SET 
    first_name = ?, 
    last_name = ?, 
    birthday = ?, 
    sex = ?, 
    cpf = ?, 
    logradouro_id = ?, 
    bairro_id = ?, 
    city_id = ?, 
    number = ?, 
    cep = ?, 
    email = ?, 
    phone = ?
  WHERE id = ?
    `;
    const result = await executeQuery(updateQuery, [first_name, last_name, formattedBirthday, sex, cpf, logradouro_id, bairro_id, cidade_id, number, cep, email, phone, id]);

    if (result.affectedRows === 0) {
      return res.status(404).send('Row not found');
    }

    res.status(200).send('Row updated successfully');
  } catch (err) {
    console.error('Error updating row:', err);
    res.status(500).send('Error updating row');
  }
});


app.get('/tipo_logradouro', async (req, res) => {
  const q = "SELECT DISTINCT type AS tipo_logradouro FROM logradouro"; 
  try {
    const data = await executeQuery(q);
    return res.json(data);
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.get('/bairros', async (req, res) => {
  const q = "SELECT DISTINCT name AS bairro FROM bairro";
  try {
    const data = await executeQuery(q);
    return res.json(data);
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.get('/cidades', async (req, res) => {
  const q = "SELECT DISTINCT name AS cidade FROM cidade";
  try {
    const data = await executeQuery(q);
    return res.json(data);
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.get('/get_user_data/:id?', async (req, res) => {
  const { id } = req.params;

  const q = `
    SELECT a.id, a.first_name, a.last_name, a.birthday, a.sex, a.cpf, l.type, 
           l.name AS street, b.name AS bairro, c.name AS cidade, 
           a.number, a.cep, a.email, a.phone 
    FROM all_data a 
    LEFT JOIN logradouro l ON a.logradouro_id = l.id 
    LEFT JOIN bairro b ON a.bairro_id = b.id 
    LEFT JOIN cidade c ON a.city_id = c.id
    ${id ? 'WHERE a.id = ?' : ''}`; 

  try {
    const data = await executeQuery(q, id ? [id] : []);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Falha na consulta do banco de dados' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
