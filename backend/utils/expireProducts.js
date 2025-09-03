import cron from 'node-cron';
import Product from '../models/Product.js';

// Runs every day at midnight
const markExpiredProducts = () => {
    cron.schedule('11 10 * * *', async () => {
        try {
            // Use UTC for consistent date comparison
            const now = new Date();
            const startOfTodayUTC = new Date(Date.UTC(
                now.getUTCFullYear(), 
                now.getUTCMonth(), 
                now.getUTCDate()
            ));
            
            console.log('Running expired products check at:', new Date().toISOString());
            console.log('Comparing expiry dates before:', startOfTodayUTC.toISOString());
            
            const result = await Product.updateMany(
                { 
                    expiryDate: { $lt: startOfTodayUTC }
                },
                { 
                    $set: { 
                        usageLimit: 0, 
                        isSold: true, 
                        isActive: false,
                        expiredAt: new Date() // Add timestamp for debugging
                    } 
                }
            );
            
            console.log('Expired products updated:', result.modifiedCount);
            
            // Debug: Check what products should have been expired
            const expiredProducts = await Product.find({
                expiryDate: { $lt: startOfTodayUTC },
                isActive: true
            });
            
            console.log('Products that should be expired:', expiredProducts.length);
            
        } catch (err) {
            console.error('Error updating expired products:', err);
        }
    });
};

export default markExpiredProducts;