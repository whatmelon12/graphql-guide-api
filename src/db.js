import { MongoClient } from 'mongodb';

export let db;

const uri = 'mongodb://localhost:27017/guide';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(e => {
    if (e) {
        console.error(`Failed to connect to MongoDB at ${uri}`, e);
        return;
    }
    db = client.db();
});