const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3000;

// set static public path
app.use(express.static(path.join(__dirname, 'public')));

// set start page
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

app.use(cors());

app.use(express.json());

// Start serverside code
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


// Database code


// Store data in SQLite database
app.post('/submit-review', (req, res) => {
    const { recipe, name, score, text } = req.body;

    // Insert data 
    const sql = `
        INSERT INTO reviews (recipe, name, score, text) 
        VALUES (?, ?, ?, ?)
    `;
    db.run(sql, [recipe, name, score, text], function(err) {
        if (err) {
            return console.error('Error inserting data:', err.message);
        }
        console.log(`Review added with ID: ${this.lastID}`);
        res.status(201).send('Review submitted successfully.');
    });
});

// get reviews for specific recipe in SQLite database
app.post('/get-reviews', (req, res) => {
    console.log('Fetching reviews for recipe:', req.body.recipe);
    const { recipe } = req.body;

    // Fetch all reviews for the specified recipe
    const selectSql = `
        SELECT name, score, text 
        FROM reviews 
        WHERE recipe = ?
    `;
    db.all(selectSql, [recipe], (err, rows) => {
        if (err) {
            console.error('Error fetching reviews:', err.message);
            return res.status(500).send('Error fetching reviews.');
        }
        // snd list of reviews as response
        res.status(200).json(rows); // rows is an array of one review 
    });
});

app.get('/top-recipes', (req, res) => {
    const selectSql = `
        SELECT recipe, AVG(score) as average_score
        FROM reviews
        GROUP BY recipe
        ORDER BY average_score DESC
        LIMIT 10
    `;
    db.all(selectSql, [], (err, rows) => {
        if (err) {
            console.error('Error fetching top recipes:', err.message);
            return res.status(500).send('Error fetching top recipes.');
        }
        // Send the list of top recipes as response
        res.status(200).json(rows);
    });
});