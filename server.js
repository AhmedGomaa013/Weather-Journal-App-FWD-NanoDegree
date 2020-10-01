// Setup empty JS object to act as endpoint for all routes
const projectData = [];

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require("body-parser");
const cors = require("cors");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 800;
app.listen(port,function(){
    console.log(`Running on port:${port}`);
});

//Endpoints
app.get('/',function(req,res){
    res.sendFile('website/index.html');
});

app.post('/entry',function(req,res){
    projectData.push(req.body);
    res.sendStatus(201);
});

app.get('/all',function(req,res){
    let index = projectData.length -1;
    res.send(projectData[index]);
});