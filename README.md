Setup:
The package.json contains all the required dependecies and scripts to run this project. These are the steps to run the design:
  1. Download the repositery from github
  2. npm install
  3. Create databases: db2 and db2_test
  4. To run the tests: npm run test. (This script should run all the up migrations then start running the tests)
  5. To run with nodemon: npm run dev.
  6. To run with node: install db-migrate globally -> db-migrate.cmd up -> npm run build -> node dist/index
    
    
The endpoints as well as table schemas can be found in the requirnement document


Setup and connect to database:
 - Open postgres
 - Sever: localhost
 - Port number: 5432
 - CREATE USER melswef WITH PASSWORD 'password';
 - CREATE DATABASE db2;
 - CREATE DATABASE db2_test;
 - \c db_2
 - GRANT ALL PRIVILEGES ON DATABASE db2 TO melswef
 - GRANT ALL PRIVILEGES ON DATABASE db2_test TO melswef


Backend Sever:
- Sever: localhost
- Port number: 3000



Environomental vairables used:
- TEST_VAR=testing123
- PSG_DB=db2
- PSG_DB_TEST=db2_test
- PSG_USER=melswef
- PSG_PSS=password
- ENV=
- PSSWD_PEPER=TheseArePssInitials
- SALT_ROUNDS=10
- JWT_TOCKEN_SECRET=TOCKEN_SECRET
