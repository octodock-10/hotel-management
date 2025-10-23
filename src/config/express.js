import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { json, urlencoded } from 'express';

const createApp = () => {
  const app = express();

  // Security headers
  app.use(helmet());

  // Enable CORS
  app.use(cors());

  // HTTP request logger
  app.use(morgan('combined'));

  // Body parsing middleware
  app.use(json());
  app.use(urlencoded({ extended: true }));

  // Default route
  app.get('/', (req, res) => {
    res.json({ message: 'Octodock API' });
  });

  // Global error handler
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    console.error(err);
    const status = err.status || 500;
    res.status(status).json({ error: err.message || 'Internal Server Error' });
  });

  return app;
};

const startServer = () => {
  const app = createApp();
  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

export { createApp, startServer };
