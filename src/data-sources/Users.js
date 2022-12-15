import { MongoDataSource } from "apollo-datasource-mongodb";

export default class Users extends MongoDataSource {
    async create(user) {
        user.updatedAt = new Date()
        await this.collection.insertOne(user)
        return user
    }
}