const Customer = require('../models/customerModel');

exports.updateProfile = async (req, res, next) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.customer.id,
      req.body,
      { new: true, runValidators: true }
    );

    updatedCustomer.password = undefined;

    res.status(200).json({
      status: 'success',
      data: {
        customer: updatedCustomer
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteProfile = async (req, res, next) => {
  try {
    await Customer.findByIdAndDelete(req.customer.id);

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.customer.id);

    res.status(200).json({
      status: 'success',
      data: {
        customer
      }
    });
  } catch (error) {
    next(error);
  }
};