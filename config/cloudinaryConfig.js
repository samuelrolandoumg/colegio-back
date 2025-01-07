const {v2: cloudinary} = require('cloudinary');
require('dotenv').config();

cloudinary.config({
    cloud_name: 'du8d9j1tt', 
    api_key: '439628621875642',
    api_secret: 'BOsEQgh8B0_1L9SV_BEL1vq332w'
})

module.exports = cloudinary;