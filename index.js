const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'styles')));

// Middleware
const requestLogger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

const checkRequestBody = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: 'Request body cannot be empty' });
    }
    next();
};

app.use(requestLogger);

let items = [];
let outfits = [];
let users = [];

// Set view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
   
    res.send('Welcome to StyleKey!')
})

// Items Routes
app.get('/items', (req, res) => {
    res.render('items', { items });
});

app.post('/items', checkRequestBody, (req, res) => {
    const newItem = { id: Date.now().toString(), name: req.body.name };
    items.push(newItem);
    res.redirect('/items');
});

app.put('/items/:id', checkRequestBody, (req, res) => {
    const itemId = req.params.id;
    const updatedItem = { id: itemId, ...req.body };
    items = items.map(item => item.id === itemId ? updatedItem : item);
    res.json(updatedItem);
});

app.delete('/items/:id', (req, res) => {
    const itemId = req.params.id;
    items = items.filter(item => item.id !== itemId);
    res.status(204).send();
});

// Outfits Routes
app.get('/outfits', (req, res) => {
    res.render('outfits', { outfits });
});

app.post('/outfits', checkRequestBody, (req, res) => {
    const newOutfit = { id: Date.now().toString(), name: req.body.name };
    outfits.push(newOutfit);
    res.redirect('/outfits');
});

app.put('/outfits/:id', checkRequestBody, (req, res) => {
    const outfitId = req.params.id;
    const updatedOutfit = { id: outfitId, ...req.body };
    outfits = outfits.map(outfit => outfit.id === outfitId ? updatedOutfit : outfit);
    res.json(updatedOutfit);
});

app.delete('/outfits/:id', (req, res) => {
    const outfitId = req.params.id;
    outfits = outfits.filter(outfit => outfit.id !== outfitId);
    res.status(204).send();
});

// Users Routes
app.get('/users', (req, res) => {
    res.render('users', { users });
});

app.post('/users', checkRequestBody, (req, res) => {
    const newUser = { id: Date.now().toString(), name: req.body.name };
    users.push(newUser);
    res.redirect('/users');
});

app.put('/users/:id', checkRequestBody, (req, res) => {
    const userId = req.params.id;
    const updatedUser = { id: userId, ...req.body };
    users = users.map(user => user.id === userId ? updatedUser : user);
    res.json(updatedUser);
});

app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    users = users.filter(user => user.id !== userId);
    res.status(204).send();
});

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




