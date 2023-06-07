const newUser = async (req, res, next) => {
    try {
        res.send({
            status: 'error',
            message: 'Not implemented'
        });
    } catch(error) {
        next(error);
    }
};

const getUser = async (req, res, next) => {
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

const login = async (req, res, next) => {
    try {
        res.send({
            status: 'error',
            message: 'Not implemented'
        });

    } catch(error) {
        next(error);
    }
};

module.exports = {
    newUser,
    getUser,
    login,
};