// apis change v1.0.0
import dbConnect from '../../../../utils/dbConnect'
import Comment from '../../../../models/Comment'

dbConnect()

export default async (req, res) => {
    const {
        method,
        query: { postId },
    } = req

    console.log(method)

    switch (method) {
        case 'GET':
        try {
            const comment = await Comment.find({ post: postId})
            res.status(200).json({ success: true, data: comment })
        } catch (error) {
            console.log(error)
            res.status(400).json({ error: error.message })
        }
        break
        case 'DELETE':
        try {
            const comment = await Comment.deleteOne({ _id: id })
            res.status(200).json({ success: true, data: {} })
        } catch (error) {
            console.log(error)
            res.status(400).json({ error: error.message })
        }
        default:
        res.status(400).json({ message: 'Method not allowed' })
        break
    }
}
