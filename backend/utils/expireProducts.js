import cron from 'node-cron';
import Product from '../models/Product.js';

const markExpiredProducts = () => {
    cron.schedule('0 13 * * *'
, async () => {
        try {
            
            const result = await Product.updateMany(
                { },
                { 
                    $set: { 
                        usageLimit: 1, 
                        isSold: false, 
                        isActive: true
                    } 
                }
            );
            
        } catch (err) {
            console.error('Error updating expired products:', err);
        }
    });
};

export default markExpiredProducts;