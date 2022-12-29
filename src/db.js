import { MongoClient } from 'mongodb';

export let db;

const URL = 'mongodb://localhost:27017/guide';

export const connectToDB = async () => {
    const client = new MongoClient(URL, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect()
    db = client.db()
    return client
    // client.connect(e => {
    //     if (e) {
    //         console.error(`Failed to connect to MongoDB at ${URL}`, e);
    //         return;
    //     }
    //     db = client.db();
    // });
}