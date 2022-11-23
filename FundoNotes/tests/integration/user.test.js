/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/index';

describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

  //1.Test case for user registration

  describe('Userregistration', () => {
    const inputBody={
      "Firstname":"Abhishek",
     "Lastname":"Shinde",
      "EmailId":"abhishinde572@gmail.com",
      "password":"Shinde124"
    }
    it('details of users should be saved in database', (done) => {
      request(app)
        .post('/api/v1/users/Register')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });
  });

//2.Test case for Invalid firstname

describe('Userregistration =========> Invalid firstname', () => {
  const inputBody={
    "Firstname":"A",
   "Lastname":"Shinde",
    "EmailId":"abhishinde572@gmail.com",
    "password":"Shinde124"
  }
  it('details of users should be saved in database', (done) => {
    request(app)
      .post('/api/v1/users/Register')
      .send(inputBody)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(500);
        done();
      });
  });
});


//3.Test case for Invalid Lastname

describe('Userregistration=========> Invalid Lastname', () => {
  const inputBody={
    "Firstname":"Abhishek",
   "Lastname":"S",
    "EmailId":"abhishinde572@gmail.com",
    "password":"Shinde124"
  }
  it('details of users should be saved in database', (done) => {
    request(app)
      .post('/api/v1/users/Register')
      .send(inputBody)
      .end((_err, res) => {
        expect(res.statusCode).to.be.equal(500);
        done();
      });
  });
});

//4.Test case for Invalid password

describe('Userregistration ============> Invalid password', () => {
  const inputBody={
    "Firstname":"Abhishek",
   "Lastname":"Shinde",
    "EmailId":"abhishinde572@gmail.com",
    "password":"Shin"
  }
  it('details of users should be saved in database', (done) => {
    request(app)
      .post('/api/v1/users/Register')
      .send(inputBody)
      .end((_err, res) => {
        expect(res.statusCode).to.be.equal(500);
        done();
      });
  });
});

//5.Test case for valid user login


describe('UserLogin', () => {
  const inputBody={
    "EmailId":"abhishinde572@gmail.com",
      "password":"Shinde124"
  }
  it('user details should be saved in database', (done) => {
    request(app)
      .post('/api/v1/users/logins')
      .send(inputBody)
      .end((err, res) => {
      expect(res.statusCode).to.be.equal(200);
      done();
    });
   });
});

 //6.Test case for invalid EmailId

 describe('UserLogin=======>  invalid EmailId', () => {
  const inputBody={
    "EmailId":"abhishsddfdinde572@gmail.com",
    "password":"Shinde"
  }
  it('user details should be saved in database', (done) => {
    request(app)
      .post('/api/v1/users/logins')
      .send(inputBody)
      .end((err, res) => {
      expect(res.statusCode).to.be.equal(500);
      done();
    });
   });
});

//7.Test case for invalid password

describe('UserLogin=====> invalid password', () => {
  const inputBody={
    "EmailId": "abhishinde572@gmail.com",
    "password":"Shinde12477"
  }
  it('user details should be saved in database', (done) => {
    request(app)
      .post('/api/v1/users/logins')
      .send(inputBody)
      .end((err, res) => {
      expect(res.statusCode).to.be.equal(500);
      done();
    });
   });
});

 //8.TestCAse both invalid password and email

 describe('UserLogin====> Invalid password and email', () => {
  const inputBody={
    "EmailId": "abhishindedff572@gmail.com",
    "password":"Shinde12477"
  }
  it('user details should be saved in database', (done) => {
    request(app)
      .post('/api/v1/users/logins')
      .send(inputBody)
      .end((err, res) => {
      expect(res.statusCode).to.be.equal(500);
      done();
    });
   });
});
});