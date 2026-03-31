let hexCode = "0123456789ABCDEF";

let start = document.querySelector("#start");
let stop = document.querySelector("#stop");

let changeColor = function () {
  let randomColor = "#";
  for (let i = 1; i <= 6; i++) {
    let randomNum = Math.floor(Math.random() * 16);
    randomColor += hexCode[randomNum];
  }
  document.body.style.backgroundColor = randomColor;
};

let id = null;
start.addEventListener("click", function (e) {
  if (id !== null) return;

  id = setInterval(changeColor, 500);
});

stop.addEventListener("click", function (e) {
  clearInterval(id);
  id = null;
});
