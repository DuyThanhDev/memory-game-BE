import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import scoreRoutes from './routes/scoreRoutes.js';
import userRoutes from './routes/userRoutes.js';

// Swagger
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/scores', scoreRoutes);
app.use('/api/users', userRoutes);

// Swagger docs
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Base route
app.get('/', (req, res) => {
  res.send('Memory Game API is running...');
});

// Error middleware
app.use(errorHandler);

export default app;