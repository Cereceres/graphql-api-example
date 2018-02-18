// This class implements the RandomDie GraphQL type
const crypto = require('crypto');
class RandomDie {
    constructor(numSides) {
        this.numSides = numSides;
    }

    rollOnce() {
        return 1 + Math.floor(Math.random() * this.numSides);
    }

    roll({ numRolls }) {
        const output = [];
        for (let i = 0; i < numRolls; i++) {
            output.push(this.rollOnce());
        }
        return output;
    }
}
// If Message had any complex fields, we'd put them on this object.
class Message {
    constructor(id, { content, author }) {
        this.id = id;
        this.content = content;
        this.author = author;
    }
}

// Maps username to content
const fakeDatabase = {};
module.exports = {
    hello: () => 'Hello world!',
    quoteOfTheDay: () => Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within',
    random: () => Math.random(),
    rollThreeDice: () => [ 1, 2, 3 ].map((_) => 1 + Math.floor(Math.random() * 6)),
    rollDice({ numDice, numSides }) {
        const output = [];
        for (let i = 0; i < numDice; i++) output
            .push(1 + Math.floor(Math.random() * (numSides || 6)));

        return output;
    },
    getDie: ({ numSides }) => new RandomDie(numSides || 6),
    getMessage({ id }) {
        if (!fakeDatabase[id]) {
            throw new Error(`no message exists with id ${ id}`);
        }
        return new Message(id, fakeDatabase[id]);
    },
    createMessage({ input }, ctx) {
        console.log('ctx ', ctx.body);
        // Create a random id for our "database".
        const id = crypto.randomBytes(10).toString('hex');

        fakeDatabase[id] = input;
        return new Message(id, input);
    },
    updateMessage({ id, input }) {
        if (!fakeDatabase[id]) {
            throw new Error(`no message exists with id ${ id}`);
        }
        // This replaces all old data, but some apps might want partial update.
        fakeDatabase[id] = input;
        return new Message(id, input);
    },
};
