// Check authentication
if (localStorage.getItem('admin_logged_in') !== 'true') {
    window.location.href = 'login.html';
}

function logout() {
    localStorage.removeItem('admin_logged_in');
    window.location.href = 'login.html';
}

const API_URL = 'http://localhost:3000/api';

async function loadMessages() {
    try {
        const response = await fetch(`${API_URL}/messages`);
        const messages = await response.json();
        const container = document.getElementById('messagesList');
        
        // Load analytics
        loadAnalytics();

        if (messages.length === 0) {
            container.innerHTML = '<div class="empty-state">No messages yet</div>';
            return;
        }

        container.innerHTML = messages.map(msg => `
            <div class="message-card ${msg.status}">
                <div class="message-header">
                    <div class="sender-info">
                        <h3>${escapeHtml(msg.name)}</h3>
                        <div class="sender-email">${escapeHtml(msg.email)}</div>
                    </div>
                    <div class="message-date">${new Date(msg.date).toLocaleString()}</div>
                </div>
                <div class="message-body">
                    ${escapeHtml(msg.message)}
                </div>
                <div class="message-actions">
                    ${msg.status === 'unread' ? 
                        `<button onclick="markAsRead(${msg.id})" class="action-btn btn-read">Mark as Read</button>` : 
                        '<span style="color: #00ff88; margin-right: 10px; align-self: center;">✓ Read</span>'
                    }
                    <button onclick="deleteMessage(${msg.id})" class="action-btn btn-delete">Delete</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading messages:', error);
        document.getElementById('messagesList').innerHTML = '<div class="empty-state" style="color: red">Error loading messages. Is the server running?</div>';
    }
}

async function loadAnalytics() {
    try {
        const response = await fetch(`${API_URL}/analytics`);
        const data = await response.json();
        
        document.getElementById('totalMessages').textContent = data.totalMessages;
        document.getElementById('unreadMessages').textContent = data.unreadMessages;
        document.getElementById('messagesToday').textContent = data.messagesToday;
    } catch (error) {
        console.error('Error loading analytics:', error);
    }
}

async function markAsRead(id) {
    try {
        await fetch(`${API_URL}/messages/${id}/read`, { method: 'PUT' });
        loadMessages();
    } catch (error) {
        console.error('Error marking as read:', error);
        alert('Failed to update message status');
    }
}

async function deleteMessage(id) {
    if (confirm('Are you sure you want to delete this message?')) {
        try {
            await fetch(`${API_URL}/messages/${id}`, { method: 'DELETE' });
            loadMessages();
        } catch (error) {
            console.error('Error deleting message:', error);
            alert('Failed to delete message');
        }
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initial load
loadMessages();
