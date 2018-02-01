//Test Case for Assignment6.
const expect = require("chai").expect;
const sinon = require('sinon');
const readline = require("readline");
const index = require("../index");

describe("Test the createInterface method of readline", function() {
  it("should be called only once", function() {
    let spyCreateInterface = sinon.spy(readline, "createInterface");
    index.exec();
    readline.createInterface.restore();
    sinon.assert.calledOnce(spyCreateInterface);
  });
});
describe("Test the on() method of readline interface for line event", function() {
  it("should be called", function() {
    let stub = sinon.stub(readline.Interface.prototype, "on");
    index.exec();
    sinon.assert.called(stub);
    readline.Interface.prototype.on.restore();
    sinon.assert.calledWith(stub, "line");
  });
});
describe("Test the close() method of readline interface for close event", function() {
  it("should be called", function() {
    let stub = sinon.stub(readline.Interface.prototype, "on");
    index.exec();
    readline.Interface.prototype.on.restore();
    sinon.assert.calledWith(stub, "close");
  });
});
describe("Assignment6 - Test code for correct output", function() {
  it ("Matches the desired output of object values as per given input test case", function(done) {
    index.exec();
    var string="world";
    setTimeout(function(){
      console.log(index.descdata[0]);
      expect(index.descdata[0].toLowerCase()).to.deep.equal(string);
    },5000);
    done();
  });
});
describe("Assignment6 - Test code for correct output", function() {
  it ("Matches the desired output of object values as per given input test case", function(done) {
    index.exec();
    var string = "argentina";
   setTimeout(function(){
    expect(index.ascdata[0].toLowerCase()).to.deep.equal(string);
  },5000);
    done();
  });
});
describe("Assignment6 - Test code for verify the manipulated data", function() {
  it ("Matches the desired output of object values as per given input test case", function(done) {
    index.exec();
    expect(index.countries[7]).to.have.property("area", 1000);
  done();
  });
});



describe("Testing for existence of Array.map() and Array.sort() methods", function() {
  let sandbox = '';
  beforeEach(function() {
    sandbox = sinon.sandbox.create();
  })

  it("should be called map()", function(done) {
    let stub = sandbox.stub(Array.prototype, "map");
    index.exec();
    setTimeout(function() {
      sinon.assert.called(stub);
    }, 10000);

    done();
  });
  
  it("should be called sort()", function(done) {
    let stub = sandbox.stub(Array.prototype, "sort");
    //index.exec();
    setTimeout(function() {
      sinon.assert.called(stub);
    }, 10000);

    done();
  });
  
  afterEach(function() {
    sandbox.restore();
  });
});

describe("Assignment6 - Test code for correct output", function() {
  it("Test whether the output of ascending data is array or not", function(done) {
    expect(Array.isArray(index.ascdata)).to.deep.equal(true);
    done();
  });

  it("Test whether the output of descendiing data is array or not", function(done) {
    expect(Array.isArray(index.descdata)).to.deep.equal(true);
    done();
  });
});