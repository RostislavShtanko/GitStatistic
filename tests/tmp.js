var sinon = require("sinon");

describe('check bar calling', function(){
  it('should call bar once', function() {
    var barSpy = sinon.spy(bar);

    foo("aaa", barSpy);

    //barSpy.restore();
    sinon.assert.calledOnce(barSpy);
  });
});

function foo(arg, barFn) {
  console.log("Hello from foo " + arg);
  barFn(arg);
}

function bar(arg) {
  console.log("Hellof from bar " + arg);
}
