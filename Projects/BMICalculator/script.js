let form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let height = parseInt(document.getElementById("height").value);
  let weight = parseInt(document.getElementById("weight").value);
  let result = document.getElementById("results");

  if (isNaN(height) || height === "" || height < 0) {
    result.innerHTML = `Please enter a valid height ${height}`;
  } else if (isNaN(weight) || weight === "" || weight < 0) {
    result.innerHTML = `Please enter a valid weight ${weight}`;
  } else {
    let bmi = (weight / ((height * height) / 10000)).toFixed(2);
    result.innerHTML = bmi;
  }
});
