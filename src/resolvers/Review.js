import { ForbiddenError, UserInputError } from "apollo-server";

const MIN_REVIEW_LENGTH = 2;
const VALID_STARS = [0, 1, 2, 3, 4, 5];

export default {
    Query: {
        reviews: (_, __, { dataSources }) => dataSources.reviews.all()
    },
    Mutation: {
        createReview: (_, { review }, { dataSources, user }) => {
            if (!user) {
                throw new ForbiddenError('mut be logged in')
            }

            if (review.text.length < MIN_REVIEW_LENGTH) {
                throw new UserInputError(
                    `text must be at least ${MIN_REVIEW_LENGTH} characters`,
                    { invalidArgs: ['text'] }
                )
            }

            if (review.stars && !VALID_STARS.includes(review.stars)) {
                throw new UserInputError(
                    `stars must be bewteen 0 and 5`,
                    { invalidArgs: ['stars'] }
                )
            }

            dataSources.reviews.create(review)
        }
    },
    Review: {
        id: review => review._id,
        author: (review, _, { dataSources }) => dataSources.users.findOneById(review.authorId),
        fullReview: async (review, _, { dataSources }) => {
            const author = await dataSources.users.findOneById(review.authorId)
            return `${author.firstName} ${author.lastName} gave ${review.stars} stars, saying: "${review.text}"`
        },
        createdAt: review => review._id.getTimestamp(),
        updatedAt: review => review.updatedAt || resolvers.Review.createdAt(review)
    }
}