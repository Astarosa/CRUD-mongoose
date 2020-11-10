import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import WildersController from './controllers/WildersController';

mongoose
  .connect('mongodb://127.0.0.1:27017/wildersdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => {
    console.log('Connected to database');
  })
  .catch(() => {
    console.error('Database connection failed');
  });

const app = express();

const asyncErrorHandler = (controller: (req: Request, res: Response) => Promise<void>) => {
  return async (req: Request, res: Response) => {
    try {
      await controller(req, res);
    } catch ({ code, message, status }) {
      res.status(status || 500).json({
        code,
        message,
      });
    }
  };
};

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());

app.get('/api/wilders', asyncErrorHandler(WildersController.getAll));
app.get('/api/wilders/:wilderId', asyncErrorHandler(WildersController.getOne));
app.post('/api/wilders', asyncErrorHandler(WildersController.create));
app.put('/api/wilders/:wilderId', asyncErrorHandler(WildersController.updateOne));
app.delete('/api/wilders', asyncErrorHandler(WildersController.removeAll));
app.delete('/api/wilders/:wilderId', asyncErrorHandler(WildersController.removeOne));

app.use('*', (req, res) => {
  res.status(404).json({ error: 'not found' });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
