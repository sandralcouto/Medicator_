const data = require('../csvjson.json')

//controller that "clean" the strings
 
const normalizeQuery = (input) => {
  let id = input.toUpperCase().trim();
   return id.normalize('NFD').replace(/[\u0300-\u036f]|[\W]/g, '');
 }

//route controllers

async function getByName (ctx, next) {
    let filtered = data.filter((test) => normalizeQuery(ctx.query.name) == test["PRODUTO"]);
     //response handling
     if (filtered.length > 0) {
      ctx.response.status = 200;
      ctx.body = await filtered;
    } else {
      ctx.body = { message: "Not Found" }; //KOA give a 404 automatically, we dont need to put it here
    }
    await next();
  }


async function getByActive(ctx, next) { 
  let filtered = data.filter(test => normalizeQuery(ctx.query.composition) == test["PRINCÍPIO ATIVO"]);

  if (filtered.length > 0) {
    ctx.response.status = 200;
    ctx.body = await filtered;
  } else {
    ctx.body = { message: "Not Found" } 
  }
  await next();
}

async function getByBarCode(ctx, next) {
  let filtered = data.filter((test) => ctx.query.barcode == test["EAN 1"] ||
   ctx.query.barcode == test["EAN 2"] || ctx.query.barcode == test["EAN 3"]);

  if (filtered.length > 0) {
    ctx.response.status = 200;
    ctx.body = await filtered;
  } else {
    ctx.body = { message: "Not Found" }
  }
  await next(); //Generator.prototype.next() useful for tests using "done" parameter
}

async function getByGGREM(ctx, next) {
  let filtered = data.filter((test) => ctx.query.ggrem == test["CÓDIGO GGREM"]);

  if (filtered.length > 0) {
    ctx.response.status = 200;
    ctx.body = await filtered;
  } else {
    ctx.body = { message: "Not Found" }
  }
  await next();
}


module.exports = {getByName, getByActive, getByBarCode, getByGGREM};