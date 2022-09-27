import bcrypt from 'bcrypt';
import env from 'dotenv';
import { QueryResult } from 'pg';
import client from '../database';

env.config;

export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  password: string;
};

export class usersModel {
  createUser = async (
    firstName: string,
    lastName: string,
    password: string
  ): Promise<User> => {
    const hash = bcrypt.hashSync(
      password + process.env.PSSWD_PEPER,
      parseInt(process.env.SALT_ROUNDS as string)
    );
    try {
      const conn = await client.connect();
      let sql = 'SELECT * FROM users where firstName = $1 and lastName = $2';
      let res = await conn.query(sql, [firstName, lastName]);
      if (res.rows.length > 0) {
        throw 'Username already exist. Chosse another username';
      }
      sql =
        'INSERT INTO users (firstName,lastName,password) VALUES ($1,$2,$3) RETURNING *';
      res = await conn.query(sql, [firstName, lastName, hash]);
      conn.release();
      return res.rows[0];
    } catch (e) {
      throw new Error(`${e}`);
    }
  };

  authenticateUser = async (
    firstName: string,
    lastName: string,
    password: string
  ): Promise<User | null> => {
    try {
      const conn = await client.connect();
      const sql =
        'SELECT password FROM users WHERE firstName = $1 and lastName = $2';
      const res: QueryResult = await conn.query(sql, [firstName, lastName]);
      conn.release();
      if (res.rows.length) {
        const storedPass = res.rows[0].password;
        if (
          bcrypt.compareSync(password + process.env.PSSWD_PEPER, storedPass)
        ) {
          return res.rows[0];
        }
      }
      return null;
    } catch (e) {
      throw new Error(`Connection to DB failed ${e}`);
    }
  };

  show = async (id: number): Promise<User> => {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users WHERE id = $1';
      const res: QueryResult = await conn.query(sql, [id]);
      conn.release();
      return res.rows[0];
    } catch (e) {
      throw new Error(`Connection to DB failed ${e}`);
    }
  };

  index = async (): Promise<User[]> => {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users';
      const res: QueryResult = await conn.query(sql);
      conn.release();
      return res.rows;
    } catch (e) {
      throw new Error(`Connection to DB failed ${e}`);
    }
  };
}
