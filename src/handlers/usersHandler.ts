import express from 'express';
import dotenv from 'dotenv';
import { usersModel } from '../models/users';
import jwt, { Secret } from 'jsonwebtoken';
const Route: express.Router = express.Router();

dotenv.config();

const user = new usersModel();

Route.post('/user', async (req: express.Request, res: express.Response) => {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    const result = await user.createUser(firstName, lastName, password);
    const token = jwt.sign(
      { User: result },
      process.env.JWT_TOCKEN_SECRET as Secret
    );
    return res.json(token);
  } catch (e: unknown) {
    res.status(400);
    res.json((e as Error).message);
  }
});

Route.get(
  '/user/getToken',
  async (req: express.Request, res: express.Response) => {
    try {
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      const password = req.body.password;
      const result = await user.authenticateUser(firstName, lastName, password);
      console.log(result);
      console.log('HIIIIIIIIIIIIII');
      if (result !== null) {
        const token = jwt.sign(
          { User: result },
          process.env.JWT_TOCKEN_SECRET as Secret
        );
        return res.json(token);
      } else {
        throw new Error('User not authenticated');
      }
    } catch (e: unknown) {
      res.status(400);
      res.json((e as Error).message);
    }
  }
);

Route.get('/user', async (req: express.Request, res: express.Response) => {
  try {
    try {
      jwt.verify(req.body.token, process.env.JWT_TOCKEN_SECRET as Secret);
    } catch (e) {
      res.status(401);
      res.json(`Invalid token {err}`);
      return;
    }
    const result = await user.index();
    return res.json(result);
  } catch (e) {
    res.status(400);
    res.json(e);
  }
});

Route.get('/user/:id', async (req: express.Request, res: express.Response) => {
  try {
    const id: number = parseInt(req.params.id.substring(1));
    try {
      jwt.verify(req.body.token, process.env.JWT_TOCKEN_SECRET as Secret);
    } catch (e) {
      res.status(401);
      res.json(`Invalid token {err}`);
      return;
    }
    const result = await user.show(id);
    return res.json(result);
  } catch (e) {
    res.status(400);
    res.json(e);
  }
});

export default Route;
