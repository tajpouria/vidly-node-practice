module.exports = validation => {
  return (req, res, next) => {
    debugger;
    const { error } = validation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    next();
  };
};
