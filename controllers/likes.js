const getLike = async (req, res, next) => {
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

const newLike = async (req, res, next) => {
    try {
        res.send({
            status: 'error',
            message: 'Not implemented'
        });
    } catch(error) {
        next(error);
    }
};


const deleteLike = async (req, res, next) => {
    
};

module.exports = {
    getLike,
    newLike,
    deleteLike,
};
