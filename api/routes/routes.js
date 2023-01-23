const {Router} = require('express');
const controller = require('../controllers/controller')

const router = Router();

router.get('/kmc',controller.findBest);

module.exports=router;