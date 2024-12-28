import { Router } from "express";
import { createProduct, getAllProducts } from '../controllers/productController.js'
import uploadProductImage from '../controllers/uploadsController.js'

const router = new Router();

router.route('/').post(createProduct).get(getAllProducts);
router.route('/uploads').post(uploadProductImage);

export default router;