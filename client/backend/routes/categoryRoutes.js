import express from 'express';
import Category from '../models/categoryModel.js';

const router = express.Router();

router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;