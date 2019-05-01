module.exports = function(passValidation) {
  return (req, res, next) => {
    const { error } = passValidation(req.body.password);
    if (error) return res.status(400).send(error.details[0].message);

    next();
  };
};
