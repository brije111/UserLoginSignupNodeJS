//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let User = require('../user/User');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('User', () => {
    beforeEach((done) => { //Before each test we empty the database
        User.remove({}, (err) => { 
           done();           
        });        
    });
/*
  * Test the /GET route
  */
  describe('/GET user', () => {
      it('it should GET all the users', (done) => {
        chai.request(server)
            .get('/users')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              done();
            });
      });
  });

  /*
  * Test the /POST route
  */
 describe('/POST user', () => {
 it('it should POST a user ', (done) => {
    let user = {
        name: "brijesh kumar",
        email: "brijesh@gmail.com",
        password: '123456'
    }
  chai.request(server)
      .post('/users')
      .send(user)
      .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name').eql('brijesh kumar');
            res.body.should.have.property('email').eql('brijesh@gmail.com');
            res.body.should.have.property('password').eql('123456');
        done();
      });
});
});
/*
  * Test the /GET/:email:password route
  */
 describe('/GET/:email:password user', () => {
    it('it should GET a user by the given email & password', (done) => {
        let user = new User({
            name: "brijesh kumar",
            email: "brijesh@gmail.com",
            password: '123456'
        });
        const param = {email: "brijesh@gmail.com", password: '123456'};
        user.save((err, user) => {
            chai.request(server)
          .post('/users/login')
          .send(param)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('email').eql(param.email);
                res.body.should.have.property('password').eql(param.password);
            done();
          });
        });
    });
});
/*
  * Test the /GET/:id route
  */
 describe('/GET/:id user', () => {
    it('it should GET a user by the given id', (done) => {
        let user = new User({
            name: "brijesh kumar",
            email: "brijesh@gmail.com",
            password: '123456'
        });
        user.save((err, user) => {
            chai.request(server)
          .get('/users/' + user.id)
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('email');
                res.body.should.have.property('password');
                res.body.should.have.property('_id').eql(user.id);
            done();
          });
        });

    });
});
/*
  * Test the /PUT/:id route
  */
 describe('/PUT/:id user', () => {
    it('it should UPDATE a user given the id', (done) => {
        let user = new User({
            name: "brijesh kumar",
            email: "brijesh@gmail.com",
            password: '123456'
        });
        user.save((err, user) => {
              chai.request(server)
              .put('/users/' + user.id)
              .send({name: 'Brijesh', email: "brijesh@gmail.com", password: "123456"})
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.should.have.property('message').eql('User updated!');
                    res.body.should.have.property('name').eql('Brijesh');
                done();
              });
        });
    });
});
/*
  * Test the /DELETE/:id route
  */
 describe('/DELETE/:id user', () => {
    it('it should DELETE a user given the id', (done) => {
        let user = new User({
            name: "brijesh kumar",
            email: "brijesh@gmail.com",
            password: '123456'
        });
        user.save((err, user) => {
              chai.request(server)
              .delete('/users/' + user.id)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.should.have.property('message').eql('User successfully deleted!');
                    //res.body.result.should.have.property('ok').eql(1);
                    //res.body.result.should.have.property('n').eql(1);
                done();
              });
        });
    });
});
});
