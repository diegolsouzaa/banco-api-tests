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

     describe('GET /transferencias/{id}', () => {
        it('must return sucess with 200 and data must save in database', async () => {
            const response = await request(process.env.BASE_URL)
            .get('/transferencias/14')
            .set('Authorization', `Bearer ${token}`)

            //console.log(response.body)
            //console.log(response.status)
            expect(response.status).to.equal(200)
            expect(response.body.id).to.equal(14)
            expect(response.body.id).to.be.a('number')
            expect(response.body.conta_origem_id).to.equal(1)
            expect(response.body.conta_destino_id).to.equal(2)
            expect(response.body.valor).to.equal(10.00)

        })

        describe('GET /transferencias', () => {
            it('must return 10 elements in page when insert limit 10 elements', async () => {
                const response = await request(process.env.BASE_URL)
                .get('/transferencias?page=1&limit=10')
                .set('Authorization', `Bearer ${token}`)

                expect(response.status).to.equal(200)
                expect(response.body.limit).to.equal(10)
                expect(response.body.transferencias).have.lengthOf(10)

            })


        })

     })

})