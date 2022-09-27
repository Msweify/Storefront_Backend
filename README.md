Setup:
The package.json contains all the required dependecies and scripts to run this project. These are the steps to run the design:
  1. Download the repositery from github
  2. npm install
  3. Create databases: db2 and db2_test
  4. To run the tests: npm run test. (This script should run all the up migrations then start running the tests)
  5. To run with nodemon: npm run dev.
  6. To run with node: install db-migrate globally -> db-migrate.cmd up -> npm run build -> node dist/index
    
    
The endpoints as well as table schemas can be found in the requirnement document
