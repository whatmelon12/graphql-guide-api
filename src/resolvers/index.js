const resolvers = {
    Query: {
        hello: () => 'Hello World!',
        isoString: (_, { date }) => date.toISOString()
    }
}
import Date from './Date'
import Review from './Review'
import User from './User'
export default [resolvers, Review, User, Date]