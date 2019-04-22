const admin = require('../middlewares/admin');
const authorization = require('../middlewares/authorization');
const _ = require('lodash');
const { Customer, validation } = require('../models/customer');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find()
      .sort('name')
      .select('name phone isGold');
    res.status(200).send(customers);
  } catch (exception) {
    res.status(404).send(exception.message);
  }
});

router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id)
    .sort('name')
    .select('name phone isGold');
  res.status(200).send(customer);
});

router.post('/', authorization, async (req, res) => {
  const { error } = validation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const customer = new Customer(_.pick(req.body), [
      'name',
      'phone',
      'isGold'
    ]);
    await customer.save();
    res.status(200).send(`${customer} was created succesfully`);
  } catch (exception) {
    res.status(404).send(exception.message);
  }
});

router.put('/:id', authorization, async (req, res) => {
  const { error } = validation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const result = await Customer.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: _.pick(req.body, ['name', 'phone', 'isGold'])
      },
      { new: true }
    );
    res.send(result);
  } catch (exception) {
    res.status(404).send(exception.message);
  }
});

router.delete('/:id', [authorization, admin], async (req, res) => {
  try {
    const result = await Customer.findOneAndDelete({ _id: req.params.id });
    res.status(200).send(result);
  } catch (exception) {
    res.status(404).send(exception.message);
  }
});

module.exports = router;
