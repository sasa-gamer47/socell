// apis change v1.0.0
import dbConnect from '../../../../utils/dbConnect'
import Post from '../../../../models/Post'

dbConnect()

export default async (req, res) => {
    const { method, query: { tag } } = req

    console.log(method)

    switch (method) {
        case 'GET':
            try {
                const tags = []
                const posts = await Post.find({})

                for (let i = 0; i < posts.length; i++) {
                    for (let j = 0; j < posts[i].tags.length; j++) {
                        if (tags.indexOf(posts[i].tags[j]) === -1) {
                            tags.push(posts[i].tags[j])
                        }
                    }
                }

                res.status(200).json({ success: true, data: tags })
                console.log(tags);
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
