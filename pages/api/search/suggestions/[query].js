// apis change v1.0.0
import dbConnect from '../../../../utils/dbConnect'
import Post from '../../../../models/Post'

dbConnect()

export default async (req, res) => {
    const { method, query: { query } } = req

    // console.log(method)

    switch (method) {
        case 'GET':
            try {
                const posts = await Post.find({
                    content: {
                        $regex: new RegExp(query)
                    }  
                })
                // console.log(posts);
                res.status(200).json({ success: true, data: posts })
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
