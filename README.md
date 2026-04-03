# Himesh Raghuwanshi Portfolio - Admin Dashboard

Professional portfolio website with a built-in admin dashboard to manage contact messages.

## ✨ Features
- **Dynamic Contact Form**: Automatically connects to the local server or production API (Vercel ready).
- **Email Notification Ready**: Pre-configured EmailJS integration (uncomment in `js/index.js` to enable).
- **Admin Panel**: Secure dashboard to view, mark as read, and delete messages.
- **Premium UI/UX**: Hover effects, smooth transitions, and real-time form validation.

## 🚀 Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server Locally
```bash
npm start
```
The server will run on [http://localhost:3000](http://localhost:3000).

### 3. Access the Admin Dashboard
- **URL**: [http://localhost:3000/login.html](http://localhost:3000/login.html)
- **Default Password**: `admin123` (Change this in `login.html`)

---

## 📱 Accessing from Another Device (Local Network)

### Step 1: Find Your IP Address
- **Windows**: Run `ipconfig` and find "IPv4 Address".
- **Mac/Linux**: Run `ifconfig` or `ip addr`.

### Step 2: Access via IP
On any device on the same Wi-Fi, open:  
`http://YOUR_IP_ADDRESS:3000`

---

## 🌐 Production Deployment (Vercel)

1. Connect your GitHub repository to Vercel.
2. The project is pre-configured with `vercel.json` and `api/` serverless functions.
3. Your contact form will automatically use the production URL.

---

## 📧 Enabling Email Notifications (Optional)
To receive emails directly when someone fills the form:
1. Go to [EmailJS](https://www.emailjs.com/) and create a free account.
2. Get your **Service ID**, **Template ID**, and **Public Key**.
3. Open `js/index.js` and find the `EmailJS` section in `handleContactSubmit`.
4. Uncomment the code and paste your keys.

---

## 🛠️ Security Notes
- Change the default admin password in `login.html`.
- For production, use HTTPS.
- Use a dedicated database like Supabase or MongoDB if you have thousands of messages (current setup uses `messages.json`).

Created by **Himesh Raghuwanshi**
