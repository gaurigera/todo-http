const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { error, log } = require('console');
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

//***************** Doing the operations with a file ************************************
router.get('/', (req, res) => {
    fs.readFile('db.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(400).send("Error parsing")
            return;
        }

        try {
            // Deserialize the JSON string to a JavaScript object
            const jsonObject = JSON.parse(jsonString);
            res.send(jsonObject);
        } catch (error) {
            console.error('Error parsing JSON string:', error);
            res.status(400).send("Error parsing")
        }
    });
});

router.get('/:id', (req, res) => {
    fs.readFile('db.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(400).send("Error parsing")
            return;
        }

        try {
            const jsonObject = JSON.parse(jsonString);

            for (const curr of jsonObject) {
                if (curr.id == req.params.id)
                    res.send(curr);
            }
        } catch (error) {
            console.error('Error parsing JSON string:', error);
            res.status(400).send("Error parsing")
        }
    });
});

router.put('/:id', (req, res) => {
    const { title, isDone } = req.body;

    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send("Error!");
            return;
        }

        try {
            const existingData = JSON.parse(data);
            let ind = existingData.findIndex(curr => curr.id == req.params.id);
            if (ind === -1) throw error
            existingData[ind].title = title;
            existingData[ind].isDone = isDone;

            const updatedDataString = JSON.stringify(existingData);
            fs.writeFile('db.json', updatedDataString, 'utf8', (err) => {
                if (err) {
                    console.log(err.message);
                }
                console.log("Written to the file with updates");
            })
            res.send("Updated")
        } catch (error) {
            console.error('Not found in file:');
            res.status(404).send("Not found!");
        }
    });
});

router.post('/', (req, res) => {
    const { title, isDone } = req.body;
    const id = uuidv4();

    const jsonObject = {
        id: id,
        title: title,
        isDone: isDone
    };

    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        try {
            // Parse JSON string into a JavaScript object
            const existingData = JSON.parse(data);

            // Modify the JavaScript object 
            existingData.push(jsonObject);

            // Serialize the modified object back to a JSON string
            const updatedDataString = JSON.stringify(existingData, null, 2);

            // Append the JSON string to the file
            fs.writeFile('db.json', updatedDataString, 'utf8', (err) => {
                if (err) {
                    console.error('Error appending to file:', err);
                    return;
                }
                console.log('Data appended to file successfully.');
                res.send("OK");
            });
        } catch (error) {
            console.error('Error parsing JSON string:', error);
            res.status(404).send("Error parsing")
        }
    });
});

router.delete('/:id', (req, res) => {
    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send("Error!");
            return;
        }

        try {
            const existingData = JSON.parse(data);
            let ind = existingData.findIndex(curr => curr.id == req.params.id);
            if (ind === -1) throw error
            existingData.splice(ind, 1);
            const updatedDataString = JSON.stringify(existingData);
            fs.writeFile('db.json', updatedDataString, 'utf8', (err) => {
                console.log("Problem occured");
            })
            res.send("Deleted")
        } catch (error) {
            console.error('Not found in file:');
            res.status(404).send("Not found!");
        }
    });
});

module.exports = router;
