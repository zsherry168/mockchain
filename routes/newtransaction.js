// ./routes/newtransaction.js
// * Creates a new mock transaction and adds it to the system.

// * Imports
const Transaction = require("../src/transaction");

function newtransaction(app) {
    // Create a new transaction
    app.get("/newtransaction", function (request, response) {
        let responseMsg = global.navbar;

        // Create a new transaction object
        let tx = new Transaction();

        // Add the transaction to the global transactions list
        global.transactions.push(tx);

        // Add the response message to our response
        responseMsg += `<p>Transaction added: ${tx.prettify()}</p>`;

        response.status(200).send(responseMsg);
    });
}

module.exports = newtransaction;
