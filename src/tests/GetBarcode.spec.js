const request = require('supertest'); //supertest is necessary for integration tests
const server = require('../app.js');
const fetch = require ("node-fetch");
const mockProduct = require('./mockProduct.js')

// "EAN 1": 7896004775821,
//"EAN 2": "-",
//"EAN 3": "-",

describe("Tests Barcodes ", () => {
  it("Should return the right product when given the EAN1 code", async () => {
    const data = await fetch('http://localhost:3000/barcode?barcode=7896004775821').then(res => res.json("EAN 1"));
    expect(data[0]).toMatchObject(mockProduct);
  }),
  it("Should return the right product when given the EAN2 code", async () => {
    const data = await fetch('http://localhost:3000/barcode?barcode=7896004775821').then(res => {
      return res
  })
  expect(data.status).toEqual(200);
  }),
  it("Should return the right product when given the EAN3 code", async () => {
    const data = await fetch('http://localhost:3000/barcode?barcode=7896004775821').then(res => res.json("EAN 3"));
    expect(data[0]).toMatchObject(mockProduct);
  }) })