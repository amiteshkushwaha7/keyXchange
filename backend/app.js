import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; 
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';

import globalErrorHandler from './middlewares/globleErrorHandler.js';

import authRouter from './routes/authRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import customerRoutes from './routes/customerRoutes.js'; 

dotenv.config();
const app = express(); 

const allowedOrigins = [
  process.env.LOCAL_HOST_CLIENT_URL,
  process.env.VERCEL_CLIENT_URL,
];

app.use(cors({
    origin: (origin, callback) => { 
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));

app.get('/', (req, res) => res.send('API Running...')); 

app.use('/api/v1/auth', authRouter);

app.use('/api/v1/products', productRoutes);
app.use('/api/v1/admin/products', productRoutes);

app.use('/api/v1/admin/users', userRoutes);
app.use('/api/v1/users', userRoutes);

app.use('/api/v1/admin/customers', customerRoutes);

app.use('/api/v1/orders', orderRouter); 
app.use('/api/v1/admin/orders', orderRouter);

app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

app.use(globalErrorHandler);


export default app;