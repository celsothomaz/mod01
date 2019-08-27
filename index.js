const express = require('express');

const server = express();

server.use(express.json());

const users = ['Malu', 'Ozzy', 'Chico', 'Kakau'];

function checkUserExists( req, res, next){
    if (!req.body.name){
        return res.status(400).json({ error: 'User name is required'});
    }
    return next();
}

function checkIndexValid( req, res, next){
    console.log req.params.index;
    
    if (!req.params.index){
        return res.status(400).json({ error: 'User index is required'});
    }
    if (req.params.index > (users.length - 1)){
        return res.status(400).json({ error: 'Index not valid'});
    }
    return next();
}

server.use((req, res, next) => {
    next();
});

server.get('/users', (req, res) => {
    return res.json(users);
});

server.get('/users/:index', checkIndexValid, (req, res) => {
    const { index } = req.params;
    return res.json(users[index]);
});

server.post('/users', checkUserExists, (req, res) =>{
    const { name } = req.body;
    users.push(name);
    return res.json(users);
});

server.put('/users/:index', checkUserExists, checkIndexValid, (req, res) =>{
    const { index } = req.params;
    const { name } = req.body;
    users[index] = name;
    return res.json(users);
});

server.delete('/users/:index', checkIndexValid, (req, res) => {
    const { index } = req.params;
    users.splice(index, 1);
});

server.listen(3000);

