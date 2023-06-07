const getFavourite = async (req, res, next) => {
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

const putFavourite = async (req, res, next) => {
    
};

const newFavourite = async (req, res, next) => {
    try {
        res.send({
            status: 'error',
            message: 'Not implemented'
        });
    } catch(error) {
        next(error);
    }
};


const deleteExerciseInFavourite = async (req, res, next) => {
    
};

const deleteFavourites = async (req, res, next) => {
    
};

const newFavouriteExercise = async (req, res, next) => {
    
};

module.exports = {
    getFavourite,
    newFavourite,
    putFavourite,
    deleteExerciseInFavourite,
    deleteFavourites,
    newFavouriteExercise,
};