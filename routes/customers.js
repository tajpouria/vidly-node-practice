const admin = require('../middlewares/admin');
const authorization = require('../middlewares/authorization');
const _ = require('lodash');
const { Customer, validation } = require('../models/customer');
const express = require('express');
const router = express.Router();
const validator = require('../middlewares/validator');

router.get('/', async (req, res) => {
  const customers = await Customer.find()
    .sort('name')
    .select('name phone isGold');

  if (customers.length === 0) return res.status(404).send('not found');

  res.status(200).send(customers);
});

router.get('/:id', async (req, res) => {
  await Customer.findById(req.params.id, (err, doc) => {
    if (err) return res.status(404).send('not found');
    res.send(doc);
  })
    .sort('name')
    .select('name phone isGold');
});

router.post('/', [authorization, validator(validation)], async (req, res) => {
  const customer = new Customer(_.pick(req.body, ['name', 'phone', 'isGold']));
  await customer.save();

  res.send(customer);
});

router.put('/:id', [authorization, validator(validation)], async (req, res) => {
  await Customer.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: _.pick(req.body, ['name', 'phone', 'isGold'])
    },
    { new: true },
    (err, doc) => {
      if (err) return res.status(404).send('not found');

      res.send(doc);
    }
  );
});

router.delete('/:id', [authorization, admin], async (req, res) => {
  await Customer.findOneAndDelete({ _id: req.params.id }, (err, doc) => {
    if (err) res.status(404).send('not found');
    res.send(doc);
  });
});

module.exports = router;
