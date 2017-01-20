var request = require('supertest');

describe('ProfileController', function() {

 describe('#adminPanel()', function() {
    it('should load admin panel', function (done) {
      request(sails.hooks.http.app)
        .post('/login')
        .send({ email: 'root@to.do', pwd: 'sudo' })
        .expect(302)
        .expect('location','/tasks', function(done) {
          request(sails.hooks.http.app)
          .get('/admin')
          .expect(200)
          .expect('location', '/admin', done)
        });
      done();
    });
  });

 describe('#adminPanelFail()', function() {
    it('should not load admin panel', function (done) {
      request(sails.hooks.http.app)
        .post('/login')
        .send({ email: 'jan@jan.jan', pwd: 'jan' })
        .expect(302)
        .expect('location','/tasks', function(done) {
          request(sails.hooks.http.app)
          .get('/admin')
          .expect(302)
          .expect('location', '/tasks', done)
        });
      done();
    });
  });

  describe('#logout()', function() {
    it('should log out', function (done) {
      request(sails.hooks.http.app)
        .post('/login')
        .send({ email: 'jan@jan.jan', pwd: 'jan' })
        .expect(302)
        .expect('location','/tasks', function(done) {
          request(sails.hooks.http.app)
          .get('/logout')
          .expect(302)
          .expect('location', '/login', done)
        });
      done();
    });
  });


  describe('#editProfile()', function() {
    it('should edit profile', function (done) {
      request(sails.hooks.http.app)
        .post('/login')
        .send({ email: 'jan@jan.jan', pwd: 'jan' })
        .expect(302)
        .expect('location','/tasks', function(done) {
          request(sails.hooks.http.app)
          .post('/profile')
          .send({dailyTasks: 7, pick: 'no'})
          .expect(302)
          .expect('location', '/profile', done)
        });
      done();
    });
  });



});
