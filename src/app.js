const Koa = require('koa');
const Router = require('koa-router');
//const {router} = require('./routes/routes.js');
const {getByName, getByActive,
   getByBarCode, getByGGREM} = require('./controllers/controllers.js')

const app = new Koa();
const port = 3000;
const router = new Router();


///////////////// SERVER
const server = app.listen(port, err => { ////could let without error handling 
 if (err) console.error(err);
 console.log(`\nServer listening on http://localhost:${port}\n\n ツ \n`)
});


//////////////////// ROUTES
router
.get("/name", getByName) //URIs should all be nouns only
.get("/composition", getByActive)
.get("/barcode", getByBarCode)
.get("/ggrem", getByGGREM);

app.use(router.routes())
  .use(router.allowedMethods());


//exporta o server para que seja possivel acessá-lo em outras partes do programa
module.exports = server;

