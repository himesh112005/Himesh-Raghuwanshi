// API Configuration
// Determine API URL: Localhost uses port 3000, Vercel uses relative path
const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_BASE = isLocal ? 'http://localhost:3000' : '';

// Check authentication
if (localStorage.getItem('admin_logged_in') !== 'true') {
    window.location.href = 'login.html';
}

function logout() {
    localStorage.removeItem('admin_logged_in');
    window.location.href = 'login.html';
}

// Load messages from server
async function loadMessages() {
    const apiUrl = `${API_BASE}/api/messages`;
    console.log('Fetching messages from:', apiUrl);

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`Server error: ${response.status}`);
        
        const messages = await response.json();
        displayMessages(messages);
        updateStats(messages);
    } catch (error) {
        console.error('Error loading messages:', error);
        document.getElementById('messagesList').innerHTML = 
            `<div class="error-message">
                Error loading messages.<br>
                <small>${error.message}</small><br>
                <small>URL: ${apiUrl}</small>
            </div>`;
    }
}

function displayMessages(messages) {
    const messagesList = document.getElementById('messagesList');
    
    if (!messages || messages.length === 0) {
        messagesList.innerHTML = '<div class="no-messages">No messages yet.</div>';
        return;
    }

    messagesList.innerHTML = messages.map(msg => `
        <div class="message-card ${msg.read ? 'read' : 'unread'}">
            <div class="message-header">
                <div>
                    <strong>${msg.name || 'Unknown'}</strong>
                    <span class="message-email">${msg.email || 'No email'}</span>
                </div>
                <span class="message-date">${new Date(msg.timestamp).toLocaleDateString()}</span>
            </div>
            <div class="message-body">${msg.message}</div>
            <div class="message-actions">
                <button onclick="markAsRead(${msg.id})" class="btn-small ${msg.read ? 'disabled' : ''}">
                    ${msg.read ? '✓ Read' : 'Mark as Read'}
                </button>
                <button onclick="deleteMessage(${msg.id})" class="btn-small btn-danger">Delete</button>
            </div>
        </div>
    `).join('');
}

function updateStats(messages) {
    if (!messages) return;
    const today = new Date().toDateString();
    const unread = messages.filter(m => !m.read).length;
    const messagesToday = messages.filter(m => 
        new Date(m.timestamp).toDateString() === today
    ).length;

    document.getElementById('totalMessages').textContent = messages.length;
    document.getElementById('unreadMessages').textContent = unread;
    document.getElementById('messagesToday').textContent = messagesToday;
}

async function markAsRead(id) {
    try {
        // Vercel requires ID as query param for serverless functions
        const url = isLocal 
            ? `${API_BASE}/api/messages/${id}/read` 
            : `${API_BASE}/api/messages?id=${id}`;
            
        const method = isLocal ? 'PATCH' : 'PATCH'; // Both use PATCH

        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) loadMessages();
    } catch (error) {
        console.error(error);
        alert('Error updating message');
    }
}

async function deleteMessage(id) {
    if (confirm('Are you sure you want to delete this message?')) {
        try {
            const url = isLocal 
                ? `${API_BASE}/api/messages/${id}` 
                : `${API_BASE}/api/messages?id=${id}`;

            const response = await fetch(url, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.ok) loadMessages();
        } catch (error) {
            console.error(error);
            alert('Error deleting message');
        }
    }
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('adminLoggedIn');
        window.location.href = 'login.html';
    }
}

function checkAuth() {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
        window.location.href = 'login.html';
    }
}

// Initialize
checkAuth();
loadMessages();
setInterval(loadMessages, 30000);
