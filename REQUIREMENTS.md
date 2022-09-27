# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
-   INDEX route: '/products' [GET]
-   
- Show
-   Show route: '/products/:id' [GET]
-   
- Create [token required]
-   CREATE route: '/products' [POST] [token required]
-   
- [OPTIONAL] Top 5 most popular products 
-   PopularProducts route: '/productsPopular' [GET] 
-   
- [OPTIONAL] Products by category (args: product category)
-   productsCategory route: '/productsCategory' [GET] [args: product category]

#### Users
- Index [token required]
-   INDEX route: '/users' [GET] [token required]
-   
- Show [token required]
-   SHOW route: '/users/:id' [GET] [token required]
-   
- Create N[token required]
-   CREATE route: '/products' [POST] [args: firstName, lastName, password]
-   
- getToken N[token required]
- getToken route: '/user/getToken' [GET] [args: firstName, lastName, password]

#### Orders
- Current Order by user (args: user id)[token required]
-   Current Order by user Route: '/ordersActiveUser/:id' [GET][token required]
-   
- [OPTIONAL] Completed Orders by user (args: user id)[token required]
-   Completed Orders by user Route: '/ordersCompletedUser/:id' [GET][token required]


## Data Tables
-  Products Table: (id serial primary key, name VARCHAR(150), price integer, category VARCHAR(50))
-  Users Table: (id serial primary key, firstName  VARCHAR(75), lastName  VARCHAR(75), password VARCHAR(200))
-  Orders Table: (id serial primary key, status  VARCHAR(50), user_id integer REFERENCES users(id))
-  orders_products Table: (id SERIAL PRIMARY KEY, quantity integer NOT NULL, order_id integer REFERENCES orders(id), product_id integer REFERENCES products(id))

-  Note: The relation between products and orders is many to many while the relation between users and orders is one to many.

## Data Shapes
#### Product
-  id
- name
- price
- category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
