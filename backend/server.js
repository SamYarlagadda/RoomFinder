const express = require('express');
const path = require('path');

const app = express()
const cors = require('cors');
app.use(cors());
const port = 3000; // Set your desired port number


app.use(express.static(path.join(__dirname, '../frontend/dist')));



app.get('/adduser', (req, res) => {
  console.log(req.body);
  res.send("Response Received:" + req.body);
});

// Your other Express middleware and routes go here

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});