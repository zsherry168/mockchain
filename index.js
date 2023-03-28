// ./index.js
// * Imports
const express = require("express"); // Imports Express's class definition
const morgan = require("morgan"); // Imports Morgan's class definition
// Imports from our class modules
const Blockchain = require("./src/blockchain");

// Global variables
global.difficulty = 5;  // Target number of 0s
global.blockchain = new Blockchain();   // Creating a blockchain instance
global.transactions = [];   // Creating empty transaction list

// Create an express app
const app = express();

// Use morgan again for logging
app.use(morgan("dev"));

// Port to listen on
const port = 8080;

global.navbar = `<div>
<a href="http://localhost:${port}/">
    <button type="button">Home</button>
</a>
<a href="http://localhost:${port}/mine">
    <button type="button">Mine</button>
</a>
<a href="http://localhost:${port}/newtransaction">
    <button type="button">New Transaction</button>
</a>
<a href="http://localhost:${port}/listtransactions">
    <button type="button">List Transactions</button>
</a>
<a href="http://localhost:${port}/validate">
    <button type="button">Validate</button>
</a>
<a href="http://localhost:${port}/brew">
    <button type="button">Brew coffee</button>
</a>
<br>
</div>`;

// Dynamically load all routes with DLR
require("./routes/dlr.js")(app);

// Configure and run the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}/`)
})

