const express = require('express');
const app = express();
const PORT = 3000;

// Middleware 
app.use(express.json());

// Sample data (acts as a database)
let items = [
    { id: 1, name: 'nagapriya' },
    { id: 2, name: 'Item 2' },
];



// 1. Get all items
app.get('/api/items', (req, res) => {
    res.json(items);
});

// 2. Get 
app.get('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = items.find((item) => item.id === id);

    if (!item) {
        return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
});

//  post 
app.post('/api/items', (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }

    const newItem = {
        id: items.length + 1,
        name,
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

// 4. put an existing item
app.put('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    const item = items.find((item) => item.id === id);

    if (!item) {
        return res.status(404).json({ message: 'Item not found' });
    }

    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }

    item.name = name;
    res.json(item);
});

// Delete 
app.delete('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = items.findIndex((item) => item.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Item not found' });
    }

    items.splice(index, 1);
    res.json({ message: 'Item deleted successfully' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
