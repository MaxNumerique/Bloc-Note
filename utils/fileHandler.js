const fs = require('fs');
const path = require('path');


// PATH TO JSON FILE
const DATA_FILE = path.join(__dirname, '../notes.json');
console.log(DATA_FILE);


// READ FILE
const readNotes = () => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.log('error reading file : ', error);
        return [];
    }
};

// WRITE DATA IN JSON FILE

const writeNotes = (data) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    } catch (error) {
        console.log('error writing file : ', error);
    }
};

module.exports = { readNotes, writeNotes };