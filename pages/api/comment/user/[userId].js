// apis change v1.0.0
import dbConnect from '../../../../utils/dbConnect'
import Comment from '../../../../models/Comment'

dbConnect()

export default async (req, res) => {
    const {
        method,
        query: { userId },
    } = req

    // console.log(method)

    switch (method) {
        case 'GET':
            try {
                const comments = await Comment.find({ user: userId })
                res.status(200).json({ success: true, data: comments })
                // console.log(comments);
            } catch (error) {
                console.log(error)
                res.status(400).json({ error: error.message })
            }
            break
        default:
        res.status(400).json({ message: 'Method not allowed' })
        break
    }
}
