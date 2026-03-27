let buttons = document.querySelectorAll(".button");

buttons.forEach(function (button) {
  button.addEventListener("click", function (e) {
    if (button.id === "grey") {
      document.body.style.backgroundColor = `${button.id}`;
    } else if (button.id === "white") {
      document.body.style.backgroundColor = button.id;
    } else if (button.id === "yellow") {
      document.body.style.backgroundColor = button.id;
    } else if (button.id === "blue") {
      document.body.style.backgroundColor = button.id;
      }
      
  });
});
