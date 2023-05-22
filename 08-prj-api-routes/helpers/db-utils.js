import { MongoClient } from 'mongodb'

export const connectDatabase = async () => {
    const client = await MongoClient.connect('mongodb+srv://ganeshkosuri:IFBiP8nfLxk2Tsy0@cluster0.c2bxomv.mongodb.net/events?retryWrites=true&w=majority')
    return client
}

export const insertDocument = async (client, collection, document) => {
    const db = client.db()
    return await db.collection(collection).insertOne(document)
}

export const getAllDocuments = async (props) => {
    const { client, collectionName, findBy, sortBy } = props
    const db = client.db()
    return await db.collection(collectionName).find(findBy).sort(sortBy).toArray()
}