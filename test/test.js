const assert = require('assert');

const agent = require('supertest');
const server = require('../index');

const request = agent(server);

describe('test to graph server', () => {
    it('should return the object query from a post', async() => {
        const { body } = await request.post('/graphql')
            .set('Content-Type', 'application/json')
            .send({ query: `{
                hello
                quoteOfTheDay
                random
                rollThreeDice
            }` });
        assert(body.data.hello);
        assert(body.data.quoteOfTheDay);
        assert(body.data.random);
        assert(body.data.rollThreeDice);
    });

    it('should return the object query from a post', async() => {
        const { body } = await request.post('/graphql')
            .set('Content-Type', 'application/json')
            .send({ query: '{ hello }' });
        assert(body.data.hello);
    });

    it('should return the object query from a post', async() => {
        const dice = 3;
        const sides = 6;
        const { body } = await request.post('/graphql')
            .set('Content-Type', 'application/json')
            .send({
                query: `
                query RollDice($dice: Int!, $sides: Int) {
                    rollDice(numDice: $dice, numSides: $sides)
                  }`,
                variables: { dice, sides }
            });
        assert(body.data.rollDice.length === 3);
    });

    it('should return the object query from a post', async() => {
        const { body } = await request.post('/graphql')
            .set('Content-Type', 'application/json')
            .send({
                query: `{
                    getDie(numSides: 6) {
                      rollOnce
                      roll(numRolls: 3)
                    }
                  }`,
            });
        assert(body.data.getDie.rollOnce);
        assert(body.data.getDie.roll.length === 3);
    });

    it('should return the object query from a post', async() => {
        const { body } = await request.post('/graphql')
            .set('Content-Type', 'application/json')
            .send({
                query: `
                mutation {
                    createMessage(input: {
                      author: "andy",
                      content: "hope is a good thing",
                    }) {
                      id
                      content
                      author
                    }
                  }`,
            });
        assert(body.data.createMessage.id);
        assert(body.data.createMessage.content);
        assert(body.data.createMessage.author);
    });
});
