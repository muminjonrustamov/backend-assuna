import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name_en: { type: String, required: true },
  name_ru: { type: String, required: true },
  name_uz: { type: String, required: true },
  description_en: String,
  description_ru: String,
  description_uz: String,
  image: String,
  category: { 
    name_en: String,
    name_ru: String,
    name_uz: String,
    description_en: String,
    description_ru: String,
    description_uz: String,
  }
}, {
  timestamps: true,
});

export default mongoose.model('Product', productSchema);