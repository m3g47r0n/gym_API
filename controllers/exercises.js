const getExercises = async (req, res, next) => {
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

const newExercises = async (req, res, next) => {
    try {
        res.send({
            status: 'error',
            message: 'Not implemented'
        });
    } catch(error) {
        next(error);
    }
};

const putExercises = async (req, res, next) => {
    try {
        res.send({
            status: 'error',
            message: 'Not implemented'
        });

    } catch(error) {
        next(error);
    }
};

const deleteExercises = async (req, res, next) => {
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
    getExercises,
    newExercises,
    putExercises,
    deleteExercises,
};
