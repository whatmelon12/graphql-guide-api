import {
    createTestServer,
    createTestClient,
    gql
} from 'test-utils'

const REVIEWS = gql`
query {
    reviews { 
        id
        text
        stars
        author {
            id
            firstName
            lastName
            username
            photo
            createdAt
            updatedAt 
        }
        createdAt
        updatedAt
    }
} 
`

test('reviews', async () => {
    const { server } = createTestServer()
    const { query } = createTestClient(server)
    const result = await query({ query: REVIEWS })
    expect(result).toMatchSnapshot()
})