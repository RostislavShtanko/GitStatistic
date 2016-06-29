var validateName = require('../app.js').validateName;
console.log(validateName(1));

var assert = require("assert")
     describe('#indexOf()', function(){
         it('Should be false if name does not begin with letter', function(){
             assert.equal(false, validateName('_asfasf'));
             assert.equal(false, validateName('1asfasf'));
             assert.equal(false, validateName('2asfasf'));
}) })
