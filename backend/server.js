import app from './app.js';
import dotenv from 'dotenv'; 
import connectDB from './config/db.js';
import cors from 'cors'

dotenv.config();
connectDB(); 

const PORT = process.env.PORT || 5000; 

app.options(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);  
}).on('error', (err) => {
  console.error('Failed to start the server:', err.message);
}); 
