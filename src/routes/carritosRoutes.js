const express = require('express');
const router = express.Router();
const fs = require('fs');

// Ruta raíz POST /api/carts
router.post('/', (req, res) => {
  const newCart = req.body;
  fs.readFile('./data/carritos.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Error al crear el carrito' });
    } else {
      const carts = JSON.parse(data);
      const currentCart = {...newCart, id: 'cart-' + (carts.length + 1)};
      carts.push(currentCart);
      fs.writeFile('./data/carrito.json', JSON.stringify(carts, null, 2), (err) => {
        if (err) {
          res.status(500).json({ error: 'Error al guardar el carrito' });
        } else {
          res.json(currentCart);
        }
      });
    }
  });
});


// Ruta POST /api/cart/add/:cartId para agregar un nuevo producto al carrito
router.post('/add/:cartId', (req, res) => {
    const cartId = req.params.cartId;
    const newProduct = req.body;
    fs.readFile('data/carrito.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Error al agregar producto al carrito' });
        } else {
            let carts = JSON.parse(data);
            const cartIndex = carts.findIndex(cart => cart.id === cartId);
            if (cartIndex === -1) {
                res.status(404).json({ error: 'Carrito no encontrado' });
            } else {
                carts[cartIndex].productos.push(newProduct);
                fs.writeFile('data/carrito.json', JSON.stringify(carts, null, 2), (err) => {
                    if (err) {
                        res.status(500).json({ error: 'Error al guardar el carrito actualizado' });
                    } else {
                        res.json(carts[cartIndex]);
                    }
                });
            }
        }
    });
});


module.exports = router;
