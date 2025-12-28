import app from './app.js';
import dotenv from 'dotenv'; 
import connectDB from './config/db.js';
// import markExpiredProducts from'./utils/expireProducts.js';

dotenv.config();
connectDB(); 
// markExpiredProducts();

const PORT = process.env.PORT || 5000; 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);  
}).on('error', (err) => {
  console.error('Failed to start the server:', err.message);
}); 
  