import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary'; 
import cloudinary from '../config/cloudinary.js';

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'keyXchange/products',
        allowed_formats: ['jpg', 'png', 'jpeg', 'pdf', 'doc', 'txt', 'zip'],
    },
});  

const upload = multer({ storage });

export default upload;
