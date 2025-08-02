const globalErrorHandler = (err, req, res, next) => {
    console.error('🔥 Global Error:', err);

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
        errors: err.errors || {},
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
}

export default globalErrorHandler;