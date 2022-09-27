import { QueryResult } from 'pg';
import client from '../database';

export type products = {
  id?: number;
  name: string;
  price: number;
  category: string;
};

export class dahsboardModel {
  async mostPopular5Products(): Promise<products[]> {
    try {
      const conn = await client.connect();
      const sql =
        'select * from products where id IN (SELECT product_id FROM orders_products GROUP BY product_id ORDER BY count(product_id) DESC LIMIT 5);';
      const result: QueryResult = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (e) {
      throw new Error(`Connection or query failed ${e}`);
    }
  }
}
