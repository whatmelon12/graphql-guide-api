import { ForbiddenError, UserInputError } from "apollo-server";
import { isEmpty } from "lodash";
import { InputError } from "../util/errors";
import { pubsub } from "../util/pubsub";

const MIN_REVIEW_LENGTH = 10;
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

            const errors = {}

            if (review.text.length < MIN_REVIEW_LENGTH) {
                errors.text = `text must be at least ${MIN_REVIEW_LENGTH} characters`
            }

            if (review.stars && !VALID_STARS.includes(review.stars)) {
                errors.stars = `stars must be bewteen 0 and 5`
            }

            if (!isEmpty(errors)) {
                throw new InputError({ review: errors })
            }

            dataSources.reviews.create(review)
            pubsub.publish('reviewCreated', { reviewCreated: review })
            return review
        }
    },
    Subscription: {
        reviewCreated: {
            subscribe: () => pubsub.asyncIterator('reviewCreated')
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