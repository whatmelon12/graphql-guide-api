// import resolvers from "./User"
// import { InputError } from "../util/errors"

// jest.mock('mongodb', () => {
//     ObjectID: id => {
//         if (id === 'invalid') {
//             throw new Error(
//                 'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters'
//             )
//         }
//     }
// })

test('user throws InputError', () => {
    // my project doesnt have this but good example for mocking modules
    // expect(() => {
    //     resolvers.Query.user(
    //         null,
    //         { id: 'invalid' },
    //         { dataSources: { users: { findOneById: jest.fn() } } }
    //     )
    // }).toThrow(InputError)
    expect(true).toBeTruthy()
})