// Test file for CodeQL scanning - contains intentional vulnerabilities for testing
const express = require('express');
const { exec } = require('child_process');
const app = express();

// Enable JSON parsing
app.use(express.json());

// SQL Injection vulnerability (simulated)
app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    // Vulnerable: Direct string concatenation
    const query = "SELECT * FROM users WHERE id = " + userId;
    console.log("Executing query:", query);
    res.json({ 
        message: "User lookup", 
        query: query,
        userId: userId 
    });
});

// Cross-Site Scripting (XSS) vulnerability
app.get('/search', (req, res) => {
    const searchTerm = req.query.q || '';
    // Vulnerable: Unescaped user input in HTML
    const html = `
        <html>
            <body>
                <h1>Search Results</h1>
                <p>Results for: ${searchTerm}</p>
            </body>
        </html>
    `;
    res.send(html);
});

// Command Injection vulnerability
app.post('/ping', (req, res) => {
    const host = req.body.host || 'localhost';
    // Vulnerable: Unvalidated user input in shell command
    const command = `ping -c 1 ${host}`;
    
    exec(command, (error, stdout, stderr) => {
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        res.json({ 
            command: command,
            output: stdout,
            stderr: stderr 
        });
    });
});

// Path Traversal vulnerability
app.get('/file/:filename', (req, res) => {
    const filename = req.params.filename;
    // Vulnerable: No path validation
    const filePath = `./uploads/${filename}`;
    res.sendFile(filePath);
});

// Start server if run directly
if (require.main === module) {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Vulnerable test server running on port ${port}`);
    });
}

module.exports = app;
