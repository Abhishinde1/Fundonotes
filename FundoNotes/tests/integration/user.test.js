/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
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
        .end((_err, res) => {
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
      .end((_err, res) => {
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
var token;
describe('UserLogin', () => {
  const inputBody={
    "EmailId":"abhishinde572@gmail.com",
      "password":"Shinde124"
  }
  it('user details should be saved in database', (done) => {
    request(app)
      .post('/api/v1/users/logins')
      .send(inputBody)
      .end((_err, res) => {
        token = res.body.data;
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
      .end((_err, res) => {
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
      .end((_err, res) => {
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
      .end((_err, res) => {
      expect(res.statusCode).to.be.equal(500);
      done();
    });
   });
});

//9. Test case to create a new note

var id;
describe('Create Note', () => {
  const inputBody={
    "title":"note",
    "description":"hello",
  }
  it('note created sucessfully', (done) => {
    request(app)
      .post('/api/v1/notes')
      .set('authorization',`Bearer ${token}`)
      .send(inputBody)
      .end((err, res) => {
        id = res.body.data._id;
       expect(res.statusCode).to.be.equal(200);
        done();
      });
    });
  });

//10. Test case for without giving title value in notes

describe('creating new note',()=>{
  const inputBody={
    "title":"",
    "description":"hello"
  }
  it('title should be required',(done)=>{
    request(app)
    .post('/api/v1/notes')
    .set('Authorization',`Bearer ${token}`)
    .send(inputBody)
    .end((err,res)=>{
      expect(res.statusCode).to.be.equal(500);
      done();
    });
  });
});

//11. Test case for getting all Notes
describe('get all the notes of the user',()=>{
  it('notes fetched successfully',(done)=>{
    request(app)
    .get('/api/v1/notes')
    .set('Authorization',`Bearer ${token}`)
    .end((err,res)=>{
      console.log(res.body);
      expect(res.statusCode).to.be.equal(200);
      done();
    });
  });
});

//12. Test case for Get notes by Id

describe('getting the note of particular user with id',()=>{
  it('note fetched successfully',(done)=>{
    request(app)
    .get(`/api/v1/notes/${id}`)
    .set('Authorization',`Bearer ${token}`)
    .end((err,res)=>{
      expect(res.statusCode).to.be.equal(200);
      done();
    });
  });
});

 //13:Test case for invalid Description
 describe('creating new note',()=>{
  const inputBody={
    "title":"notes"
  }
  it('description should be required',(done)=>{
    request(app)
    .post('/api/v1/notes')
    .set('Authorization',`Bearer ${token}`)
    .send(inputBody)
    .end((err,res)=>{
      expect(res.statusCode).to.be.equal(500);
      done();
    });
  });
});

//14.Update a note by id (testcase)
describe('updating the note',()=>{
  const inputBody={
    "color":"green"
  }
  it('note updated successfully',(done)=>{
    request(app)
    .put(`/api/v1/notes/${id}`)
    .set('Authorization',`Bearer ${token}`)
    .send(inputBody)
    .end((err,res)=>{
      console.log("id update=============================>", id);
      expect(res.statusCode).to.be.equal(202);
      done();
    });
  });
  });


  //15.archive a note by id test case
   describe('Archive a note by id', () => {
     it('Given note details should archive using id from database', (done) => {
       request(app)
         .put(`/api/v1/notes/${id}/archive`)
         .set('Authorization',`Bearer ${token}`)
         .end((err, res) => {
           expect(res.statusCode).to.be.equal(202);
           done();
         });
       });
     });


     //16.trash a note by id test case
   describe('trash a note by id', () => {
    it('Given note details should archive using id from database', (done) => {
      request(app)
        .put(`/api/v1/notes/${id}/trash`)
        .set('Authorization',`Bearer ${token}`)
        .end((err, res) => {
          console.log(res.body);
          expect(res.statusCode).to.be.equal(202);
          done();
        });
      });
    });

    //17.Delete a note by id test case
   describe('Deleted a note by id', () => {
    it('Given note details should be deleted from database using id', (done) => {
       request(app)
        .delete(`/api/v1/notes/${id}`)
        .set('authorization',`Bearer ${token}`)
       .end((err, res) => {
        console.log(res.body);
        expect(res.statusCode).to.be.equal(200);
        done();
      });
    });
  });
})
