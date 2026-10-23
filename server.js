
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
})

// Leader Model
const Leader = mongoose.model('Leader', new mongoose.Schema({
    name: String,
    region: String,
    town: String,
    badge: String,
    specialty: String,
    aceLevel: Number,
    motto: String,
}));

app.get('/api/leader', async (req, res) => {
  const leader = await Leader.find();
  res.send(leader);console.log("Fetched all leader");
});

app.post('/api/leader', async (req, res) => {
  const leader = new Leader(req.body);
  await leader.save();
  res.send(leader);console.log("Added new leader:", leader);
});
//Delete request for the data
app.delete('/api/leader/:id', async(req, res) => {
  await Leader.findByIdAndDelete(req.params.id);
  res.status(204).send; // 205 means that we have successful deletion
})
//Update request for the data
app.put('/api/leader/:id', async(req, res) => {
  const updateLeader = await Leader.findByIdAndUpdate(req.params.id, req.body, {new: true});
  res.send(updateLeader);
})