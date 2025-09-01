import cron from 'node-cron';
import Product from '../models/Product.js';

// Runs every day at midnight
const markExpiredProducts = () => {
    cron.schedule('1 0 * * *', async () => {
        try {
            const now = new Date();
            // Set time to start of day for accurate date comparison
            const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            
            const result = await Product.updateMany(
                { 
                    expiryDate: { $lt: startOfToday }
                },
                { $set: { usageLimit: 0, isSold: true, isActive: false } }
            );
            console.log('Expired products updated:', result.modifiedCount);
        } catch (err) {
            console.error('Error updating expired products:', err);
        }
    });
};

export default markExpiredProducts;