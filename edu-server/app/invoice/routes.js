const router = require('express').Router();
const invoiceController = require('./controller');

router.get('/invoice/:order_id', invoiceController.show);
router.get('/invoice', invoiceController.getAll)

module.exports = router;