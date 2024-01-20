const express = require('express');
const cors = require('cors');
const xlsx = require('xlsx');
const path = require('path');

const app = express();
const port = 5000;

app.use(cors());

const databasePath = path.join(__dirname, 'database', 'CarDB.xlsx');

app.use(express.json());

app.get('/api/cars', (req, res) => {
  try {
    const workbook = xlsx.readFile(databasePath);
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    res.json(data);
  } catch (error) {
    console.error('Error reading Excel file:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
