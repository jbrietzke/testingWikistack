var supertest = require('supertest');
var app = require('../app');
var agent = supertest.agent(app);
var Page = require('../models').Page;


describe('http requests', function () {

  describe('GET /wiki', function () {
  it('gets 200 on index', function (done) {
    agent
    .get('/wiki')
    .expect(200, done);
  });
});

  describe('GET /wiki/add', function () {
    it('responds with 200', function(done){
      agent.get('/wiki/add')
      .expect(200, done);
    });
  });

  describe('GET /wiki/:urlTitle', function () {

    beforeEach(function(done){
      Page.create({
        title : 'hello',
        content : 'here is the content',
        status : 'open',
      }).then(function(createdPage){
        done();
      }).catch(done);
    })

    it('responds with 404 on page that does not exist', function(done){
      agent.get('/wiki/fakeTitle')
      .expect(404, done);
    });


    it('responds with 200 on page that does exist', function(done){
      agent.get('/wiki/hello')
      .expect(200, done);
    });
  });



  describe('GET /wiki/search', function () {
    it('responds with 200', function(done){
      agent.get('/wiki/search')
      .expect(200, done);
    });
  });

  describe('GET /wiki/:urlTitle/similar', function () {
    beforeEach(function(done){
      Page.create({
        title : 'hello',
        content : 'world is worldy',
        status : 'open',
        tags : ['test', 'work']
      }).then(function(createdPage){
        done();
      }).catch(done);
    })

    it('responds with 404 for page that does not exist', function(done){
      agent.get('/wiki/fakeTitle/similar')
      .expect(404, done);
    });

    it('responds with 200 for similar page', function(done){
      agent.get('/wiki/hello/similar')
      .expect(200, done);
    });
  });

  describe('POST /wiki', function () {
    it('responds with 302', function(done){
      agent.post('/wiki')
      .send({title : 'hello', content : 'hope for us', status : 'open', name : 'Elliott', email : 'apple@apple.com'})
      .expect(302, done);
    });
    it('creates a page in the database');
  });

});
