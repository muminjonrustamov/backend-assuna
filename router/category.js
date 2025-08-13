const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name_en: String,
  name_ru: String,
  name_uz: String,
  description_en: String,
  description_ru: String,
  description_uz: String,
});

const Category = mongoose.model('Category', CategorySchema);

router.post('/', async (req, res) => {
  try {
    const newCat = new Category(req.body);
    const saved = await newCat.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const cats = await Category.find();
    res.json(cats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedCat = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } 
    );
    if (!updatedCat) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(updatedCat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedCat = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCat) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;