import { MongoDataSource } from "apollo-datasource-mongodb";

export default class Users extends MongoDataSource {
    constructor(collection) {
        super(collection)
        this._createIndex()
    }

    async create(user) {
        user.updatedAt = new Date()
        await this.collection.insertOne(user)
        return user
    }

    search(term) {
        return this.collection.find({ $text: { $search: term } }).toArray()
    }

    async _createIndex() {
        await this.collection.createIndex({
            firstName: 'text',
            lastName: 'text',
            username: 'text'
        })
    }
}