function errorHandler(error, req, res, next) {

    console.log(error.message);



    if (error.name === "CastError") {
        return res.status(400).json({
            success: false,
            message: "Invalid event ID"
        });
    }


    if (error.name === "ValidationError") {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }



    res.status(500).json({
        success: false,
        message: "Something went wrong"
    });
}


module.exports = errorHandler;