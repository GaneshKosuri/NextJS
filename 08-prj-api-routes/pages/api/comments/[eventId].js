import { connectDatabase, insertDocument, getAllDocuments } from '../../../helpers/db-utils.js'

async function handler(req, res) {
    const eventId = req.query.eventId
    let client;

    try {
        client = await connectDatabase()
    } catch (error) {
        res.status(500).json({ message: 'Database conection failed' })
        return;
    }

    if (req.method === 'POST') {
        const { email, name, text } = req.body
        if (!email || !email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
            res.status(422).json({ message: 'Invalid input' })
            client.close()
            return
        }
        const newComment = {
            name,
            email,
            text,
            eventId
        }

        let result;
        try {
            result = await insertDocument(client, 'comments', newComment)
            newComment._id = result.insertedId
            res.status(201).json({ message: 'Commented Added Successfully', comment: newComment })
        } catch (error) {
            res.status(500).json({ message: 'Inserting comment failed' })
            return
        }
    } else if (req.method === 'GET') {
        const params = {
            client,
            collectionName: 'comments',
            findBy: { eventId },
            sortBy: { _id: -1 }
        }
        let comments;

        try {
            comments = await getAllDocuments(params)
            res.status(200).json({ comments })
        } catch (error) {
            res.status(500).json({ message: 'Getting comments failed' })
            return
        }

    }

    client.close()
}

export default handler