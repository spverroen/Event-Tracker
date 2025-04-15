require('dotenv').config();
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const cors = require('cors');

const PORT = process.env.BACKEND_PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json());

// ===============================
// Dynamic Functions
// ===============================

// Fetch one record from a model/table by ID
app.get('/fetch/:model/:id', async (req, res) => {
    const { model, id } = req.params;

    if (!prisma[model]) return res.status(400).json({ error: `Model not found` });

    try {
        const record = await prisma[model].findUnique({ where: { id: +id } });
        if (!record) return res.status(404).json({ error: `${model} not found` });
        res.json(record);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Fetch all records from a model/table
app.get('/fetch/:model', async (req, res) => {
    const { model } = req.params;

    if (!prisma[model]) return res.status(400).json({ error: `Model ${model} not found` });

    try {
        const records = await prisma[model].findMany();
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ error: `Unable to fetch records from ${model}: ${error.message}` });
    }
});

// Create a new record in a model/table
app.post('/create/:model', async (req, res) => {
    const { model } = req.params;

    if (!prisma[model]) return res.status(400).json({ error: `Model ${model} not found` });

    try {
        const record = await prisma[model].create({ data: req.body });
        res.status(201).json(record);
    } catch (error) {
        res.status(500).json({ error: `Unable to create record in ${model}: ${error.message}` });
    }
});

// Delete a record from a model/table by ID
app.delete('/delete/:model/:id', async (req, res) => {
    const { model, id } = req.params;

    if (!prisma[model]) return res.status(400).json({ error: `Model ${model} not found` });

    try {
        const record = await prisma[model].delete({ where: { id: +id } });
        res.status(200).json({ message: `${model} with ID ${id} deleted successfully`, record });
    } catch (error) {
        res.status(500).json({ error: `Unable to delete record from ${model}: ${error.message}` });
    }
});

// ===============================
// Non Dynamic Functions
// ===============================

// Create a new user
app.post('/signup', async (req, res) => {
  const { username, password, role = 'USER' } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password are required.' });

  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: await bcrypt.hash(password, 10),
        role,
      },
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Unable to create user.' });
  }
});

// Login a user
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password are required.' });

  try {
    const user = await prisma.user.findUnique({ where: { username } });
    const valid = user && await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials.' });

    res.json({
      message: 'Login successful',
      user: { id: user.id, username: user.username, role: user.role },
      // token: '...' // Optional: Add JWT here
    });
  } catch (err) {
    res.status(500).json({ error: 'Login failed.' });
  }
});

// ===============================
// Other fuctions
// ===============================

app.get('/', async (req, res) => {
    try {
      res.status(200).json({ message: '✅ Bravo, I work correctly!' });
    } catch (error) {
      res.status(500).json({ error: '❌ Sadly, I don\'t work!' });
    }
  });

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});