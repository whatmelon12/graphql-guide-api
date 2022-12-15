const request = require('graphql-request').request;
const pick = require('lodash').pick;

const query = `
mutation createUserFromHook($user: CreateUserInput!, $secretKey: String!) {
    createUser(user: $user, secretKet: $secretKey) {
        id
    }
}`

module.exports = function (user, context, cb) {
    const secretKet = context.webtask.data.secretKet;
    const input = pick(user, 'username', 'email');
    input.authId = user.id;
    const variables = {
        user: input,
        secretKet
    }
    request('https://api.graphql.guide/graphql', query, variables).then(data => cb(null, data))
}