import express from 'express';
import env from 'dotenv';
import { orders, ordersModel, orders_products } from '../models/orders';
import jwt, { Secret } from 'jsonwebtoken';
const Route: express.Router = express.Router();

env.config();

const ord = new ordersModel();

Route.get(
  '/ordersActiveUser/:id',
  async (req: express.Request, res: express.Response) => {
    try {
      //console.log(`Authorization: ${req.headers.authorization}  ----  ${req.get("Authorization")}   ----- ${req.headers["authorization"]}`)
      jwt.verify(req.headers.authorization as unknown as string, process.env.JWT_TOCKEN_SECRET as Secret);
    } catch (e) {
      res.status(401);
      res.json(`Invalid token ${e}`);
      return;
    }
    try {
      const id: number = parseInt(req.params.id.substring(1));
      const orders: orders[] = await ord.currentOrderByUser(id);
      return res.json(orders);
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  }
);

Route.get(
  '/ordersCompletedUser/:id',
  async (req: express.Request, res: express.Response) => {
    try {
      jwt.verify(req.headers.authorization as unknown as string, process.env.JWT_TOCKEN_SECRET as Secret);
    } catch (e) {
      res.status(401);
      res.json(`Invalid token {err}`);
      return;
    }
    try {
      const id: number = parseInt(req.params.id.substring(1));
      const orders: orders[] = await ord.CompletedOrdersbyuser(id);
      return res.json(orders);
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  }
);

Route.post('/orders', async (req: express.Request, res: express.Response) => {
  try {
    const ordsTocreate: orders = {
      status: req.body.status,
      user_id: req.body.user_id
    };
    try {
      jwt.verify(req.headers.authorization as unknown as string, process.env.JWT_TOCKEN_SECRET as Secret);
    } catch (e) {
      res.status(401);
      res.json(`Invalid token {err}`);
      return;
    }
    const ordsCreated: orders = await ord.create(ordsTocreate);
    return res.json(ordsCreated);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

Route.put(
  '/orders/:id',
  async (req: express.Request, res: express.Response) => {
    try {
      try {
        jwt.verify(req.headers.authorization as unknown as string, process.env.JWT_TOCKEN_SECRET as Secret);
      } catch (e) {
        res.status(401);
        res.json(`Invalid token {err}`);
        return;
      }
      const reqBody = req.body;
      const id: number = parseInt(req.params.id.substring(1));
      const orders: orders = await ord.update(
        id,
        reqBody.field,
        reqBody.newValue
      );
      return res.json(orders);
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  }
);

Route.delete(
  '/orders/:id',
  async (req: express.Request, res: express.Response) => {
    try {
      try {
        jwt.verify(req.headers.authorization as unknown as string, process.env.JWT_TOCKEN_SECRET as Secret);
      } catch (e) {
        res.status(401);
        res.json(`Invalid token {err}`);
        return;
      }
      const id: number = parseInt(req.params.id.substring(1));
      const orders: orders = await ord.delete(id);
      return res.json(orders);
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  }
);

Route.post(
  '/orders/:id/prodcuts',
  async (req: express.Request, res: express.Response) => {
    try {
      try {
        jwt.verify(req.headers.authorization as unknown as string, process.env.JWT_TOCKEN_SECRET as Secret);
      } catch (e) {
        res.status(401);
        res.json(`Invalid token {err}`);
        return;
      }
      const ordersId: number = parseInt(req.params.id.substring(1));
      const productsId: number = parseInt(req.body.product_id);
      const quantity: number = parseInt(req.body.quantity);
      const product_orders: orders_products = await ord.addProduct(
        quantity,
        ordersId,
        productsId
      );
      return res.json(product_orders);
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  }
);

export default Route;
