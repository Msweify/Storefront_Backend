CREATE TABLE orders (id serial primary key, status  VARCHAR(50), user_id integer REFERENCES users(id));