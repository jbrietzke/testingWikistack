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
var spies = require('chai-spies');
chai.use(spies)
chai.use(require('chai-as-promised'));
var Page = require('../models').Page;
var Promise = require('bluebird');



describe('Page model', function () {

  xdescribe('Virtuals', function () {
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



  xdescribe('Class methods', function () {

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

  xdescribe('Instance methods', function () {
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


    xdescribe('findSimilar', function () {
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

  xdescribe('Validations', function () {
    it('errors without title', function(done){
      Page.create({content: 'thing', status: 'open'}).should.be.rejected.notify(done);
    });
    it('errors without content', function(done){
      Page.create({title: 'thing', status: 'open'}).should.be.rejected.notify(done);
    });
    it('errors given an invalid status',function(done){
      Page.create({title: 'hellow', content: 'thing', status: 'asdf'}).should.be.rejected.notify(done);
    });
  });

  describe('Hooks', function () {
    var page;
    beforeEach(function(done){
      page = Page.build({
        title: '',
        content: 'test',
        status: 'open',
      });
    });
    it('it sets urlTitle based on title before validating', function(){
      // Page.create({title: 'hello', content: 'thing', status: 'open'})
      // .then(function(createdPage){
      //   createdPage.should.have.property('urlTitle')
      // })
      //
      expect(page).to.have.property('urlTitle');

      // var pageCreatingNoTitle = Page.create({title: '', content: 'thing', status: 'open'})
      // return Promise.all([pageCreating, pageCreatingNoTitle]).spread(function(title, noTitle){
      //   title.should.eventually.have.property('urlTitle').that.equals('hellow')
      //   noTitle.should.eventually.have.property('urlTitle')
      // }).catch(done)
    });
  });

});
