let ul = document.querySelector(".accordion");

ul.addEventListener("click", function (e) {
  let question = e.target.closest("h3");

  if (!question) return;

  let parent = question.parentNode;
  let answer = parent.querySelector("p");

  if (answer.style.display === "block") {
    answer.style.display = "none";
    parent.classList.remove("active");
  } else {
    answer.style.display = "block";
    parent.classList.add("active");
  }
});
