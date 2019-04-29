module.exports = validation => {
  return (req, res, next) => {
    const { error } = validation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    next();
  };
};
