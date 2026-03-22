const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const BASE = 'https://sxcran.ac.in/Student/';
const HEADERS = {
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'X-Requested-With': 'XMLHttpRequest',
  'Referer': 'https://sxcran.ac.in/Student/AttendanceSummary',
  'Origin': 'https://sxcran.ac.in',
  'Cookie': 'perf_dv6Tr4n=1',
  'User-Agent': 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 Chrome/120.0.0.0 Mobile Safari/537.36',
};

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.post('/attendance/:type', async (req, res) => {
  const { type } = req.params;
  const endpoints = {
    overall: 'showOverallAttendance',
    monthly: 'showMonthlyAttendance',
    daily:   'showDailyAttendance',
  };
  const endpoint = endpoints[type];
  if (!endpoint) return res.status(400).json({ error: 'Invalid type' });

  try {
    const response = await axios.post(BASE + endpoint, req.body, { headers: HEADERS });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('SXC backend running on port', PORT));
