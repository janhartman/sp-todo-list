var request = require('supertest');

describe('TaskController', function() {

  function verifyTask(body) {
    if (!body.tasks[0].name == "New task" || body.dailyTop)
      throw new Error("nope");
  }

  function verifyEditTask(body) {
    if (!body.tasks[0].name == "New task edited" || body.dailyTop)
      throw new Error("nope");
  }

  function verifyProductivity(body) {
    if (!body.completed.length >= 0 || !body.missed >= 0 || !body.total >= 0 || !body.productivity.length == 24) {
      throw new Error("nope");
    }
  }

  function verifyTasksAdmin(body) {
    if (!body.tasks || !body.dailyTop)
      throw new Error("nope");
  }

  describe('#addTask()', function() {
    it('should create a new task', function (done) {
      request(sails.hooks.http.app)
        .post('/login')
        .send({ email: 'jan@jan.jan', pwd: 'jan' })
        .expect(302)
        .expect('location','/tasks', function(done) {
          request(sails.hooks.http.app)
          .post('/tasks')
          .send({
            dueDate: "2017-03-04",
            priority: 5,
            name: "New task",
            description: "new task description",
            category: "Work"
          })
          .expect(200)
          .expect(verifyTask, done)
        });
      done();
    });
  });

  describe('#editTask()', function() {
    it('should edit task', function (done) {
      request(sails.hooks.http.app)
        .post('/login')
        .send({ email: 'jan@jan.jan', pwd: 'jan' })
        .expect(302)
        .expect('location','/tasks', function(done) {
          request(sails.hooks.http.app)
          .patch('/tasks')
          .send({
            id: 1,
            dueDate: "2017-03-05",
            priority: 5,
            name: "New task edited",
            description: "new task description",
            category: "Work"
          })
          .expect(200)
          .expect(verifyEditTask, done)
        });
      done();
    });
  });


  describe('#productivityData()', function() {
    it('should send productivity data', function (done) {
      request(sails.hooks.http.app)
        .post('/login')
        .send({ email: 'jan@jan.jan', pwd: 'jan' })
        .expect(302)
        .expect('location','/tasks', function(done) {
          request(sails.hooks.http.app)
          .get('/productivity/data')
          .query('period=day')
          .expect(200)
          .expect(verifyProductivity, done)
        });
      done();
    });
  });

  describe('#tasksAdmin()', function() {
    it('should send tasks for user', function (done) {
      request(sails.hooks.http.app)
        .post('/login')
        .send({ email: 'root@to.do', pwd: 'sudo' })
        .expect(302)
        .expect('location','/tasks', function(done) {
          request(sails.hooks.http.app)
          .get('/admin/tasks')
          .query('userID=2')
          .expect(200)
          .expect(verifyTasksAdmin, done)
        });
      done();
    });
  });


});
