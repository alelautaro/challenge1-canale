const express = require('express');
const router = express.Router();
const fs = require('fs');

// Ruta POST /api/products/add para agregar un nuevo producto
router.post('/add', (req, res) => {
    const newProduct = req.body;
    fs.readFile('data/productos.json', 'utf8', (err, data) => {
      if (err) {
        res.status(500).json({ error: 'Error al crear el producto' });
      } else {
        const products = JSON.parse(data);
        const productId = 'prod-' + (products.length + 1);
        const product = {...newProduct, id: productId};
        products.push(product);
        fs.writeFile('data/productos.json', JSON.stringify(products, null, 2), (err) => {
          if (err) {
            res.status(500).json({ error: 'Error al guardar el producto' });
          } else {
            res.json(product);
          }
        });
      }
    });
  });
  
  // Ruta PUT /api/products/:pid para actualizar un producto
  router.put('/:pid', (req, res) => {
    const productId = req.params.pid;
    const updatedProduct = req.body;
    fs.readFile('./data/productos.json', 'utf8', (err, data) => {
      if (err) {
        res.status(500).json({ error: 'Error al actualizar el producto' });
      } else {
        let products = JSON.parse(data);
        const existingProductIndex = products.findIndex(p => p.id === productId);
        if (existingProductIndex === -1) {
          res.status(404).json({ error: 'Producto no encontrado' });
        } else {
          products[existingProductIndex] = {...products[existingProductIndex], ...updatedProduct};
          fs.writeFile('./data/productos.json', JSON.stringify(products, null, 2), (err) => {
            if (err) {
              res.status(500).json({ error: 'Error al guardar el producto actualizado' });
            } else {
              res.json(products[existingProductIndex]);
            }
          });
        }
      }
    });
  });
  
  // Ruta DELETE /api/products/:pid para eliminar un producto
  router.delete('/:pid', (req, res) => {
    const productId = req.params.pid;
    fs.readFile('data/productos.json', 'utf8', (err, data) => {
      if (err) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
      } else {
        let products = JSON.parse(data);
        const removedProduct = products.find(p => p.id === productId);
        products = products.filter(p => p.id !== productId);
        fs.writeFile('data/productos.json', JSON.stringify(products, null, 2), (err) => {
          if (err) {
            res.status(500).json({ error: 'Error al guardar los productos actualizados' });
          } else {
            res.json(removedProduct);
          }
        });
      }
    });
  });

// Ruta GET /api/products para obtener todos los productos
router.get('/', (req, res) => {
    fs.readFile('data/productos.json', 'utf8', (err, data) => {
      if (err) {
        res.status(500).json({ error: 'Error al obtener los productos' });
      } else {
        res.json(JSON.parse(data));
      }
    });
  });

// Ruta GET /api/products/:pid para obtener un producto por su ID
router.get('/:pid', (req, res) => {
    const productId = req.params.pid;
    fs.readFile('data/productos.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Error al obtener el producto' });
        } else {
            const products = JSON.parse(data);
            const product = products.find(p => p.id === productId);
            if (product) {
                res.json(product);
            } else {
                res.status(404).json({ error: 'Producto no encontrado' });
            }
        }
    });
});


module.exports = router;
