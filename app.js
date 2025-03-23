// app.js
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db'); 
const brandRoutes = require('./routes/brandRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const productRoutes = require('./routes/productRoutes');
const stockMovementRoutes = require('./routes/stockMovementsRoutes');
const supBrandRoutes = require('./routes/supBrandRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/brands', brandRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/stock-movements', stockMovementRoutes);
app.use('/api/sup-brands', supBrandRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Kamari Backend!');
});

sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
}).catch(err => {
  console.error('Error syncing database:', err);
});
