require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors({
  origin: '*',           // adjust to your frontend
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: '*',
  credentials: false                          // if using cookies/auth
}));// Allow all origins (you can restrict in prod)
app.use(express.json());

const ODP_API_KEY = process.env.ODP_API_KEY;
const ODP_ENDPOINT = 'https://api.zaius.com/v3/objects/';

app.post('/api/send-to-odp', async (req, res) => {
  try {
    console.log(req.body);
    const odp_obj = req.headers['odp-object'];
    const response = await axios.post(ODP_ENDPOINT + odp_obj, req.body, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ODP_API_KEY,
      },
    });
    
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error?.response?.data || error.message });
  }
});

app.listen(PORT, () => console.log(`Proxy running at http://localhost:${PORT}`));