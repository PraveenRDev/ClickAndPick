import express from 'express'
const router = express.Router()
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/productController.js'
import { protect, adminOnly } from '../middleware/authMiddleware.js'

router.route('/').get(getProducts).post(protect, adminOnly, createProduct)
router.route('/:id/reviews').post(protect, createProductReview)
router.get('/top', getTopProducts)
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, adminOnly, deleteProduct)
  .put(protect, adminOnly, updateProduct)

export default router