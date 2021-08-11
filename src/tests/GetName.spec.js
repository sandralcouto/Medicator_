const request = require('supertest'); //supertest is necessary for integration tests
const server = require('../app.js');
const fetch = require ("node-fetch");
const axios = require('axios');
const mockProduct = require('./mockProduct.js')


/*- ////////// TESTES A SEREM FEITOS 200
- Interrogação : nao aceita  OK
- Aceitar acentos OK
- Ignorar diferenças letra minúscula e maiúscula OK
- Parâmetro com espaços em branco OK
- Aceitar letras e números  OK
- Ignorar caracteres especiais OK
- Aceitar EAN1, EAN2, EAN3 (arqwuivo get barcode) 89

////////// TESTES A SEREM FEITOS 404
- Campo vazio / null / undefined
- Retornar a mensagem correta de erro em json   OK*/


beforeAll(async () => {
  console.log('Starting tests with jest!');
});

///////////////////TESTS USING FETCH//////////////////////////////////////////////

describe("Tests JSON's responses --- ACCEPT ", () => {

it("Should return the right product when it's written with punctuation", async () => {
  const data = await fetch('http://localhost:3000/name?name=AcíclôVIR;.').then(res => res.json("PRODUTO"));
  expect(data[0]).toMatchObject(mockProduct);
}),
it("Should return the right product when it's written camelCase", async () => {
  const data = await fetch('http://localhost:3000/name?name=aCiClOvIr').then(res => res.json());
  expect(data[0]).toMatchObject(mockProduct);
}),
it("Should return the right product when it's written with white spaces", async () => {
  const data = await fetch('http://localhost:3000/name?name=\n\raCiClOvIr').then(res => res.json());
  expect(data[0]).toMatchObject(mockProduct);
})
})


///////////////////TESTS USING AXIOS//////////////////////////////////////////////

describe('Tests status codes using AXIOS', () => {
  it('Should get successful result of the API call when a correct product name is provided', async() => {
  const apiUrl = "http://localhost:3000/name?name=aciclovir";
  await axios.get(apiUrl) //axios faz a request
    .then(response => {
      expect(response.status).toBeGreaterThanOrEqual(200);
      expect(response.status).toBeLessThan(300); // poderia usar tbm:  expect(100).toBeWithinRange(90, 110);
    });}),
  
it("Should get succesful result when it's written with numbers", async () => {
  const apiUrl = 'http://localhost:3000/name?name=CLORETODESÓDIO0\t9%';
  await axios.get(apiUrl) //axios faz a request
    .then(response => {
      expect(response.status).toBeGreaterThanOrEqual(200);
      expect(response.status).toBeLessThan(300); 
    });}),

  it('Should get failure result of the API call when the parameter given contain a interrogation mark', async() => {
  const apiUrl = "http://localhost:3000/name?name=ACICLOV?IR";
  await axios.get(apiUrl)
    .then(response => {message: 'Not Found'
    })
    .catch(error => {
      if (error.response) {
        expect(error.response.status).toBeWithinRange(400, 500); 
      } else {
        throw error;
      }
    })
  });
  it('Should get failure result of the API call when the parameter given is a random word', async() => {
    const apiUrl = "http://localhost:3000/name?name=sandra";
    await axios.get(apiUrl)
      .then(response => {message: 'Not Found'
      })
      .catch(error => {
        if (error.response) {
          expect(error.response.status).toBeWithinRange(400, 500); 
        } else {
          throw error;
        }
      })
    });
    it('Should get failure result of the API call when the parameter given is null or undefined', async() => {
      const apiUrl = "http://localhost:3000/name?name=7";
      await axios.get(apiUrl)
        .then(response => {message: 'Not Found'
        })
        .catch(error => {
          if (error.response) {
            expect(error.response.status).toBeWithinRange(400, 500); 
          } else {
            throw error;
          }
        })
      });
  });
  

afterAll(() => {
  //o server close irá encerrar nossa aplicação, evitando problemas da porta já estar em uso
server.close();
console.log('Server closed!');
});

