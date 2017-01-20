var request = require('supertest');

describe('UserController', function() {

  describe('#login()', function() {
    it('should redirect to /tasks', function (done) {
      request(sails.hooks.http.app)
        .post('/login')
        .send({ email: 'jan@jan.jan', pwd: 'jan' })
        .expect(302)
        .expect('location','/tasks', done);
    });
  });


  describe('#registerFail()', function() {
    it('should redirect to /register', function (done) {
      request(sails.hooks.http.app)
        .post('/register')
        .send({ email: 'luke@sky.walker', name: 'Luke Skywalker', pwd: 'force', cpwd: 'theforce' })
        .expect(302)
        .expect('location','/register', done);
    });
  });

  /*
   describe('#registerSuccess()', function() {
    it('should redirect to /login', function (done) {
      request(sails.hooks.http.app)
        .post('/register')
        .send({ email: 'luke@sky.walker', name: 'Luke Skywalker', pwd: 'force', cpwd: 'force' })
        .expect(302)
        .expect('location','/login', done);
    });
  });
  */

  describe('#editUser()', function() {
    it('should promote the user to admin', function (done) {
      request(sails.hooks.http.app)
        .post('/login')
        .send({ email: 'root@to.do', pwd: 'sudo' })
        .expect(302)
        .expect('location','/tasks', function(done) {
          request(sails.hooks.http.app)
          .patch('/admin')
          .send({ id: 2 })
          .expect(302)
          .expect('location', '/admin', done)
        });
      done();
    });
  });



});
