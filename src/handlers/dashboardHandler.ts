import express, { Request, Response } from 'express';
import { dahsboardModel } from '../services/dashboard';

const dashboard = new dahsboardModel();

const popularProducts = async (_req: Request, res: Response) => {
  try {
    const products = await dashboard.mostPopular5Products();
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const dashboardRoutes = (app: express.Application) => {
  app.get('/productsPopular', popularProducts);
};

export default dashboardRoutes;
