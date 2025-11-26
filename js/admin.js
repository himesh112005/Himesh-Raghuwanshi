// API Configuration - automatically uses current domain
const API_URL = '/api/messages';

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
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Server error');
        
        const messages = await response.json();
        displayMessages(messages);
        updateStats(messages);
    } catch (error) {
        console.error('Error loading messages:', error);
        document.getElementById('messagesList').innerHTML = 
            `<div class="error-message">
                Error loading messages. Please refresh the page.<br>
                <small>If the problem persists, check your deployment logs.</small>
            </div>`;
    }
}

function displayMessages(messages) {
    const messagesList = document.getElementById('messagesList');
    
    if (messages.length === 0) {
        messagesList.innerHTML = '<div class="no-messages">No messages yet.</div>';
        return;
    }

    messagesList.innerHTML = messages.map(msg => `
        <div class="message-card ${msg.read ? 'read' : 'unread'}">
            <div class="message-header">
                <div>
                    <strong>${msg.name}</strong>
                    <span class="message-email">${msg.email}</span>
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
        const response = await fetch(`/api/messages?id=${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) loadMessages();
    } catch (error) {
        alert('Error updating message');
    }
}

async function deleteMessage(id) {
    if (confirm('Are you sure you want to delete this message?')) {
        try {
            const response = await fetch(`/api/messages?id=${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.ok) loadMessages();
        } catch (error) {
            alert('Error deleting message');
        }
    }
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('adminLoggedIn');
        window.location.href = 'index.html';
    }
}

// Check if admin is logged in
function checkAuth() {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
        window.location.href = 'index.html';
    }
}

// Initialize
checkAuth();
loadMessages();

// Refresh messages every 30 seconds
setInterval(loadMessages, 30000);
