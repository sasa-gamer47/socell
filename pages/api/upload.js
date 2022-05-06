const cloudinary = require('cloudinary').v2


export default async (req, res) => {
        console.log('fetching...');
    console.log('req: ', req.body);
    cloudinary.config({
        cloud_name: 'dcrsevgpq',
        api_key: '611918792535995',
        api_secret: 'fuPTAZ6whNJkG6CBilru3IeoAJ0',
    })

    console.log(req.path);
        // console.log(req.path.join(__dirname, '../../../public/images/' + req.body.fileName));

    try {
        const result = await cloudinary.uploader.upload(req.path, {
            use_filename: true,
            unique_filename: false,
        })
        console.log('result: ', result);
        const data = result.json()
        console.log('data: ', data);
        console.log('data: ', 'data || null');
        
    } catch (error) {
        console.log('upload error: ', error);
    }

    res.json({'success': true, data: data || null })
}