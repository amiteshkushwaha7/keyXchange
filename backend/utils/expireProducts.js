import cron from 'node-cron';
import Product from '../models/Product.js';

// Runs every day at midnight
const markExpiredProducts = () => {
    cron.schedule('1 0 * * *', async () => {
        try {
            const now = new Date();
            const result = await Product.updateMany(
                { expiryDate: { $lt: now }, isActive: true,  },
                { $set: { usageLimit: 0, isSold: true, isActive: false } }
            );
            console.log('Expired products updated:', result.modifiedCount);
        } catch (err) {
            console.error('Error updating expired products:', err);
        }
    });
};

export default markExpiredProducts;