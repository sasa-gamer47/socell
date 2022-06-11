// apis change v1.0.0
import dbConnect from '../../../utils/dbConnect'
import Comment from '../../../models/Comment'
import Post from '../../../models/Post'

dbConnect()

export default async (req, res) => {
    const {
        method,
        query: { id },
    } = req

    console.log(method)

    switch (method) {
        case 'GET':
        try {
            const comment = await Comment.findById(id)
            res.status(200).json({ success: true, data: comment })
        } catch (error) {
            console.log(error)
            res.status(400).json({ error: error.message })
        }
            break
        case 'PUT':
            try {
                console.log(req.body);

                const comment = await Comment.findByIdAndUpdate(req.body.id, {
                    $set: {
                        content: req.body.content,
                        replies: req.body.replies,
                        repliesCount: req.body.repliesCount,
                    },
                })

                console.log('updated comment body');
                console.log(req.body);
                res.status(200).json({ success: true, data: comment })
            } catch (error) {
                console.log(error)
                res.status(400).json({ error: error.message })
            }
            break
        case 'DELETE':
        try {
            const comment = await Comment.deleteOne({ _id: id })

            // console.log('------');

            // console.log(comment._id);

            // const test = await Post.findByIdAndUpdate(req.body.post, {
            //     $pull: {
            //         comments: comment._id,
            //     },
            // })
            // console.log('__________________________');
            // console.log('test: ', test)

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
