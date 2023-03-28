// ./src/block.js
// * Contains the class definition for a single block.

// * Imports
const crypto = require("crypto"); // Used for encryption algorithms; Built-in
// Define a SHA256 hash function from our crypto library
function SHA256(message) {
    return crypto
        .createHash("sha256") // Set the hashing algorithm to SHA256
        .update(message) // Update the hash with the message
        .digest("hex"); // Return the hash as a hexadecimal string
}

class Block {
    constructor(prevHash = "", transactions = []) {
        this.timestamp = Date.now();
        this.transactions = transactions;
        this.prevHash = prevHash;
        this.hash = this.getHash();
        this.nonce = 0;

        // Mine the block
        this.mine();
    }

    // Returns the hash of the current block
    getHash() {
        let txStr = "";
        for (let i = 0; i < this.transactions.length; i++) {
            txStr += JSON.stringify(this.transactions[i]);
        }

        return SHA256 (
            this.prevHash +
            this.timestamp +
            txStr +
            this.nonce
        );
    }

    // Mine a new block (generate a hash that works)
    mine() {
        // Create a string to check if the current hash has the number of 0s in front as necessary
        let checkString = Array(global.difficulty + 1).join("0");

        // Keep track of tries
        let tries = 0;
        while (!this.hash.startsWith(checkString)) {
            // Need to change nonce and try hashing again
            this.nonce++;
            this.hash = this.getHash();

            // Increment number of tries
            tries++;
        }
        // Print the number of tries and the hash
        console.log(`Block mined with ${tries} attempts. Hash: ${this.hash}`);
    }


    // Pretty prints the block
    prettify() {
        let blockStr = `<div><b>Block</b> #${this.hash}</div>`;
        blockStr += `<div><b>Timestamp:</b> ${this.timestamp}</div>`;
        blockStr += `<div><b>Previous Hash:</b> ${this.prevHash}</div>`;

        blockStr = "<div><b>Transactions:</b></div><div>"

        for (let i=0; i < this.transactions.length; i++) {
            blockStr += "  " + this.transactions[i].prettify();

        }
        blockStr += "</div>";

        return blockStr;
    }
}

// Export this object to be used elsewhere
module.exports = Block;
