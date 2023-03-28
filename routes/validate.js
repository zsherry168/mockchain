// ./routes/validate.js
// * The server validates the blockchain.

function validate(app) {
    // Validate the server's instance of a blockchain
    app.get("/validate", function (request, response) {
        let responseMsg = global.navbar;

        // Check the validity of the chain using isChainValid function
        let isValid = global.blockchain.isChainValid();

        // Create response
        if (isValid) {
            responseMsg += `<p>Blockchain is valid</p>`;
        } else {
            responseMsg += `<p>Blockcahin is not valid</p>`;
        }

        response.status(200).send(responseMsg);
    });
}

module.exports = validate;
