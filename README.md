<<<<<<< HEAD
=======
<<<<<<< HEAD
# It is created By Shri Himesh Raghuwanshi
# All right are Reserve

# you can check it on https://himesh-raghuwanshi.vercel.app/
=======
>>>>>>> 234a8fb
# Portfolio Admin Dashboard

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
npm start
```

The server will run on port 3000.

## Accessing from Another Laptop

### Step 1: Find Your IP Address

**Windows:**
```bash
ipconfig
```
Look for "IPv4 Address" (e.g., 192.168.1.100)

**Mac/Linux:**
```bash
ifconfig
```

### Step 2: Configure Firewall

**Windows Firewall:**
1. Open Windows Defender Firewall
2. Click "Advanced settings"
3. Click "Inbound Rules" → "New Rule"
4. Choose "Port" → Next
5. Enter port 3000 → Next
6. Allow the connection → Next
7. Apply to all profiles → Next
8. Name it "Portfolio Server" → Finish

### Step 3: Access from Friend's Laptop

On your friend's laptop, open browser and go to:
```
http://YOUR_IP_ADDRESS:3000/admin.html
```

Example: `http://192.168.1.100:3000/admin.html`

## For Internet Access (Not Just Local Network)

### Option 1: ngrok (Easiest)
```bash
# Install ngrok
npm install -g ngrok

# Start ngrok
ngrok http 3000
```
Share the ngrok URL with your friend.

### Option 2: Port Forwarding
1. Login to your router (usually 192.168.1.1)
2. Find "Port Forwarding" settings
3. Forward external port 3000 to your computer's IP:3000
4. Share your public IP (google "what is my ip")
5. Friend accesses: `http://YOUR_PUBLIC_IP:3000/admin.html`

## Security Notes

- Change the default admin authentication
- Use HTTPS in production
- Don't expose to internet without proper security
- Consider using a service like Heroku, Vercel, or Railway for hosting
<<<<<<< HEAD
=======
>>>>>>> 18d64ab (Add Vercel serverless functions)
>>>>>>> 234a8fb
