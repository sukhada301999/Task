// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const sampleDataRoute = require('./routes/sampleData');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/sample_data', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use('/api/sampledata', sampleDataRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// routes/sampleData.js
const express = require('express');
const router = express.Router();
const SampleData = require('../models/SampleData');

// Import raw sample data to DB collection
router.post('/import', async (req, res) => {
  try {
    const { data } = req.body;
    await SampleData.insertMany(data);
    res.status(200).json({ message: 'Sample data imported successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generate summary in tabular format
router.get('/summary', async (req, res) => {
  try {
    const summary = await SampleData.aggregate([
      {
        $group: {
          _id: '$value',
          count: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Write an API to filter data from time to time
router.get('/filter', async (req, res) => {
  try {
    const { startTime, frequency } = req.query;
    // Implement logic to filter data based on startTime and frequency
    // Example: SampleData.find({ timestamp: { $gte: startTime }});
    res.status(200).json({ message: 'Filtering data...' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
