// app.js

const express = require('express');
const fs = require('fs');
const productRoutes = require('./routes/productosRoutes');
const cartRoutes = require('./routes/carritosRoutes');

const app = express();
const PORT = 8080;

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

app.get('/', (req, res) => {
    res.send('¡Bienvenido a mi aplicación!');
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
