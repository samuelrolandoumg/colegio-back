const express = require('express');
const { getAllData } = require('../controllers/MiTablaController'); 

const router = express.Router();

router.get('/', getAllData);

module.exports = router;

