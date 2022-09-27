import { orders, ordersModel } from '../../models/orders';
import { usersModel } from '../../models/users';
import { products, productsModel } from '../../models/products';

const orders = new ordersModel();
const products = new productsModel();
const users = new usersModel();

describe('Orders table: create table testing', () => {
  beforeAll(async () => {
    await users.createUser('OrdersFN1', 'OrdersLN1', 'password');
    await users.createUser('OrdersFN2', 'OrdersLN2', 'password');
    await users.createUser('OrdersFN3', 'OrdersLN3', 'password');
    await users.createUser('OrdersFN4', 'OrdersLN4', 'password');
    await users.createUser('OrdersFN5', 'OrdersLN5', 'password');
  });

  it('Should have create method', () => {
    expect(orders.create).toBeDefined();
  });

  it('create should return a list of products', async () => {
    const order: orders = { status: 'active', user_id: 1 };
    const res = await orders.create(order);
    expect(res.status).toEqual('active');
  });
});

describe('Orders table: continue table testing', () => {
  beforeAll(async () => {
    let order: orders = { status: 'active', user_id: 5 };
    await orders.create(order);
    order = { status: 'completed', user_id: 5 };
    await orders.create(order);
    await orders.create(order);
    await orders.create(order);
    await orders.create(order);
    order = { status: 'active', user_id: 2 };
    await orders.create(order);
    order = { status: 'completed', user_id: 2 };
    await orders.create(order);
    await orders.create(order);
    await orders.create(order);
    await orders.create(order);
    const product: products = { name: 'bear', price: 100, category: 'toys' };
    await products.create(product);
  });

  it('Get active orders for user with id = 5', async () => {
    const res = await orders.currentOrderByUser(5);
    expect(res.length).toEqual(1);
  });

  it('Get completed orders for user with id = 5', async () => {
    const res = await orders.CompletedOrdersbyuser(5);
    expect(res.length).toEqual(4);
  });

  it('Add Product to active order for user with id = 5', async () => {
    const res = await orders.addProduct(10, 1, 1);
    expect(res.quantity).toEqual(10);
  });
});
