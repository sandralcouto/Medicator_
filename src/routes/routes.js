const Router = require('koa-router');
const {getByName, getByActive, getByRes, getByTargetColor, getByBarCode, getByGGREM} = require('../controllers/controllers.js');

const router = new Router();


router
.get("/get_by_name/:name", getByName)
.get("/get_by_composition/:composition", getByActive)
.get("/get_by_restriction/:res", getByRes)
.get("/get_by_targetcolor/:targetcolor", getByTargetColor)
.get("/get_by_barcode/:barcode", getByBarCode)
.get("/get_by_ggrem/:ggrem", getByGGREM);


module.exports = router



