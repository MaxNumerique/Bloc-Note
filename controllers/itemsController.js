const {readNotes, writeNotes} = require('../utils/fileHandler');

// Get all notes

const getNotes = (req, res) => {
    const data = readNotes();
    res.json(data);
}

// Get item by id

const getItemById = (req, res) => {
    const id = req.params.id;
    const data = readNotes();
    const item = data.find(item => item.id.toString() === id);
    if (!item) {
        return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
}

// Create item

const createItem = (req, res) => {
    const data = readNotes();
    const newItem = {
        id: data.length > 0 ? data[data.length - 1].id + 1 : 1, // Auto increment ID
        // Test Si l'ID existe déjà, on l'incrémente, sinon on le crée
        ...req.body
    };
    data.push(newItem);
    writeNotes(data);
    res.status(201).json(newItem);
}

// Delete item

const deleteItem = (req, res) => {
    const data = readNotes();
    const updatedData = data.filter(item => item.id.toString() !== req.params.id);
    if (updatedData.length === data.length) {
        return res.status(404).json({ error: 'Item not found' });
    }
    writeNotes(updatedData)
    res.json({ message: 'Item deleted' });
    console.log(`Item with ID ${req.params.id} deleted`);
    res.status(200).send(`Item with ID ${req.params.id} deleted`);
}

// Update item

const updateItem = (req, res) => {
    const data = readNotes();
    const ItemIndex = data.findIndex(item => item.id.toString() === req.params.id);
    if (ItemIndex === -1) {
        return res.status(404).json({ error: 'Item not found' });
    } else {
        data[ItemIndex] = {
            id: parseInt(req.params.id),
            ...req.body
        };
        writeNotes(data);
        res.json(data[ItemIndex]);
    }
}


module.exports = { getNotes, getItemById, createItem, deleteItem, updateItem };