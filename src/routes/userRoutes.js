import express from 'express';
import bcrypt from 'bcryptjs';

import { getDB } from '../config/mongoConnection.js';
import { ObjectId } from 'mongodb';

const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  const db = getDB();
  try {
    const users = await db.collection('users').find({}).toArray();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single user by ID
router.get('/:id', async (req, res) => {
  const db = getDB();
  try {
    const user = await db.collection('users').findOne({ _id: new ObjectId(req.params.id) });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new user
router.post('/', async (req, res) => {
  const db = getDB();
  try {
    const newUser = await db.collection('users').insertOne(req.body);
    res.json(newUser.ops[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a user
router.put('/:id', async (req, res) => {
  const db = getDB();
  try {
    const updatedUser = await db.collection('users').findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body },
      { returnDocument: 'after' }
    );
    if (!updatedUser.value) return res.status(404).json({ error: 'User not found' });
    res.json(updatedUser.value);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  const db = getDB();
  try {
    const deletedUser = await db.collection('users').deleteOne({ _id: new ObjectId(req.params.id) });
    if (!deletedUser.deletedCount) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post('/register', async (req, res) => {
    const db = getDB();
    try {
      const { username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = await db.collection('users').insertOne({
        username,
        email,
        password: hashedPassword
      });
  
      res.json(newUser.ops[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // User login
  router.post('/login', async (req, res) => {
    const db = getDB();
    try {
      const { email, password } = req.body;
      const user = await db.collection('users').findOne({ email });
  
      if (user && await bcrypt.compare(password, user.password)) {
        res.json({ message: 'Login successful', user }); // Send user data or a token
      } else {
        res.status(400).json({ error: 'Invalid credentials' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  export default router;