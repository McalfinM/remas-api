import cloudinary from 'cloudinary'
const cloud = cloudinary.v2
const cloudinaryConfig = cloud.config({
    cloud_name: 'dcyohew0h',
    api_key: '161487929687464',
    api_secret: 'Qlx_eILvPrRABcC6AywbhsSuNe0'
})

export { cloudinaryConfig, cloud }