import { QueryArrayResult, QueryResult } from 'pg';
import client from '../database';

export type orders = {
  id?: number;
  status: string;
  user_id: number;
};

export type orders_products = {
  id?: number;
  quantity: number;
  order_id: number;
  product_id: number;
};

export class ordersModel {
  //    id: number;
  async currentOrderByUser(id: number): Promise<orders[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders where user_id = $1 and status = $2';
      const result: QueryResult = await conn.query(sql, [id, 'active']);
      conn.release();
      return result.rows as unknown as orders[];
    } catch (e) {
      throw new Error(`Connection or query failed ${e}`);
    }
  }
  async CompletedOrdersbyuser(id: number): Promise<orders[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders where user_id = $1 and status = $2';
      const result: QueryResult = await conn.query(sql, [id, 'completed']);
      conn.release();
      return result.rows as unknown as orders[];
    } catch (e) {
      throw new Error(`Connection or query failed ${e}`);
    }
  }

  async create(order: orders): Promise<orders> {
    try {
      const conn = await client.connect();
      const status: string = order.status;
      const user_id: number = order.user_id;
      const sql =
        'INSERT INTO orders (status,user_id) VALUES ($1,$2) RETURNING *;';
      const res = await conn.query(sql, [status, user_id]);
      conn.release();
      return res.rows[0];
    } catch (e) {
      throw new Error(`Connection or query failed ${e}`);
    }
  }

  async update(
    id: number,
    field: string,
    newValue: string | number
  ): Promise<orders> {
    try {
      const conn = await client.connect();
      const sql = `UPDATE orders SET $1 = $2 WHERE id = $3  RETURNING *`;
      const res: QueryArrayResult = await conn.query(sql, [
        field,
        newValue,
        id
      ]);
      conn.release();
      return res.rows[0] as unknown as orders;
    } catch (e) {
      throw new Error(`Connection or query failed ${e}`);
    }
  }

  async delete(id: number): Promise<orders> {
    try {
      const conn = await client.connect();
      const sql = `DELETE FROM orders WHERE id = $1`;
      const res = await conn.query(sql, [id]);
      conn.release();
      return res.rows[0];
    } catch (e) {
      throw new Error(`Connection or query failed ${e}`);
    }
  }

  async addProduct(
    quantity: number,
    order_id: number,
    product_id: number
  ): Promise<orders_products> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO orders_products (quantity,order_id,product_id) VALUES ($1,$2,$3) RETURNING *;';
      const res = await conn.query(sql, [quantity, order_id, product_id]);
      conn.release();
      return res.rows[0];
    } catch (e) {
      throw new Error(`Connection or query failed ${e}`);
    }
  }
}
