const express = require('express');

const app = express();

// authenticate user
app.post('/signin', (req, res) => {
    const { email, password } = req.body;
})

// register new user
app.post('/register', (req, res) => {
    const { email, username, password } = req.body;
})

// get profile (name) + entry
app.get('/profile/:id', (req, res) => {
    const { id } = req.params();
})

// update face recoginition usage
app.post('/image', (req, res) => {
    const { id } = req.body;
})

app.listen('3000');