// apis change v1.0.0
import dbConnect from '../../../../utils/dbConnect'
import Comment from '../../../../models/Comment'

dbConnect()

export default async (req, res) => {
    const {
        method,
        query: { commentId },
    } = req

    // console.log(method)

    switch (method) {
        case 'GET':
        try {
            const comment = await Comment.find({ comment: commentId })
            res.status(200).json({ success: true, data: comment })
        } catch (error) {
            console.log(error)
            res.status(400).json({ error: error.message })
        }
        break
        case 'POST':
        try {
            // console.log('likes num: ', req.body.likes)
            // console.log('postId: ', postId)
            // console.log('users: ', req.body.users)
            const comment = await Comment.findByIdAndUpdate(req.body.comment, {
                $set: {
                    likes: req.body.likes,
                    userHaveLiked: req.body.users,
                },
            })

            /*
                    const test = await Post.findByIdAndUpdate(postId, {const post = await Post.findByIdAndUpdate(postId, {
                        likes: req.body.likes,
                    }, function (err, post) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log('post: ', post)
                        }
                    })
                */

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
