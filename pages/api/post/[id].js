// apis change v1.0.0
import dbConnect from '../../../utils/dbConnect'
import Post from '../../../models/Post'

dbConnect()

export default async (req, res) => {
    const { method, query: { id } } = req

    console.log(method)

    switch (method) {
        case 'GET':
            try {
                const post = await Post.findById(id)
                res.status(200).json({ success: true, data: post })
            } catch (error) {
                console.log(error)
                res.status(400).json({ error: error.message })
            }
            break
        case 'DELETE':
            try {
                const post = await Post.deleteOne({ _id: id })
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
