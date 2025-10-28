// Підхоплюємо Chai, або створюємо мінімальний assert-шим, щоб тести не падали
let assert = (typeof window !== 'undefined' && window.chai && window.chai.assert) ? window.chai.assert : null;

if (!assert) {
  // Мінімальний shim для assert (працює без chai)
  assert = {
    equal(actual, expected, msg) {
      if (actual !== expected) throw new Error(msg || `Expected ${expected}, got ${actual}`);
    },
    deepEqual(actual, expected, msg) {
      const a = JSON.stringify(actual);
      const e = JSON.stringify(expected);
      if (a !== e) throw new Error(msg || `Expected ${e}, got ${a}`);
    },
    isNaN(value, msg) {
      if (!Number.isNaN(value)) throw new Error(msg || `Expected NaN, got ${value}`);
    },
    isUndefined(value, msg) {
      if (value !== undefined) throw new Error(msg || `Expected undefined, got ${value}`);
    },
    instanceOf(obj, Ctor, msg) {
      if (!(obj instanceof Ctor)) throw new Error(msg || `Expected instance of ${Ctor && Ctor.name}`);
    },
    fail(msg) {
      throw new Error(msg || 'Assertion failed');
    }
  };
}

describe('Test suite for lib.js', () => {
  describe('sum()', () => {
    it('returns correct sum for numbers', () => {
      assert.equal(sum(2, 3), 5);
      assert.equal(sum(-5, 10), 5);
    });

    it('handles string inputs as numbers', () => {
      assert.equal(sum('4', '6'), 10);
      assert.equal(sum('10', 5), 15);
    });

    it('returns NaN if one argument is missing', () => {
      assert.isNaN(sum(5));
    });
  });

  describe('subtract()', () => {
    it('returns correct difference', () => {
      assert.equal(subtract(10, 5), 5);
      assert.equal(subtract(0, 3), -3);
      assert.equal(subtract(-5, -5), 0);
    });

    it('handles strings as numbers', () => {
      assert.equal(subtract('10', '4'), 6);
      assert.equal(subtract('20', 5), 15);
      assert.equal(subtract(30, '10'), 20);
    });

    it('returns NaN if one argument is missing', () => {
      assert.isNaN(subtract(5));
    });
  });

  describe('pow()', () => {
    it('raises x to power n', () => {
      assert.equal(pow(2, 3), 8);
      assert.equal(pow(5, 0), 1);
      assert.equal(pow(3, 2), 9);
    });
  });

  describe('factorial()', () => {
    it('returns factorial of n', () => {
      assert.equal(factorial(5), 120);
      assert.equal(factorial(0), 1);
    });
  });

  describe('fibonacci()', () => {
    it('returns nth Fibonacci number', () => {
      assert.equal(fibonacci(1), 1);
      assert.equal(fibonacci(5), 5);
      assert.equal(fibonacci(6), 8);
    });
  });

  describe('removeByName()', () => {
    it('removes element by name', () => {
      const list = ['apple', 'banana', 'cherry'];
      const result = removeByName(list, 'banana');
      assert.deepEqual(result, ['apple', 'cherry']);
    });

    it('returns same array if name not found', () => {
      const list = ['apple', 'banana'];
      const result = removeByName(list, 'orange');
      assert.deepEqual(result, ['apple', 'banana']);
    });
  });

  describe('makeCounter()', () => {
    it('increments counter each call', () => {
      const counter = makeCounter(5);
      assert.equal(counter(), 5);
      assert.equal(counter(), 6);
      assert.equal(counter(), 7);
    });
  });

  describe('asyncMultiply()', () => {
    it('resolves with double the input', function (done) {
      this.timeout(5000);
      asyncMultiply(4).then(result => {
        assert.equal(result, 8);
        done();
      }).catch(err => done(err));
    });
  });

  describe('httpGet()', () => {
    it('fails for invalid URL', function (done) {
      this.timeout(5000);
      httpGet('https://invalid.url').then(() => {
        assert.fail('Expected error but got success');
        done();
      }).catch(err => {
        assert.instanceOf(err, Error);
        done();
      });
    });
  });

  describe('getAsyncTimerId()', () => {
    it('returns undefined immediately (due to async)', () => {
      const id = getAsyncTimerId(100);
      assert.isUndefined(id);
    });
  });
});

