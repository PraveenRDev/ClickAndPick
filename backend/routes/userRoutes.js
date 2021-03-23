import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser
} from '../controllers/userController.js'
import { protect, adminOnly } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(protect, adminOnly, getAllUsers)
router.route('/login').post(authUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router
  .route('/:id')
  .delete(protect, adminOnly, deleteUser)
  .get(protect, adminOnly, getUserById)
  .put(protect, adminOnly, updateUser)
export default router
