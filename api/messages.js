// NOTE: On Vercel, data is stored in memory and will reset when the function restarts.
// To keep data permanently, you need an external database like MongoDB or Supabase.
let messages = [];

export default function handler(req, res) {
    // Set CORS headers to allow access
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
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
            messages.unshift(newMessage); // Add to beginning
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
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
