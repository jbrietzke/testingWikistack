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
var Page = require('../models').Page;


describe('Page model', function () {

  describe('Virtuals', function () {
    var page;
    beforeEach(function(){
      page = Page.build();
      console.log(page);
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
    describe('findByTag', function () {
      it('gets pages with the search tag');
      it('does not get pages without the search tag');
    });
  });

  describe('Instance methods', function () {
    describe('findSimilar', function () {
      it('never gets itself');
      it('gets other pages with any common tags');
      it('does not get other pages without any common tags');
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
