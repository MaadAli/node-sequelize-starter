import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import logger from './utils/logger';
import routes from './modules/index.routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(
  morgan('combined', { stream: { write: (message) => logger.morgan(message.replace(/\n$/, '')) } })
);

app.get('/', async (req, res) => {
  res.status(200).send('server is on');
});

app.use(routes);

app.use((err, req, res, next) => {
  logger.error(err);
  console.log('err----------------------------------->', err);

  if (err.name === 'ValidationError') {
    return res.status(400).json(err.details);
  }

  if (err.status) {
    return res.status(err.status).send(err.body);
  }
  return res.status(500).send(err);
});

export default app;
