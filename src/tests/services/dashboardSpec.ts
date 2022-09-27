import { dahsboardModel } from '../../services/dashboard';
import { orders, ordersModel } from '../../models/orders';
import { usersModel } from '../../models/users';
import { products, productsModel } from '../../models/products';

const dashboard = new dahsboardModel();
const users = new usersModel();
const orders = new ordersModel();
const products = new productsModel();

describe('Dashboards Testing', () => {
  beforeAll(async () => {
    await users.createUser('OrdersFN11', 'OrdersLN11', 'password');
    let product: products = { name: 'bear', price: 100, category: 'toys' };
    await products.create(product);
    product = { name: 'tiger', price: 80, category: 'toys' };
    await products.create(product);
    product = { name: 'eagle', price: 120, category: 'toys' };
    await products.create(product);
    product = { name: 'toyota', price: 8000, category: 'cars' };
    await products.create(product);
    product = { name: 'honda', price: 12000, category: 'cars' };
    await products.create(product);
    product = { name: 'BMW', price: 30000, category: 'cars' };
    await products.create(product);
    product = { name: 'honda2', price: 15000, category: 'cars' };
    await products.create(product);
    product = { name: 'lexus', price: 25000, category: 'cars' };
    await products.create(product);
    let order: orders = { status: 'active', user_id: 5 };
    await orders.create(order);
    order = { status: 'completed', user_id: 5 };
    await orders.create(order);
    await orders.create(order);
    await orders.create(order);
    await orders.create(order);
    await orders.addProduct(10, 1, 2);
    await orders.addProduct(10, 1, 2);
    await orders.addProduct(10, 1, 2);
    await orders.addProduct(10, 2, 2);
    await orders.addProduct(10, 2, 4);
    await orders.addProduct(10, 1, 4);
    await orders.addProduct(10, 3, 4);
    await orders.addProduct(10, 4, 4);
    await orders.addProduct(10, 5, 5);
    await orders.addProduct(10, 2, 5);
    await orders.addProduct(10, 1, 5);
    await orders.addProduct(10, 3, 5);
    await orders.addProduct(10, 4, 6);
    await orders.addProduct(10, 5, 6);
    await orders.addProduct(10, 3, 6);
    await orders.addProduct(10, 2, 7);
    await orders.addProduct(10, 3, 7);
    await orders.addProduct(10, 4, 7);
    await orders.addProduct(10, 5, 8);
    await orders.addProduct(10, 1, 8);
  });

  it('mostPopular5Products Testing', async () => {
    const res = await dashboard.mostPopular5Products();
    expect(res[0].id).toEqual(2);
  });
});
