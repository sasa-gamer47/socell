import dbConnect from '../../../utils/dbConnect'
import Post from '../../../models/Post'
import User from '../../../models/User'

dbConnect()

export default async (req, res) => {
    const { method } = req

    // console.log(method)

    switch (method) {
        case 'GET':
        try {
            const posts = await Post.find({})
            res.status(200).json({ success: true, data: posts })
        } catch (error) {
            console.log(error)
            res.status(400).json({ error: error.message })
        }

        break
        case 'POST':
        try {
            const post = await Post.create(req.body)
            // console.log('------');

            // console.log(post._id);
            const test = await User.findByIdAndUpdate(req.body.user, {
                $push: {
                    posts: post._id
                }
            })
            // console.log('__________________________');
            // console.log(test);
            res.status(201).json({ success: true, data: post })
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
