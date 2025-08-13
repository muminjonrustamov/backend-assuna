const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name_en: String,
  name_ru: String,
  name_uz: String,
  description_en: String,
  description_ru: String,
  description_uz: String,
  category: String,
  image: String
});

const Product = mongoose.model('Product', ProductSchema);

router.post('/', async (req, res) => {
  try {
    console.log('📥 POST /api/products сработал');
    console.log('Полученные данные:', req.body);
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error("Mongo error:", err);
    res.status(500).json({ message: 'Ошибка при создании продукта', error: err.message });
  }
});

router.get('/ca', async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при получении продуктов', error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при получении продуктов', error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Продукт не найден' });
    }
    res.json(product);
  } catch (err) {
    console.error("Mongo error:", err);
    res.status(500).json({ message: 'Ошибка при получении продукта', error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Продукт не найден' });
    }
    res.json({ message: 'Продукт успешно удалён' });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при удалении продукта', error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Продукт не найден' });
    }
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при обновлении продукта', error: err.message });
  }
});

module.exports = router;