// CreateOrder.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { createOrder, verifyPayment, deleteOrder } from '../../features/orders/orderSlice';

const CreateOrder = ({ product: productProp }) => {
    const { state } = useLocation();
    const product = productProp || state?.product;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.orders);
    const [createdOrderId, setCreatedOrderId] = useState(null);

    useEffect(() => {
        if (product) {
            handleOrder();
        } else {
            navigate(-1);
        }
    }, [product]);

    if (!product) {
        return (
            <div className="text-red-500">
                Product information is missing. Please go back and try again.
            </div>
        );
    }

    const handlePaymentFailure = async (orderId) => {
        try {
            if (orderId) {
                await dispatch(deleteOrder(orderId)).unwrap();
            }
        } catch (err) {
            console.error('Failed to delete order:', err);
        } finally {
            // navigate('/product-details', { state: { product } });
            navigate(-1);
        }
    };

    const handleOrder = async () => {
        try {
            const result = await dispatch(createOrder({
                productId: product._id,
                amount: product.price,
                quantity: product.quantity || 1
            })).unwrap();

            console.log(result);

            const { razorpayOrder, order: createdOrder } = result.data;
            setCreatedOrderId(createdOrder._id);

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: razorpayOrder.amount,
                currency: razorpayOrder.currency,
                name: 'keyXchange',
                description: product.title,
                order_id: razorpayOrder.id,
                handler: async function (response) {
                    try {
                        const verificationResult = await dispatch(verifyPayment({
                            orderId: createdOrder._id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpayOrderId: razorpayOrder.id,
                            razorpaySignature: response.razorpay_signature
                        })).unwrap();
                        console.log(verificationResult);
                        // navigate('/product-details', { state: { product } });
                        navigate(-1);
                    } catch (err) {
                        console.error('Payment verification failed:', err);
                        await handlePaymentFailure(createdOrder._id);
                    }
                },
                prefill: {
                    name: 'Customer Name',
                    email: 'customer@example.com',
                    contact: '90000'
                },
                theme: {
                    color: '#F37254'
                },
            };

            const razorpay = new window.Razorpay(options);

            razorpay.on('payment.failed', async function (response) {
                console.error('Payment failed:', response.error);
                await handlePaymentFailure(createdOrder._id);
            });

            razorpay.on('payment.cancelled', async function (response) {
                console.error('Payment cancelled:', response);
                await handlePaymentFailure(createdOrder._id);
            });

            razorpay.open();

        } catch (err) {
            console.error('Order failed:', err);
            alert(`Order creation failed: ${err.message || 'Please try again.'}`);
            // navigate('/product-details', { state: { product } });
            navigate(-1);
        }
    };

    return (
        <div className="create-order-container p-4">
            {loading && (
                <div className="flex flex-col items-center justify-center min-h-[200px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black mb-4"></div>
                    <p>Processing your order...</p>
                </div>
            )}

            {error && (
                <div className="text-red-500 mt-2 text-center">
                    {error}
                </div>
            )}
        </div>
    );
};

export default CreateOrder;