import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';

import routes from './routes/index.js';
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/errorHandler.js';
import express, { Request, Response } from 'express';

import swaggerUi from 'swagger-ui-express';
import connectDB from './config/database.js';
import swaggerDocument from './swagger/swaggerConfig.js';

dotenv.config();

connectDB();

const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api', routes);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome to Task Management API',
    version: '1.0.0',
    docs: '/api-docs'
  });
});


app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});


process.on('unhandledRejection', (err: any, promise) => {
  console.log(`Error: ${err.message}`);

  server.close(() => process.exit(1));
});

export default app;
