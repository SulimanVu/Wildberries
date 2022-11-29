// Укорачивание описания товара
const description = document.getElementsByClassName("prod__header");
const windowOuterWidth = window.innerWidth;

if (windowOuterWidth < 531) {
  for (let i = 0; i < description.length; i++) {
    description[i].innerHTML = description[i].innerText.slice(0, 44) + "...";
  }
}

// Проверка на ввод номера
window.addEventListener("DOMContentLoaded", function () {
  [].forEach.call(document.querySelectorAll("#tel"), function (input) {
    var keyCode;
    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      var matrix = "+7 (___) ___ __ __",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        new_value = matrix.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
        });
      i = new_value.indexOf("_");
      if (i != -1) {
        i < 5 && (i = 3);
        new_value = new_value.slice(0, i);
      }
      var reg = matrix
        .substr(0, this.value.length)
        .replace(/_+/g, function (a) {
          return "\\d{1," + a.length + "}";
        })
        .replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (
        !reg.test(this.value) ||
        this.value.length < 5 ||
        (keyCode > 47 && keyCode < 58)
      )
        this.value = new_value;
      if (event.type == "blur" && this.value.length < 5) this.value = "";
      if (new_value.length != 18) {
        this.setAttribute("class", "error");
      } else {
        this.removeAttribute("class");
      }
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
  });
});
//Проверка на email
let email = document.querySelector("#email");
email.addEventListener("input", (e) => {
  if (
    e.target.value.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/)
  ) {
    e.target.removeAttribute("class");
  } else {
    e.target.classList.add("error");
  }
});
// Проверка на inn
let inn = document.querySelector("#inn");
inn.addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/\D/g, "");
  if (e.target.value.length !== 12) {
    e.target.classList.add("error");
  } else {
    e.target.removeAttribute("class");
  }
});

// Проверка на текстовые поля
let text = document.querySelectorAll("#surname, #name");

for (let i = 0; i < text.length; i++) {
  text[i].addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/[0-9._=+*!@#$%^&()~`]+/, "");
    if (e.target.value == "") {
      e.target.setAttribute("class", "error");
    } else {
      e.target.removeAttribute("class");
    }
  });
}

// Оформление покупки
const button = document.getElementById("buy");
const form = document.querySelector("form");
const inputs = form.querySelectorAll("input");

button.addEventListener("click", () => {
  for (let i = 0; i < inputs.length; i++) {
    if (
      inputs[i].getAttribute("class") == "error" ||
      inputs[i].getAttribute("class") == null ||
      inputs[i].getAttribute("class") == ""
    ) {
      inputs[i].classList.add("active");
      if (windowOuterWidth < 550) {
        form.scrollIntoView({ behavior: "smooth" });
      }
    }
  }
});

// Выбрать все
const all_checkbox = document.querySelectorAll(".checkbox_container");
const keep = document.querySelector(".all");
const checkbox = keep.firstElementChild;

keep.addEventListener("click", () => {
  if (checkbox.checked === true) {
    for (let i = 0; i < all_checkbox.length - 1; i++) {
      all_checkbox[i].firstElementChild.checked = true;
    }
  } else {
    for (let i = 0; i < all_checkbox.length - 1; i++) {
      all_checkbox[i].firstElementChild.checked = false;
    }
  }
});
