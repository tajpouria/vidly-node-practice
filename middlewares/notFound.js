module.exports = function(handler) {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (ex) {
      res.status(404).send('not found');
    }
  };
};
