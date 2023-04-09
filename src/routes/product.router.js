import { Router } from "express";
import { isLogged } from "../middleware/login.middleware.js";
import ProductManager from "../persistencia/daos/product.manager.js";

const productManager = new ProductManager();

const router = Router();

router.get('/', isLogged, async(req, res) => {
  const {limit, page, category, status, sort} = req.query;
  const products = await productManager.getProducts({limit, page, category, status, sort});

  if (products) {
    // res.json({ products });
    res.render('home', {
      title: 'Products',
      email: req.session.email,
      admin: req.session.isAdmin ? 'You are admin' : null,
      products
    })
  } else {
    res.json({ error: 'Error in get products' });
  }
})

router.get('/:prodId', isLogged, async(req, res) => {
  const {prodId} = req.params;
  const product = await productManager.getProductById(prodId);
  if (product) {
    // res.json({ product });
    res.render('product', {
      title: 'Product',
      product
    })
  } else {
    res.json({ error: 'Error in get product by Id' });
  }
})

router.post('/addProducts', async(req, res) => {
  const objProducts = req.body;
  const newProduct = await productManager.addProducts(objProducts);
  if (newProduct) {
    res.json({ mesagge: 'Successfull', newProduct });
  } else {
    res.json({ mesagge: 'Error in post products' });
  }
})

export default router;