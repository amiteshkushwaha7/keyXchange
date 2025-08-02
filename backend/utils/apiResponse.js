class ApiResponse {
    constructor({ statusCode = 200, success = true, message = '', data = null }) {
        this.statusCode = statusCode;
        this.success = success;
        this.message = message;
        this.data = data;
    }

    send(res) {
        console.log('Sending response:', { 
            statusCode: this.statusCode,
            success: this.success,
            message: this.message,
            data: this.data
        });
        
        return res.status(this.statusCode).json({
            success: this.success,
            message: this.message,
            data: this.data
        });
    }
}

export default ApiResponse;
   