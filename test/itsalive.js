console.log("We are live!");
var expect = require('chai').expect;
var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);

// describe("Simple Test", function(){
//   it('expects 2 + 2 to equal 4', function(){
//     var result = 2 + 2;
//     expect(result).to.equal(4);
//   })
// });
//
// describe("set setTimeout works", function(){
//    it('confirms setTimeout\'s timer accuracy', function (done) {
//   var start = new Date();
//   setTimeout(function () {
//     var duration = new Date() - start;
//     expect(duration).to.be.closeTo(1000, 50);
//     done();
//   }, 1000);
//   });
// });
//
// describe('spying on forEach function', function(){
//   it('should be called the same amount of times as length of the array', function(){
//     var array = [1,2,3,4];
//     var X = function (){};
//     X = chai.spy(X);
//     array.forEach(X);
//     //var spy = chai.spy.on(array, 'forEach')
//     expect(X).to.have.been.called(array.length);
//   })
// })
