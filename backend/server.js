const express = require('express');
const path = require('path');
const mysql = require('mysql');
const app = express()
const cors = require('cors');
app.use(cors());
const port = 3000; // Set your desired port number


app.use(express.static(path.join(__dirname, '../frontend/dist')));

const pool = mysql.createPool({
  host: '192.168.7.169',
  user: 'samuel',
  password: 'ssy22',
  database: 'RoomFinderDB',
  port: '3306',
  connectTimeout: '20000',
})

app.get('/users', (req,res)=>{
  const sql = 'select * from users';
  pool.query(sql,(err,data)=>{
    if(err) return res.json(err);
    return res.json(data);
  })
})

app.get('/adduser', (req, res) => {
  console.log(req.body);
  res.send("Response Received:" + req.body);
});

// Your other Express middleware and routes go here

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
