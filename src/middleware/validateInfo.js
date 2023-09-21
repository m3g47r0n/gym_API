module.exports = (schema) => {
    return (req, res, next) => {
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',req.body);
      const result = schema.validate(req.body);
      if (result.error) {
        res.send({
          status: 400,
          code: "validation_error",
          message: result.error.details.map((err) => err.message)[0]
        });
      } else {
        next();
      }
    };
  };
  
  