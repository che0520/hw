const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'notes.json');

app.use(cors());
app.use(express.json());

// Load notes from disk
function readNotes() {
  if (!fs.existsSync(DATA_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch {
    return [];
  }
}

// Save notes to disk
function writeNotes(notes) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(notes, null, 2), 'utf8');
}

// GET /notes — return all notes
app.get('/notes', (req, res) => {
  res.json(readNotes());
});

// GET /notes/:id — return single note
app.get('/notes/:id', (req, res) => {
  const note = readNotes().find(n => n.id === req.params.id);
  if (!note) return res.status(404).json({ error: 'Not found' });
  res.json(note);
});

// POST /notes — create a new note
app.post('/notes', (req, res) => {
  const { id, title, body, updated } = req.body;
  if (!id) return res.status(400).json({ error: 'id is required' });
  const notes = readNotes();
  if (notes.find(n => n.id === id))
    return res.status(409).json({ error: 'Note already exists' });
  const note = { id, title: title || 'Untitled', body: body || '', updated: updated || Date.now() };
  notes.push(note);
  writeNotes(notes);
  res.status(201).json(note);
});

// PUT /notes/:id — update a note
app.put('/notes/:id', (req, res) => {
  const notes = readNotes();
  const idx = notes.findIndex(n => n.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  notes[idx] = { ...notes[idx], ...req.body, id: req.params.id };
  writeNotes(notes);
  res.json(notes[idx]);
});

// DELETE /notes/:id — delete a note
app.delete('/notes/:id', (req, res) => {
  const notes = readNotes();
  const filtered = notes.filter(n => n.id !== req.params.id);
  if (filtered.length === notes.length)
    return res.status(404).json({ error: 'Not found' });
  writeNotes(filtered);
  res.json({ deleted: req.params.id });
});

app.listen(PORT, () => {
  console.log(`Notebook server running at http://localhost:${PORT}`);
  console.log(`Notes stored in: ${DATA_FILE}`);
});
