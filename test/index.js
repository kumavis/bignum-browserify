var test = require("tape");

var bigint = require('bigint');
var bigintB = require('../');

var a = 'deadbeefcafe';
var b = 'dead';
var c = 'beef';

function assertSame(name, fn) {
  test(name, function(t) {
    t.plan(1);
    fn(bigint, function(err, expected) {
      fn(bigintB, function(err, actual) {
        t.equal(actual, expected);
        t.end();
      })
    })
  })
}

['add', 'sub', 'mul', 'mod', 'xor', 'powm']
.forEach(function(name) {
  assertSame(name, function(bigint, cb) {
    var ba = bigint(a, 16);
    var bb = bigint(b, 16);
    var bc = bigint(c, 16);
    cb(null, ba[name](bb, bc).toString(16));
  });

  assertSame('bigint.' + name, function(bigint, cb) {
    var ba = bigint(a, 16);
    var bb = bigint(b, 16);
    var bc = bigint(c, 16);
    cb(null, bigint[name](ba, bb, bc).toString(16));
  });
});

assertSame('bitLength', function(bigint, cb) {
  var ba = bigint(a, 16);
  cb(null, ba.bitLength());
});

assertSame('toBuffer', function(bigint, cb) {
  var ba = bigint(a, 16);
  cb(null, ba.toBuffer().toString('hex'));
});

assertSame('fromBuffer', function(bigint, cb) {
  var ba = bigint(a, 16);
  cb(null, bigint.fromBuffer(ba.toBuffer()).toString(16));
});
