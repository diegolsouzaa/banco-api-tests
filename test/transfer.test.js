const request = require('supertest')
const { expect } = require('chai')
require('dotenv').config()
const { getToken } = require('../helpers/authentication')
const postTransfer = require('../fixtures/postTransfer.json')

describe('transfers', () => {

    let token
     beforeEach( async () => {
            token = await getToken('julio.lima', '123456')
        })

    describe('POST /transferencias', () => {

        it('must return sucess when transfer value is equal or above R$ 10,00', async function (){         

            const bodyTranfers = {...postTransfer}
            const response = await request(process.env.BASE_URL)

            .post('/transferencias')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(bodyTranfers)

            expect(response.statusCode).to.equal(201)
            

        })

        it('must return 422 when transfer value is below R$ 10,00', async function () {

            const bodyTranfers = {...postTransfer}
            bodyTranfers.valor = 9
            const response = await request(process.env.BASE_URL)

            .post('/transferencias')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(bodyTranfers)

           
            expect(response.statusCode).to.equal(422)

        })

    })

})