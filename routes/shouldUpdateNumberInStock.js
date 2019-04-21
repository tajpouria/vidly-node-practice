const { Rental } = require('../models/rental');

async function shouldUpdateNumberInStock(rentalId, movieId) {
  const rental = Rental.findById(rentalId);
  if (rental.movie._id !== movieId) {
    return update(
      'movies',
      { _id: rental.movie._id },
      { $set: { numberInStock: 1 } }
    ).update('movies', { _id: movieId }, { $set: { numberInStock: -1 } });
  }
}

module.exports = shouldUpdateNumberInStock;
