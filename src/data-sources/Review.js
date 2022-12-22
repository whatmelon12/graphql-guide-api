import { MongoDataSource } from "apollo-datasource-mongodb";

export default class Reviews extends MongoDataSource {
    all() {
        return this.collection.find().toArray();
    }

    async create(review) {
        review.authorId = this.context.user._id
        review.updatedAt = new Date()
        await this.collection.insertOne(review)
        return review
    }
}