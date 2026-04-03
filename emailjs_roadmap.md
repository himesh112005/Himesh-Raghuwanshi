# 📧 EmailJS Setup Roadmap

To make your contact form send real emails to your inbox, follow this simple roadmap to configure **EmailJS**.

---

### Step 1: Create an EmailJS Account
1.  Go to [EmailJS.com](https://www.emailjs.com/) and click **Sign Up Free**.
2.  Once logged in, you'll see the **Email Services** tab.

### Step 2: Add an Email Service
1.  Click **Add New Service**.
2.  Choose your provider (e.g., **Gmail**, Outlook, or iCloud).
3.  Connect your account and name the service (e.g., `primary_gmail`).
4.  Copy the **Service ID** (e.g., `service_abc123`).

### Step 3: Create an Email Template
1.  Go to the **Email Templates** tab.
2.  Click **Create New Template**.
3.  Configure the **Subject** and **Content**. Use the following placeholders to match your form:
    *   `{{from_name}}`: Sender's name
    *   `{{from_email}}`: Sender's email
    *   `{{message}}`: The actual message
    *   `{{to_name}}`: Your name (e.g., Himesh)
4.  **Save** the template and copy its **Template ID** (e.g., `template_xyz456`).

### Step 4: Get Your Public Key
1.  Go to the **Account** tab in the sidebar.
2.  On the **API Keys** page, copy your **Public Key**.

---

### Step 5: Update the Code (`js/index.js`)

Now, go back to your code and fill in the values you copied:

1.  **Initialize at the top**:
    ```javascript
    // Lines 1-4
    (function() {
        emailjs.init("YOUR_PUBLIC_KEY"); // Paste your Public Key here
    })();
    ```

2.  **Fill the send function**:
    ```javascript
    // Around line 498
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
        from_name: name,
        from_email: email,
        message: message,
        to_name: "Himesh",
        reply_to: email
    })
    ```

---

### ✅ Checklist
- [ ] Account Created
- [ ] Email Service Connected
- [ ] Template Built using `{{from_name}}` and `{{message}}`
- [ ] Public Key initialized in `js/index.js`
- [ ] Code uncommented in `js/index.js`

> [!TIP]
> You can test your template directly in the EmailJS dashboard before updating the code to ensure it looks exactly how you want!
