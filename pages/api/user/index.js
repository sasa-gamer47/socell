import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';

// export default async function (req, res) => {
//     await dbConnect();

//     const {
//         name,
//         nickname,
//         given_name,
//         email,
//         email_verified,
//         locale,
//         picture,
//         updated_at
//     } = req.body;

//     const user = await User.findOne({ email });

//     if (user) {
//         return res.status(400).json({
//             message: 'User already exists'
//         });
//     }

//     const newUser = await User.create({
//         name,
//         nickname,
//         given_name,
//         email,
//         email_verified,
//         locale,
//         picture,
//         updated_at
//     });

//     return res.json(newUser);
// };
    

dbConnect()

export default async (req, res) => {


    const { method } = req

    console.log(method);

    switch (method) {
        case 'GET':
            try {
            const users = await User.find({})
            res.status(200).json({ success: true, data: users })
            } catch (error) {
            console.log(error)
            res.status(400).json({ error: error.message })
            }

            break
        case 'POST':
            try {
            const user = await User.create(req.body)
            res.status(201).json({ success: true, data: user })
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

// var request = require('request')

// var options = {
//   method: 'POST',
//   url: 'https://dev-mi1pn3d1.us.auth0.com/oauth/token',
//   headers: { 'content-type': 'application/json' },
//   body: '{"client_id":"NuqCNLHWJN2xqxUtPoqw3Pw1cLWlhYRl","client_secret":"lyBpfYV378WngrNXN01XW_GgF9c_332UB2Qwpgic-J0T2ts8r6dbWeR5o-OEgbk2","audience":"https://dev-mi1pn3d1.us.auth0.com/api/v2/","grant_type":"client_credentials"}',
// }

// request(options, function (error, response, body) {
//   if (error) throw new Error(error)

//   console.log(body)
// })