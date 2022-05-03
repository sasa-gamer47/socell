const cloudinary = require('cloudinary').v2


export default async (req, res) => {
        console.log('fetching...');
    console.log('req: ', req.body);
    cloudinary.config({
        cloud_name: 'dzq0qjvxg',
        api_key: '91789788989898',
        api_secret: 'fuPTAZ6whNJkG6CBilru3IeoAJ0',
    })

    try {
        const result = await cloudinary.uploader.upload(req.name, {
            use_filename: true,
            unique_filename: false,
        })
        console.log('result: ', result);
        const data = result.json()
        console.log('data: ', data || null);
        
    } catch (error) {
        console.log('upload error: ', error);
    }

    res.json({'success': true, data: data || null })
}