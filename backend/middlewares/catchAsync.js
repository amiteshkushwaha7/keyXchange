const catchAsync = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } 
    catch (err) {
        next(err)
    }
    
    // catch (err) {
    //     console.log(err);
    //     res.status(err.statusCode || 500).json({
    //         success: false,
    //         message: err.message || 'Internal Server Error',
    //         errors: err.errors || {},
    //         stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    //     });
    // }
};

export default catchAsync;