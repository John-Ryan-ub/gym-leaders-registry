require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
})

const Leader = mongoose.model('Leader', new mongoose.Schema ({
    name: String,
    region: String,
    town: String,
    badge: String,
    specialty: String,
    aceLevel: Number,
    motto: String,
}));

app.post('/api/leader', async (req, res) => {
    const leader = new Leader(req, body);
    await leader.save();
    res.status(201).send(leader);
})

app.get('/api/leader', async (req, res) => {
    const list = await Leader.find();
    req.send(leader);console.log("Added new Leader:", leader);
});
//API is running on port 5000 -> https//localhost:5000

