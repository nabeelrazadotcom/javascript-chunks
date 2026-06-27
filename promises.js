let promise = new Promise(function (resolve, reject) {
  setTimeout(function () {
    let success = true;
    if (success) {
      resolve("Task completed after 2 seconds.");
    } else {
      reject("Task Rejected.");
    }
  }, 0);
});

promise
  .then(function (result) {
    console.log(result);
  })
  .catch(function (result) {
    console.log(result);
  });

async function hello() {
  console.log("Hello, world!");
}

// console.log(hello())

fetch("https://randomuser.me/api/")
    .then((resp) => resp.json())
    .then((content) => console.log(content['results'][0]['name']))
    .catch((error) => console.log("Error: ", error))

async function test() {
    let data = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
    console.log(data);
}

test()