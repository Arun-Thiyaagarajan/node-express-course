import { StatusCodes } from "http-status-codes";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import CustomErrors from '../errors/index.js';
import { v2 } from 'cloudinary';
import fs from 'fs';

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadProductImageLocal = async (req, res) => {
    if (!req.files) {
        throw new CustomErrors.BadRequestError('No file uploaded');
    }
    const productImage = req.files.image;

    if (!productImage.mimetype.startsWith('image/')) {
        throw new CustomErrors.BadRequestError('Invalid file type. Only images are allowed');
    }

    const maxSize = 1024;
    if (productImage.size > maxSize) {
        throw new CustomErrors.BadRequestError('Image size exceeds the maximum limit of 1MB');
    }

    const imagePath = join(__dirname, '../public/uploads/' + `${productImage.name}`);
    await productImage.mv(imagePath);
    res.status(StatusCodes.OK).json({image: {src: `/uploads/${productImage.name}`}});
}

const uploadProductImage = async (req, res) => {
    const result = await v2.uploader.upload(req.files.image.tempFilePath, {
        use_filename: true,
        folder: '07-file-upload'
    });
    fs.unlinkSync(req.files.image.tempFilePath); // delete the temporary file
    res.status(StatusCodes.OK).json({image: {src: result.secure_url}});
}

export default uploadProductImage;