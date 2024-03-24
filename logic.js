const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
/*
//***************** Doing the operations with an array ************************************
var todoList = []
router.get('/', (req, res) => {
    let todoListString = '';
    todoList.forEach((todo, index) => {
        todoListString += `Task ${index + 1}: ${todo.title}, Done: ${todo.isDone}\n`;
    });
    res.send(todoListString);
});

router.post('/', (req, res) => {
    const { title, isDone } = req.body;
    const id = uuidv4();

    todoList.push({ id, title, isDone });
    res.send(todoList);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const todo = todoList.find(todo => todo.id === id);
    if (!todo)
        res.status(404).send("No such task!");
    else res.send(todo)
});

router.put('/:id', (req, res) => {
    const { title, isDone } = req.body;
    const { id } = req.params;
    const index = todoList.findIndex(todo => todo.id === id);
    if (index == -1)
        res.status(404).send("No such task!");
    else {
        todoList[index].title = title
        todoList[index].isDone = isDone
        res.send(todoList[index]);
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const index = todoList.findIndex(todo => todo.id === id);
    if (index == -1)
        res.status(404).send("Not found");
    else {
        todoList.splice(index, 1);
        res.send("OK");
    }
});
*/
router.get('/', (req, res) => {
    fs.readFile('db.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        try {
            // Deserialize the JSON string to a JavaScript object
            const jsonObject = JSON.parse(jsonString);
            res.send(jsonObject);
        } catch (error) {
            console.error('Error parsing JSON string:', error);
        }
    });
});

//***************** Doing the operations with a file ************************************

router.post('/', (req, res) => {
    const { title, isDone } = req.body;
    const id = uuidv4();

    const jsonObject = {
        id: id,
        title: title,
        isDone: isDone
    };
    
    const jsonString = JSON.stringify(jsonObject, null, 2);

    // Write the JSON string to a file
    fs.appendFile('db.json', jsonString, 'utf8', (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        console.log('JSON object written to file successfully.');
    });
    res.send("success");
});
module.exports = router;
