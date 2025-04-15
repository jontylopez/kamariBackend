const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/customerController');

router.post('/', CustomerController.createCustomer);
router.get('/', CustomerController.getAllCustomers);
router.get('/phone/:phone', CustomerController.getCustomerByPhone);
router.get('/:id', CustomerController.getCustomerById);
router.put('/:id', CustomerController.updateCustomerById);
router.delete('/:id', CustomerController.deleteCustomerByID);

module.exports=router;