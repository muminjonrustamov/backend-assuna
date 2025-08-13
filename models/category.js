import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name_en: { type: String, required: true },
  name_ru: { type: String, required: true },
  name_uz: { type: String, required: true },
  description_en: String,
  description_ru: String,
  description_uz: String,
}, {
  timestamps: true,
});

export default mongoose.model('Category', categorySchema);