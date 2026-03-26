// Arrow function
const sum = (m, n) => {
  return m + n;
};

let arr = [3, 4, 5, 6, 7, 8, 9];

function sqr(x) {
  console.log(x ** 2);
}

arr.forEach(function (value) {
  console.log(value ** 3);
});
