import dbConnect from '../../../utils/dbConnect'
import Post from '../../../models/Post'
import Comment from '../../../models/Comment'



dbConnect()

export default async (req, res) => {
    const { method } = req

    // console.log(method)

    switch (method) {
        case 'GET':
        try {
            const comments = await Comment.find({})
            res.status(200).json({ success: true, data: comments })
        } catch (error) {
            console.log(error)
            res.status(400).json({ error: error.message })
        }

        break
        case 'POST':
        try {
            const comment = await Comment.create(req.body)
            // console.log('------');

            // console.log(comment._id);


            const test = await Post.findByIdAndUpdate(req.body.post, {
                $push: {
                    comments: comment._id,
                },
            })
            // console.log('__________________________');
            // console.log('test: ', test)
            res.status(201).json({ success: true, data: comment })
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
