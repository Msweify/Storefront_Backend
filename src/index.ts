import express from 'express';
import cors from 'cors';
import ordersRoute from './handlers/ordersHandler';
import productsRoute from './handlers/productsHandler';
import userRoute from './handlers/usersHandler';
import dashboardRoutes from './handlers/dashboardHandler';
import bodyParser from 'body-parser';

const app: express.Application = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(userRoute);
app.use(ordersRoute);
app.use(productsRoute);
dashboardRoutes(app);

app.get('/', (req, res) => {
  res.send('This is get route');
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

export default app;