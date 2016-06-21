// describe('Page model', function(){
//   describe('field', function(){
//     it('should have eight fields');
//     it('should have a findByTag method');
//     it('should have a findSimilar method');
//
//   })
//   describe('urlTitle working correctly', function(){
//     it('generate a urlTitle')
//     it('uses the hook to generate');
//     it('produces random string if no title')
//   })
// })
var expect = require('chai').expect;
var chai = require('chai');
chai.should();
chai.use(require('chai-things'));
var Page = require('../models').Page;


describe('Page model', function () {

  describe('Virtuals', function () {
    var page;
    beforeEach(function(){
      page = Page.build();
      //console.log(page);
    });
    describe('route', function () {
      it('returns the url_name prepended by "/wiki/"', function(){
        page.urlTitle = 'hello_world';
        expect(page.route).to.equal('/wiki/' + page.urlTitle);
      });
    });
    describe('renderedContent', function () {
      it('converts the markdown-formatted content into HTML',function(){
        page.content = 'this is __markdown__';
        expect(page.renderedContent).to.equal('<p>this is <strong>markdown</strong></p>\n');
      });
    });
  });



  describe('Class methods', function () {

    var page;
    var noTag;
    beforeEach(function(done){
      Page.create({
        title : "Hello",
        content : "world",
        tags : ['qwerty','happy']
      })
      .then(function(createdPage){
        page = createdPage;
        done();
      })
       .catch(done);
    });


    describe('findByTag', function () {
      //console.log(page);

      it('gets pages with the search tag', function(done){

        Page.findByTag('qwerty').then(function(pages){

          expect(pages[0].title).to.equal("Hello");
          done();
        })
        .catch(function(err){
          console.error(err);
          done(err);
        });
      });

      it('does not get pages without the search tag', function(done){

        Page.findByTag('blahah').then(function(pages){
          console.log(pages);
          expect(pages.length).to.equal(0);
          done();
        })
        .catch(function(err){
          console.error(err);
          done(err);
        });
      });

    });
  });

  describe('Instance methods', function () {
    var base;
    var shared;
    var noShared;
    beforeEach(function(done){
          Page.create({
            title : "Hello",
            content : "world",
            tags : ['qwerty','happy']
          })
          .then(function(createdPage){
            base = createdPage;
            Page.create({
              title : "shared",
              content : "hi",
              tags : ['qwerty','laslala']
            })
            .then(function(createdPage){
              shared = createdPage;
              Page.create({
                title : "nothing",
                content : "no",
                tags : ['a','asdf']
              })
              .then(function(createdPage){
                noShared = createdPage;
                done();
              })
            })
          })
           .catch(done);


    });
    describe('findSimilar', function () {
      it('never gets itself',function(done){
        base.findSimilar().then(function(returnedPages){
          expect(returnedPages).to.not.contain.a.thing.with.property('id', base.id);
          done();
        }).catch(done);
      });
      it('gets other pages with any common tags', function(done){
        base.findSimilar().then(function(returnedPages){
          expect(returnedPages).to.contain.a.thing.with.property('id', shared.id);
          done();
        }).catch(done);
      });
      it('does not get other pages without any common tags', function(done){
        base.findSimilar().then(function(returnedPages){
          expect(returnedPages).to.not.contain.a.thing.with.property('id', noShared.id);
          done();
        }).catch(done);
      });
    });
  });

  describe('Validations', function () {
    it('errors without title');
    it('errors without content');
    it('errors given an invalid status');
  });

  describe('Hooks', function () {
    it('it sets urlTitle based on title before validating');
  });

});
