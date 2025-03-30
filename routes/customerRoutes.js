const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/customerController');

router.post('/', CustomerController.createCustomer);
router.get('/', CustomerController.getAllCustomers);
router.get('/:id', CustomerController.getCustomerById);
router.get('/phone/:phone', CustomerController.getCustomerByPhone);
router.put('/:id', CustomerController.updateCustomerById);
router.delete('/:id', CustomerController.deleteCustomerByID);

module.exports=router;