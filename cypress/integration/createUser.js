/// <reference types ='Cypress'/>
const faker = require("faker");
let name = faker.name.firstName();
let email= faker.internet.email();
// let lastName = faker.animal.lastName()

describe('Post Create User',()=>{
    let accessToken='2f29ad03524c3c33daa2a7f7bad1991e9093a3ce7fea935f5aa627a6635819b6';
    it('successfully create user',()=>{
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            headers:{
                'Authorization': 'Bearer '+accessToken
            },
            body: {
                    'name':'zuli',
                    'gender':'male',
                    'email': 'dezulian@yahoo.com',
                    'status':'active'
            }
       })
            .then((response) => { 
                expect(response.status).to.be.equal(201);
                expect(response.body).to.have.property('name','zuli')
                expect(response.body).to.have.property('gender','male')
                expect(response.body).to.have.property('email','dezulian@yahoo.com')
                expect(response.body).to.have.property('status','active')
        })    
       })

       it('should fail to create user with name set to empty string',()=>{
        let email2= faker.internet.email();
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            failOnStatusCode: false,
            headers:{
                'Authorization': 'Bearer '+accessToken
            },
            body: {
                    'name':'',
                    'gender':'male',
                    'email': email2,
                    'status':'active'
            }
       })
            .then((response) => { 
                expect(response.status).to.be.equal(422);
                expect(response.body[0]).to.have.property('field','name')
                expect(response.body[0]).to.have.property('message',`can't be blank`)
        })    
       })

       it('should fail to create user with name set to null',()=>{
        let email2= faker.internet.email();
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            failOnStatusCode: false,
            headers:{
                'Authorization': 'Bearer '+accessToken
            },
            body: {
                    'name':null,
                    'gender':'male',
                    'email': email2,
                    'status':'active'
            }
       })
            .then((response) => { 
                expect(response.status).to.be.equal(422);
                expect(response.body[0]).to.have.property('field','name')
                expect(response.body[0]).to.have.property('message',`can't be blank`)
        })    
       })

       it('should fail to create user with gender set to invalid',()=>{
        let email2= faker.internet.email();
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            failOnStatusCode: false,
            headers:{
                'Authorization': 'Bearer '+accessToken
            },
            body: {
                    'name':name,
                    'gender':'mal',
                    'email': email2,
                    'status':'active'
            }
       })
            .then((response) => { 
                expect(response.status).to.be.equal(422);
                expect(response.body[0]).to.have.property('field','gender')
                // expect(response.body[0]).to.have.property('message',`can't be blank, can be male or female`)
        })    
       })

       it('should fail to create user with gender set to empty string',()=>{
        let email2= faker.internet.email();
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            failOnStatusCode: false,
            headers:{
                'Authorization': 'Bearer '+accessToken
            },
            body: {
                    'name':name,
                    'gender':'',
                    'email': email2,
                    'status':'active'
            }
       })
            .then((response) => { 
                expect(response.status).to.be.equal(422);
                expect(response.body[0]).to.have.property('field','gender')
                expect(response.body[0]).to.have.property('message',`can't be blank, can be male or female`)
        })    
       })

       it('should fail to create user with gender set to null',()=>{
        let email2= faker.internet.email();
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            failOnStatusCode: false,
            headers:{
                'Authorization': 'Bearer '+accessToken
            },
            body: {
                    'name':name,
                    'gender':null,
                    'email': email2,
                    'status':'active'
            }
       })
            .then((response) => { 
                expect(response.status).to.be.equal(422);
                expect(response.body[0]).to.have.property('field','gender')
                expect(response.body[0]).to.have.property('message',`can't be blank, can be male or female`)
        })    
       })

       it('should fail to create user with email set to duplicate',()=>{
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            failOnStatusCode: false,
            headers:{
                'Authorization': 'Bearer '+accessToken
            },
            body: {
                    'name':name,
                    'gender':'male',
                    'email': email,
                    'status':'active'
            }
       })
            .then((response) => { 
                expect(response.status).to.be.equal(422);
                expect(response.body[0]).to.have.property('field','email')
                expect(response.body[0]).to.have.property('message','has already been taken')
        })    
       })

       it('should fail to create user with email set to invalid',()=>{
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            failOnStatusCode: false,
            headers:{
                'Authorization': 'Bearer '+accessToken
            },
            body: {
                    'name':name,
                    'gender':'male',
                    'email': 'a@',
                    'status':'active'
            }
       })
            .then((response) => { 
                expect(response.status).to.be.equal(422);
                expect(response.body[0]).to.have.property('field','email')
                expect(response.body[0]).to.have.property('message','is invalid')
        })    
       })

       it('should fail to create user with email set to null',()=>{
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            failOnStatusCode: false,
            headers:{
                'Authorization': 'Bearer '+accessToken
            },
            body: {
                    'name':name,
                    'gender':'male',
                    'email': null,
                    'status':'active'
            }
       })
            .then((response) => { 
                expect(response.status).to.be.equal(422);
                expect(response.body[0]).to.have.property('field','email')
                expect(response.body[0]).to.have.property('message',`can't be blank`)
        })    
       })

       it('should fail to create user with email set to empty string',()=>{
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            failOnStatusCode: false,
            headers:{
                'Authorization': 'Bearer '+accessToken
            },
            body: {
                    'name':name,
                    'gender':'male',
                    'email': '',
                    'status':'active'
            }
       })
            .then((response) => { 
                expect(response.status).to.be.equal(422);
                expect(response.body[0]).to.have.property('field','email')
                expect(response.body[0]).to.have.property('message',`can't be blank`)
        })    
       })

       it('should fail to create user with status set to invalid',()=>{
        let email2= faker.internet.email();
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            failOnStatusCode: false,
            headers:{
                'Authorization': 'Bearer '+accessToken
            },
            body: {
                    'name':name,
                    'gender':'male',
                    'email': email2,
                    'status':'actie'
            }
       })
            .then((response) => { 
                expect(response.status).to.be.equal(422);
                expect(response.body[0]).to.have.property('field','status')
                expect(response.body[0]).to.have.property('message',`can't be blank`)
        })    
       })
       
       it('should fail to create user with status set to empty string',()=>{
        let email2= faker.internet.email();
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            failOnStatusCode: false,
            headers:{
                'Authorization': 'Bearer '+accessToken
            },
            body: {
                    'name':name,
                    'gender':'male',
                    'email': email2,
                    'status':''
            }
       })
            .then((response) => { 
                expect(response.status).to.be.equal(422);
                expect(response.body[0]).to.have.property('field','status')
                expect(response.body[0]).to.have.property('message',`can't be blank`)
        })    
       })

       it('should fail to create user with status set to null',()=>{
        let email2= faker.internet.email();
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            failOnStatusCode: false,
            headers:{
                'Authorization': 'Bearer '+accessToken
            },
            body: {
                    'name':name,
                    'gender':'male',
                    'email': email2,
                    'status':null
            }
       })
            .then((response) => { 
                expect(response.status).to.be.equal(422);
                expect(response.body[0]).to.have.property('field','status')
                expect(response.body[0]).to.have.property('message',`can't be blank`)
        })    
       })

       it('should fail to create user without valid authorization',()=>{
        let email2= faker.internet.email();
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            failOnStatusCode: false,
            headers:{
                'Authorization': accessToken
            },
            body: {
                    'name':name,
                    'gender':'male',
                    'email': email2,
                    'status':null
            }
       })
            .then((response) => { 
                expect(response.status).to.be.equal(401);

                expect(response.body).to.have.property('message','Authentication failed')
        })    
       })
    });