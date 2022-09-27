import express from 'express';
import env from 'dotenv';
import { products, productsModel } from '../models/products';
import jwt, { Secret } from 'jsonwebtoken';
const Route: express.Router = express.Router();

env.config();

const prod = new productsModel();

Route.get('/products', async (req: express.Request, res: express.Response) => {
  try {
    const prods: products[] = await prod.index();
    return res.json(prods);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

Route.get(
  '/products/:id',
  async (req: express.Request, res: express.Response) => {
    try {
      const id: number = parseInt(req.params.id.substring(1));
      const products: products = await prod.show(id);
      return res.json(products);
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  }
);

Route.post('/products', async (req: express.Request, res: express.Response) => {
  try {
    const prodTocreate: products = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category
    };

    try {
      jwt.verify(req.body.token, process.env.JWT_TOCKEN_SECRET as Secret);
    } catch (e) {
      res.status(401);
      res.json(`Invalid token {err}`);
      return;
    }
    const prodCreated: products = await prod.create(prodTocreate);
    return res.json(prodCreated);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

Route.put(
  '/products/:id',
  async (req: express.Request, res: express.Response) => {
    try {
      const reqBody = req.body;
      const id: number = parseInt(req.params.id.substring(1));
      try {
        jwt.verify(req.body.token, process.env.JWT_TOCKEN_SECRET as Secret);
      } catch (e) {
        res.status(401);
        res.json(`Invalid token {err}`);
        return;
      }
      const products: products = await prod.update(
        id,
        reqBody.field,
        reqBody.newValue
      );
      return res.json(products);
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  }
);

Route.delete(
  '/products/:id',
  async (req: express.Request, res: express.Response) => {
    try {
      const id: number = parseInt(req.params.id.substring(1));
      try {
        jwt.verify(req.body.token, process.env.JWT_TOCKEN_SECRET as Secret);
      } catch (e) {
        res.status(401);
        res.json(`Invalid token {err}`);
        return;
      }
      const products: products = await prod.delete(id);
      return res.json(products);
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  }
);

Route.get(
  '/productsCategory',
  async (req: express.Request, res: express.Response) => {
    try {
      const products: products[] = await prod.ProductsByCategory(
        req.body.category
      );
      return res.json(products);
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  }
);

export default Route;
