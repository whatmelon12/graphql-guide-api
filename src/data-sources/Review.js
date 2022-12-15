import { MongoDataSource } from "apollo-datasource-mongodb";

export default class Reviews extends MongoDataSource {
    all() {
        return this.collection.find().toArray();
    }

    async create(review) {
        review.updatedAt = new Date()
        await this.collection.insertOne(review);
        return review;
    }
}