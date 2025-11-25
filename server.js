const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '.'))); // Serve static files from current directory

// Database Setup
const db = new sqlite3.Database('./portfolio.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        // Create Messages Table
        db.run(`CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            message TEXT NOT NULL,
            date TEXT NOT NULL,
            status TEXT DEFAULT 'unread'
        )`);
    }
});

// API Routes

// Submit a new message
app.post('/api/messages', (req, res) => {
    const { name, email, message } = req.body;
    const date = new Date().toISOString();
    const sql = `INSERT INTO messages (name, email, message, date) VALUES (?, ?, ?, ?)`;
    
    db.run(sql, [name, email, message, date], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ 
            id: this.lastID,
            name,
            email,
            message,
            date,
            status: 'unread'
        });
    });
});

// Get all messages
app.get('/api/messages', (req, res) => {
    const sql = `SELECT * FROM messages ORDER BY id DESC`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Delete a message
app.delete('/api/messages/:id', (req, res) => {
    const sql = `DELETE FROM messages WHERE id = ?`;
    db.run(sql, req.params.id, function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ message: 'deleted', changes: this.changes });
    });
});

// Mark message as read (Update status)
app.put('/api/messages/:id/read', (req, res) => {
    const sql = `UPDATE messages SET status = 'read' WHERE id = ?`;
    db.run(sql, req.params.id, function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ message: 'updated', changes: this.changes });
    });
});

// Get Analytics
app.get('/api/analytics', (req, res) => {
    const totalMessagesQuery = `SELECT COUNT(*) as count FROM messages`;
    const unreadMessagesQuery = `SELECT COUNT(*) as count FROM messages WHERE status = 'unread'`;
    
    // Get start of today in ISO format (YYYY-MM-DD)
    const today = new Date().toISOString().split('T')[0];
    const todayMessagesQuery = `SELECT COUNT(*) as count FROM messages WHERE date LIKE ?`;

    db.get(totalMessagesQuery, [], (err, totalRow) => {
        if (err) return res.status(400).json({ error: err.message });
        
        db.get(unreadMessagesQuery, [], (err, unreadRow) => {
            if (err) return res.status(400).json({ error: err.message });
            
            db.get(todayMessagesQuery, [`${today}%`], (err, todayRow) => {
                if (err) return res.status(400).json({ error: err.message });

                res.json({
                    totalMessages: totalRow.count,
                    unreadMessages: unreadRow.count,
                    messagesToday: todayRow.count
                });
            });
        });
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
