import { QueryArrayResult } from 'pg';
import client from '../database';

export type products = {
  id?: number;
  name: string;
  price: number;
  category: string;
};

export class productsModel {
  async ProductsByCategory(productCategory: string): Promise<products[]> {
    try {
      const conn = await client.connect();
      const sql = 'select * from products where category = $1;';
      const result = await conn.query(sql, [productCategory]);
      conn.release();
      return result.rows;
    } catch (e) {
      throw new Error(`Connection or query failed ${e}`);
    }
  }

  async index(): Promise<products[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (e) {
      throw new Error(`Connection or query failed ${e}`);
    }
  }
  async show(id: number): Promise<products> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products WHERE id = $1';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error(`Connection or query failed ${e}`);
    }
  }

  async create(product: products): Promise<products> {
    try {
      const conn = await client.connect();
      const name: string = product.name;
      const price: number = product.price;
      const category: string = product.category;
      const sql =
        'INSERT INTO products (name,price,category) VALUES ($1,$2,$3) RETURNING *;';
      const res = await conn.query(sql, [name, price, category]);
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
  ): Promise<products> {
    try {
      const conn = await client.connect();
      const sql = `UPDATE products SET ${field} = $1 WHERE id = $2  RETURNING *`;
      const res: QueryArrayResult = await conn.query(sql, [newValue, id]);
      conn.release();
      return res.rows[0] as unknown as products;
    } catch (e) {
      throw new Error(`Connection or query failed ${e}`);
    }
  }

  async delete(id: number): Promise<products> {
    try {
      const conn = await client.connect();
      const sql = `DELETE FROM products WHERE id = ${id}`;
      const res = await conn.query(sql);
      conn.release();
      return res.rows[0];
    } catch (e) {
      throw new Error(`Connection or query failed ${e}`);
    }
  }
}
