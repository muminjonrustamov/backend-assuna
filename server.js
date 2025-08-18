const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '500mb', extended: true }));

mongoose.connect(
  'mongodb+srv://rustamovabdumuminjon:FPLpnvItvIdOMziU@products.f8glzge.mongodb.net/?retryWrites=true&w=majority&appName=Products',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
  .then(() => console.log('✅ Connected to MongoDB Atlas!'))
  .catch(err => console.error('❌ MongoDB error: ', err));

app.use('/api/products', require('./router/product'));
app.use('/api/categories', require('./router/category'));
app.use('/api/categories/:id', require('./router/category'));
app.use('/api/', require('./router/category'));
app.use('/api/:id', require('./router/product'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));