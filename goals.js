const getGoals = async (req, res, next) => {
  try {
    console.log(req.url);
    console.log(req.method);
    console.log(req.body);
    res.send({
      status: 'error',
      message: 'Not implemented',
    });
  } catch (error) {
    next(error);
  }
};

const newGoals = async (req, res, next) => {
    try {
        res.send({
            status: 'error',
            message: 'Not implemented'
        });
    } catch(error) {
        next(error);
    }
};

const putGoals = async (req, res, next) => {

};

const deleteGoals = async (req, res, next) => {

};

module.exports = {
    getGoals,
    newGoals,
    putGoals,
    deleteGoals,
};