import { AuthenticationError, ForbiddenError } from "apollo-server"
import { addDays, differenceInDays } from "date-fns"

export default {
    Query: {
        me: (_, __, context) => context.user,
        user: (_, { id }, { dataSources }) => dataSources.users.findOneById(id),
        searchUsers: (_, { term }, { dataSources }) => dataSources.users.search(term)
    },

    UserResult: {
        __resolveType: result => {
            if (result.deletedAt) {
                return 'DeletedUser'
            } else if (result.suspendedAt) {
                return 'SuspendedUser'
            } else {
                return 'User'
            }
        }
    },

    SuspendedUser: {
        daysLeft: user => {
            const end = addDays(user.suspendedAt, user.durationInDays)
            return differenceInDays(end, new Date())
        }
    },

    User: {
        id: ({ _id }) => _id,
        email: (user, _, { user: currentUser }) => {
            if (!currentUser || !user._id.equals(currentUser._id)) {
                throw new ForbiddenError(`cannot access others' emails`)
            }
            return user.email
        },
        photo(user) {
            const githubId = user.authId.split('|')[1]
            return `https://avatars.githubusercontent.com/u/${githubId}`
        },
        createdAt: user => user._id.getTimestamp()
    },

    Mutation: {
        createUser(_, { user, secretKey }, { dataSources }) {
            if (secretKey !== process.env.SECRET_KEY) {
                throw new AuthenticationError('wrong secretKey')
            }

            return dataSources.users.create(user)
        }
    }
}