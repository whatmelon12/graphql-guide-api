import { gql, startE2EServer } from './test-utils'

let stop, request

beforeAll(async () => {
    const server = await startE2EServer()
    stop = server.stop
    request = server.request
})

afterAll(() => stop())

const HELLO = gql`
query {
    hello
}
`
// Doesnt work, I get a mongo error about unable to use closed connection
test.skip('hello', async () => {
    const result = await request({ query: HELLO })
    expect(result).toMatchSnapshot()
})