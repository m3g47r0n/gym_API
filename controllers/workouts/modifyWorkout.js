const modifyWorkout = async (req, res, next) => {
    try {
        console.log(req.url);
        console.log(req.method);
        console.log(req.body);
        res.send({
            status: 'error',
            message: 'Not implemented'
        });
    } catch(error) {
        next(error);
    }
};
    
module.exports = {
    modifyWorkout
};