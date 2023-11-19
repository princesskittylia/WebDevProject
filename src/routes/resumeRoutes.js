import express from 'express';
import { getDB } from '../config/mongoConnection.js';
import { ObjectId } from 'mongodb';

const router = express.Router();

// GET all resumes
router.get('/', async (req, res) => {
  const db = getDB();
  try {
    const resumes = await db.collection('resumes').find({}).toArray();
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a single resume by ID
router.get('/:id', async (req, res) => {
  const db = getDB();
  try {
    const resume = await db.collection('resumes').findOne({ _id: new ObjectId(req.params.id) });
    if (!resume) return res.status(404).json({ error: 'Resume not found' });
    res.json(resume);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new resume
router.post('/', async (req, res) => {
  const db = getDB();
  try {
    const newResume = await db.collection('resumes').insertOne(req.body);
    res.json(newResume.ops[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT (update) a resume
router.put('/:id', async (req, res) => {
  const db = getDB();
  try {
    const updatedResume = await db.collection('resumes').findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body },
      { returnOriginal: false }
    );
    if (!updatedResume.value) return res.status(404).json({ error: 'Resume not found' });
    res.json(updatedResume.value);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a resume
router.delete('/:id', async (req, res) => {
  const db = getDB();
  try {
    const deletedResume = await db.collection('resumes').findOneAndDelete({ _id: new ObjectId(req.params.id) });
    if (!deletedResume.value) return res.status(404).json({ error: 'Resume not found' });
    res.json(deletedResume.value);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
