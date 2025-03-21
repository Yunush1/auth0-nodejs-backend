const emailTemplate = (user, token, verificationLink) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Our Service</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background: #ffffff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                text-align: center;
            }
            .header {
                background: #3498db;
                padding: 20px;
                color: white;
                font-size: 24px;
                font-weight: bold;
                border-radius: 10px 10px 0 0;
            }
            .content {
                padding: 20px;
                color: #333;
            }
            .token-box {
                background: #ecf0f1;
                padding: 15px;
                margin: 20px auto;
                font-size: 18px;
                font-weight: bold;
                color: #2c3e50;
                border-left: 5px solid #3498db;
                display: inline-block;
            }
            .btn {
                display: inline-block;
                margin-top: 20px;
                padding: 12px 20px;
                background: #3498db;
                color: white;
                text-decoration: none;
                font-size: 16px;
                border-radius: 5px;
            }
            .footer {
                margin-top: 20px;
                font-size: 12px;
                color: #888;
            }
        </style>
    </head>
    <body>

    <div class="container">
        <!-- Header -->
        <div class="header">
            Welcome to Our Service
        </div>

        <!-- Content -->
        <div class="content">
            <p>Hello <strong>${user.name || "User"}</strong>,</p>
            <p>Thank you for logging in! Below is your authentication token:</p>

            <!-- Authentication Token Box -->
            <div class="token-box">${token}</div>

            <p>For security reasons, do not share this token with anyone.</p>
            <p>If you did not request this login, please ignore this email or reset your password.</p>

            <!-- Optional Verification Button -->
         <!-- <a class="btn" href="${verificationLink}">Verify Your Account</a> -->
        </div>

        <!-- Footer -->
        <div class="footer">
            &copy; 2024 Our Service. All rights reserved. <br>
            If you have any issues, contact us at <a href="mailto:support@example.com">support@example.com</a>.
        </div>
    </div>

    </body>
    </html>
    `;
};

module.exports = emailTemplate