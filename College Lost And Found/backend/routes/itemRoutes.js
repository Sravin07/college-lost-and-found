import express from 'express';
import { createItem, getAllItems } from '../controllers/itemController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createItem);
router.get('/', getAllItems);

export default router;
