// apis change v1.0.0
import dbConnect from '../../../../utils/dbConnect'
import Post from '../../../../models/Post'

dbConnect()

export default async (req, res) => {
    const {
        method,
        query: { postId },
    } = req

    // console.log(method)

    switch (method) {
        case 'GET':
            try {
                const post = await Post.find({ post: postId})
                res.status(200).json({ success: true, data: post })
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
                const post = await Post.findByIdAndUpdate(req.body.post, {
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
