module.exports = `
type RandomDie {
    numSides: Int!
    rollOnce: Int!
    roll(numRolls: Int!): [Int]
  }
input MessageInput {
    content: String
    author: String
}

type Message {
    id: ID!
    content: String
    author: String
}

type Mutation {
    createMessage(input: MessageInput): Message
    updateMessage(id: ID!, input: MessageInput): Message
  }

type Query {
  getDie(numSides: Int): RandomDie
  hello: String
  quoteOfTheDay: String
  random: Float!
  rollThreeDice: [Int]
  rollDice(numDice: Int!, numSides: Int): [Int]
}
`;
