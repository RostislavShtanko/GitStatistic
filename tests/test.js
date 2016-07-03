var validateName = require('../app.js').validateName;
var getDataFromIput = require('../app.js').getDataFromIput;
var requesterInstance = require('../app.js').requesterInstance;

var assert = require("assert");
var sinon = require("sinon");

describe('check name for validity', function(){
  it('Should be false if name does not begin with letter', function(){
    assert.equal(false, validateName('_asfasf'));
    assert.equal(false, validateName('1asfasf'));
    assert.equal(false, validateName('2asfasf'));
    assert.equal(false, validateName('3asfasf'));
    assert.equal(false, validateName('4asfasf'));
    assert.equal(false, validateName('5asfasf'));
    assert.equal(false, validateName('6asfasf'));
    assert.equal(false, validateName('7asfasf'));
    assert.equal(false, validateName('8asfasf'));
    assert.equal(false, validateName('9asfasf'));
    assert.equal(false, validateName('0asfasf'));
    assert.equal(false, validateName('!asfasf'));
    assert.equal(false, validateName('@asfasf'));
    assert.equal(false, validateName('#asfasf'));
    assert.equal(false, validateName('$asfasf'));
  });

  it('Should be false if name contains a space', function(){
    assert.equal(false, validateName('a b'));
    assert.equal(false, validateName(' abc'));
    assert.equal(false, validateName('abc '));
    assert.equal(false, validateName('ab ab'));
    assert.equal(false, validateName('aaaaaaaaaa f'));
  });
});

describe('Check functionos with sinon', function() {
  it('Should call validator once', function() {
    var validateNameSpy = sinon.spy(validateName);
    var requireStub = sinon.stub(requesterInstance, 'requestToGithub');

    getDataFromIput("aaa", validateNameSpy);

    requireStub.restore();
    sinon.assert.calledOnce(validateNameSpy);
  });

  it('Should call validator before requester', function() {
    var requireStub = sinon.stub(requesterInstance, 'requestToGithub');
    var validateNameSpy = sinon.spy(validateName);

    getDataFromIput("aaa", validateNameSpy);

    requireStub.restore();
    validateNameSpy.calledBefore(requireStub);
  });
})
