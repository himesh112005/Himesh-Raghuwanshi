const express = require('express');
const cors = require('cors');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'portfolio.db');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Initialize Database
const db = new sqlite3.Database(DB_FILE, (err) => {
    if (err) console.error('Error opening database:', err);
    else console.log('Connected to SQLite database.');
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        message TEXT,
        timestamp INTEGER,
        read INTEGER DEFAULT 0
    )`);
});

// Get all messages
app.get('/api/messages', (req, res) => {
    db.all("SELECT * FROM messages ORDER BY timestamp DESC", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        // Convert 0/1 to boolean for frontend compatibility
        const messages = rows.map(row => ({
            ...row,
            read: !!row.read
        }));
        res.json(messages);
    });
});

// Add new message
app.post('/api/messages', (req, res) => {
    const { name, email, message } = req.body;
    const timestamp = Date.now();
    
    const sql = "INSERT INTO messages (name, email, message, timestamp, read) VALUES (?, ?, ?, ?, 0)";
    
    db.run(sql, [name, email, message, timestamp], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            success: true,
            message: {
                id: this.lastID,
                name,
                email,
                message,
                timestamp,
                read: false
            }
        });
    });
});

// Mark message as read
app.patch('/api/messages/:id/read', (req, res) => {
    const sql = "UPDATE messages SET read = 1 WHERE id = ?";
    db.run(sql, [req.params.id], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ error: 'Message not found' });
        } else {
            res.json({ success: true });
        }
    });
});

// Delete message
app.delete('/api/messages/:id', (req, res) => {
    const sql = "DELETE FROM messages WHERE id = ?";
    db.run(sql, [req.params.id], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ success: true });
    });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Local: http://localhost:${PORT}`);
});
