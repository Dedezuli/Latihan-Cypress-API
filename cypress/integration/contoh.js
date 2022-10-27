/// <reference types ='Cypress'/>
const faker = require("faker");
let name = faker.name.firstName();
let email= faker.internet.email();
// let lastName = faker.animal.lastName()

describe('Post Create User',()=>{
    // let accessToken='2f29ad03524c3c33daa2a7f7bad1991e9093a3ce7fea935f5aa627a6635819b6';
    it('successfully create user',()=>{
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/users',
            body: {
                "name": name,
                "job": "leader"
            }
       })
            .then((response) => { 
                expect(response.status).to.be.equal(201);
                expect(response.body).to.have.property('name',name)
                expect(response.body).to.have.property('id')
        })    
       })
    it('should success to login',()=>{
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/login',
            body: {
                "email": "eve.holt@reqres.in",
                "password": "cityslicka"
            }
       })
            .then((response) => { 
                expect(response.status).to.be.equal(200);
                expect(response.body).to.have.property('token')
    })    
    })
    it('should fail to login',()=>{
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/login',
            body: {
                "email": "eve.holt@reqres.in"
            }
       })
            .then((response) => { 
                expect(response.status).to.be.equal(400);

                expect(response.body).to.have.property('error','Missing password')
    })    
    })

});