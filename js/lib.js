function sum(a, b) {
  return Number(a) + Number(b);
}

function subtract(a, b) {
  return Number(a) - Number(b);
}

function pow(x, n) {
  let result = 1;
  for (let i = 0; i < n; i++) {
    result *= x;
  }
  return result;
}

function factorial(n) {
  return n ? n * factorial(n - 1) : 1;
}

function fibonacci(n) {
  return n > 2 ? fibonacci(n - 1) + fibonacci(n - 2) : 1;
}

function removeByName(list, name) {
  const result = [...list];
  const index = result.indexOf(name);
  if (index !== -1) {
    result.splice(index, 1);
  }
  return result;
}

function makeCounter(currentCount) {
  return function () {
    return currentCount++;
  };
}

function getAsyncTimerId(time) {
  let timerId;
  setTimeout(() => {
    timerId = Math.floor(Date.now() / 1000);
  }, time);
  return timerId;
}

function asyncMultiply(x) {
  return new Promise(resolve => {
    setTimeout(() => resolve(2 * x), 3000);
  });
}

function httpGet(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.responseText);
      } else {
        const error = new Error(xhr.statusText);
        error.code = xhr.status;
        reject(error);
      }
    };
    xhr.onerror = () => reject(new Error('Network Error'));
    xhr.send();
  });
}

window.sum = sum;
window.subtract = subtract;
window.pow = pow;
window.factorial = factorial;
window.fibonacci = fibonacci;
window.removeByName = removeByName;
window.makeCounter = makeCounter;
window.getAsyncTimerId = getAsyncTimerId;
window.asyncMultiply = asyncMultiply;
window.httpGet = httpGet;