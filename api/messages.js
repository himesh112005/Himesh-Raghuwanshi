let messages = [];

export default function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // GET - Retrieve all messages
    if (req.method === 'GET') {
        return res.status(200).json(messages);
    }

    // POST - Add new message
    if (req.method === 'POST') {
        const { name, email, message } = req.body;
        const newMessage = {
            id: Date.now(),
            name,
            email,
            message,
            timestamp: Date.now(),
            read: false
        };
        messages.push(newMessage);
        return res.status(201).json({ success: true, message: newMessage });
    }

    // PATCH - Mark as read
    if (req.method === 'PATCH') {
        const id = parseInt(req.query.id);
        const index = messages.findIndex(m => m.id === id);
        if (index !== -1) {
            messages[index].read = true;
            return res.status(200).json({ success: true });
        }
        return res.status(404).json({ error: 'Message not found' });
    }

    // DELETE - Delete message
    if (req.method === 'DELETE') {
        const id = parseInt(req.query.id);
        messages = messages.filter(m => m.id !== id);
        return res.status(200).json({ success: true });
    }

    res.status(405).json({ error: 'Method not allowed' });
}
