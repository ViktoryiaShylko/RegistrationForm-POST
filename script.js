let name = document.querySelector("#name");
let surname = document.querySelector("#surname");
let login = document.querySelector("#login");
let password = document.querySelector("#password");
let email = document.querySelector("#email");
let age = document.querySelector("#age");
let phoneNumber = document.querySelector("#phoneNumber");
let btn = document.querySelector(".btn");
let errors = [];
let user;

function checkValidity(input) {
  let validity = input.validity;
  if (validity.valueMissing) {
    errors.push(`Type your ${input.placeholder}`);
    input.value = "";
  }
  if (validity.tooShort) {
    errors.push(`Password should contain 6 or more symbols`);
    input.value = "";
  }

  if (validity.patternMismatch) {
    errors.push(`Invalid format for ${input.placeholder}`);
    input.value = "";
  }
}

btn.addEventListener("click", function (e) {
  e.preventDefault();
  errors = [];
  let inputs = document.querySelectorAll("input");
  for (let input of inputs) {
    checkValidity(input);
  }
  let errorDiv = document.querySelector("#errorsInfo");
  errorDiv.innerHTML = errors.join(". <br>");

  user = {
    name: name.value,
    surname: surname.value,
    login: login.value,
    password: password.value,
    email: email.value,
    age: age.value,
    phoneNumber: phoneNumber.value,
  };
  post();
  console.log(errors);
});

async function post() {
  fetch("https://httpbin.org/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((user) => {
      console.log(user);
    })
    .catch((error) => console.log(error));
}