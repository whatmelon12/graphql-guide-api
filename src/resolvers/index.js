const resolvers = {
    Query: {
        hello: () => 'Hello World!',
        // isoString: (_, { date }) => date.toISOString()
    }
}
import Date from './Date'
import ObjID from './ObjID'
import Review from './Review'
import User from './User'
import Github from './Github'
export default [resolvers, Review, User, Github, Date, ObjID]