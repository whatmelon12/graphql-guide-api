const reviews = [];

export default {
    Query: {
        reviews: (_, __, { dataSources }) => dataSources.reviews.all()
    },
    Mutation: {
        createReview: (_, { review }, { dataSources }) => dataSources.reviews.create(review)
    },
    Review: {
        id: review => review._id,
        fullReview: review =>
            `Someone in the internet gave ${review.stars} stars, saying: "${review.text}"`,
        createdAt: review => review._id.getTimestamp(),
        updatedAt: review => review.updatedAt || resolvers.Review.createdAt(review)
    }
}