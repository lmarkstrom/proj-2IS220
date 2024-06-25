const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// connect to SQLite database
const db = new sqlite3.Database('./database/reviews.db', (err) => {
    if (err) {
        console.error('Database connection error:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Middleware to parse JSON request body
app.use(express.json());

// Endpoint to handle POST request from frontend
app.post('/submit-review', (req, res) => {
    const { recipe, name, score, text } = req.body;

    // Insert data into SQLite database
    const sql = `INSERT INTO reviews (recipe, name, score, text) VALUES (?, ?, ?, ?)`;
    db.run(sql, [recipe, name, score, text], function(err) {
        if (err) {
            return console.error('Error inserting data:', err.message);
        }
        console.log(`Review added with ID: ${this.lastID}`);
        res.status(201).send('Review submitted successfully.');
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
