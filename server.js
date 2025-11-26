const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'messages.json');

// Middleware
app.use(cors());
app.use(express.json());

// Add logging to see requests in terminal
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

app.use(express.static(__dirname));

// Ensure data directory exists
async function ensureDataDir() {
    const dataDir = path.join(__dirname, 'data');
    try {
        await fs.mkdir(dataDir, { recursive: true });
        try {
            await fs.access(DATA_FILE);
        } catch {
            await fs.writeFile(DATA_FILE, JSON.stringify([]));
        }
    } catch (error) {
        console.error('Error creating data directory:', error);
    }
}

// Get all messages
app.get('/api/messages', async (req, res) => {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ error: 'Error reading messages' });
    }
});

// Add new message
app.post('/api/messages', async (req, res) => {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        const messages = JSON.parse(data);
        
        const newMessage = {
            id: Date.now(),
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
            timestamp: Date.now(),
            read: false
        };
        
        messages.push(newMessage);
        await fs.writeFile(DATA_FILE, JSON.stringify(messages, null, 2));
        res.json({ success: true, message: newMessage });
    } catch (error) {
        res.status(500).json({ error: 'Error saving message' });
    }
});

// Mark message as read
app.patch('/api/messages/:id/read', async (req, res) => {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        const messages = JSON.parse(data);
        const index = messages.findIndex(m => m.id == req.params.id);
        
        if (index !== -1) {
            messages[index].read = true;
            await fs.writeFile(DATA_FILE, JSON.stringify(messages, null, 2));
            res.json({ success: true });
        } else {
            res.status(404).json({ error: 'Message not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating message' });
    }
});

// Delete message
app.delete('/api/messages/:id', async (req, res) => {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        let messages = JSON.parse(data);
        messages = messages.filter(m => m.id != req.params.id);
        
        await fs.writeFile(DATA_FILE, JSON.stringify(messages, null, 2));
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting message' });
    }
});

// Start server
ensureDataDir().then(() => {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Local: http://localhost:${PORT}`);
        console.log(`Network: http://<your-ip>:${PORT}`);
    });
});
