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

<<<<<<< HEAD
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
})

//2.Test case for Invalid firstname

describe('Userregistration', () => {
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
        expect(res.statusCode).to.be.equal(400);
        done();
      });
  });
});


//3.Test case for Invalid Lastname

describe('Userregistration', () => {
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
        expect(res.statusCode).to.be.equal(400);
        done();
      });
  });
});

//4.Test case for Invalid password

describe('Userregistration', () => {
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
        expect(res.statusCode).to.be.equal(400);
        done();
      });
  });
});

//5.Test case for valid user login

describe('UserLogin', () => {
  const inputBody={
    "EmailID":"abhishinde572@gmail.com",
    "Password":"Shinde"
  }
  it('user details should be saved in database', (done) => {
    request(app)
      .post('/api/v1/users/login')
      .send(inputBody)
      .end((err, res) => {
      expect(res.statusCode).to.be.equal(201);
      done();
    });
   });
});

 //6.Test case for invalid EmailId

 describe('UserLogin', () => {
  const inputBody={
    "EmailID":"abhishsddfdinde572@gmail.com",
    "Password":"Shinde"
  }
  it('user details should be saved in database', (done) => {
    request(app)
      .post('/api/v1/users/login')
      .send(inputBody)
      .end((err, res) => {
      expect(res.statusCode).to.be.equal(401);
      done();
    });
   });
});

//7.Test case for invalid password

describe('UserLogin', () => {
  const inputBody={
    "EmailID": "abhishinde572@gmail.com",
    "Password":"Shinde12477"
  }
  it('user details should be saved in database', (done) => {
    request(app)
      .post('/api/v1/users/login')
      .send(inputBody)
      .end((err, res) => {
      expect(res.statusCode).to.be.equal(401);
      done();
    });
   });
});

 //9.TestCAse both invalid password and email

 describe('UserLogin', () => {
  const inputBody={
    "EmailID": "abhishindedff572@gmail.com",
    "Password":"Shinde12477"
  }
  it('user details should be saved in database', (done) => {
    request(app)
      .post('/api/v1/users/login')
      .send(inputBody)
      .end((err, res) => {
      expect(res.statusCode).to.be.equal(401);
      done();
    });
   });
});
=======
  describe('GET /users', () => {
>>>>>>> Forgot_ResetPassword
