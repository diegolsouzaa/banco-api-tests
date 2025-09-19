const request = require('supertest')
const { expect } = require('chai')

describe('transfers', () => {

    describe('POST /transferencias', () => {
        it('must return sucess when transfer value is equal or above R$ 10,00', async function (){
            
             const responseLogin = await request ('http://localhost:3000')

            .post('/login')
            .set('Content-Type', 'application/json')
            .send({
                'username': 'julio.lima',
                'senha': '123456'
            })

            const token = responseLogin.body.token

            const response = await request('http://localhost:3000')

            .post('/transferencias')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                    contaOrigem: 1,
                    contaDestino: 2,
                    valor: 10,
                    token: ""
            })

            expect(response.statusCode).to.equal(201)
            

        })

        it('must return 422 when transfer value is below R$ 10,00', async function () {
             const responseLogin = await request ('http://localhost:3000')

            .post('/login')
            .set('Content-Type', 'application/json')
            .send({
                'username': 'julio.lima',
                'senha': '123456'
            })

            const token = responseLogin.body.token

            const response = await request('http://localhost:3000')

            .post('/transferencias')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                    contaOrigem: 1,
                    contaDestino: 2,
                    valor: 9,
                    token: ""
            })

            expect(response.statusCode).to.equal(422)

        })


    })


})