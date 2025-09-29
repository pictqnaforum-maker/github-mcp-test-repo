// Test file for CodeQL scanning
const express = require('express');
const app = express();

// Potential security issues for testing CodeQL
app.get('/user/:id', (req, res) => {
    // SQL Injection vulnerability (example)
    const query = "SELECT * FROM users WHERE id = " + req.params.id;
    res.json({ query: query });
});

// XSS vulnerability example
app.get('/search', (req, res) => {
    const searchTerm = req.query.q;
    res.send(`<h1>Results for: ${searchTerm}</h1>`);
});

// Command injection example
const { exec } = require('child_process');
app.post('/ping', (req, res) => {
    const host = req.body.host;
    exec(`ping -c 1 ${host}`, (error, stdout) => {
        res.send(stdout);
    });
});

module.exports = app;
