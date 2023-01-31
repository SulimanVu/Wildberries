// Укорачивание описания товара
const description = document.getElementsByClassName("prod__header");
const windowOuterWidth = window.innerWidth;

if (windowOuterWidth < 531) {
  for (let i = 0; i < description.length; i++) {
    if (description[i].innerHTML.length > 44) {
      description[i].innerHTML = description[i].innerText.slice(0, 44) + "...";
    }
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
    if (inputs[i].getAttribute("class") == "error" || inputs[i].value == "") {
      inputs[i].classList.add("active");
      if (windowOuterWidth < 550) {
        form.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      inputs[i].classList.remove("active");
    }
  }
});

// Выбрать все
const all_checkbox = document.querySelectorAll(".checkbox_container");
const keep = document.querySelector(".all");
const checkbox = keep.firstElementChild;
// Для формирования цены
const amount = document.querySelectorAll(".amount");
const increment = document.querySelectorAll(".increment");
const decrement = document.querySelectorAll(".decrement");
const in_stock = document.querySelectorAll(".in__stock");

const prod_checkbox = document.querySelectorAll(".stock .checkbox_container");
const prod_price = document.querySelectorAll(".actual__price");
let price_number = document.querySelector(".price__number");
let current_price_number = document.querySelector(".current_price_number");
let selected = document.querySelector(".selected");
let count_bascet = document.querySelector(".h__basket");

count_bascet.firstElementChild.innerHTML = prod_checkbox.length;

let sum = 0;

for (let i = 0; i < prod_price.length; i++) {
  sum += +prod_price[i].innerHTML.replace(/ /g, "");
}

keep.addEventListener("click", () => {
  if (checkbox.checked == true) {
    for (let i = 0; i < all_checkbox.length - 1; i++) {
      all_checkbox[i].firstElementChild.checked = true;
    }
    price_number.innerHTML = parseInt(sum).toLocaleString("ru-RU");
    price_number.style.wordSpacing = "-4px";

    current_price_number.innerHTML = parseInt(sum).toLocaleString("ru-RU");
    current_price_number.style.wordSpacing = "-2px";
    current_price_number.style.textDecoration = "line-through";

    selected.innerHTML = prod_checkbox.length;
  } else {
    for (let i = 0; i < all_checkbox.length - 1; i++) {
      all_checkbox[i].firstElementChild.checked = false;
    }
    price_number.innerHTML = 0;
    current_price_number.innerHTML = 0;
    selected.innerHTML = 0;
  }
});

// Формирование цены при клике на input
for (let i = 0; i < prod_checkbox.length; i++) {
  prod_checkbox[i].firstElementChild.addEventListener("click", () => {
    if (prod_checkbox[i].firstElementChild.checked == true) {
      price_number.innerHTML =
        Number(price_number.innerHTML.replace(/ /g, "")) +
        Number(prod_price[i].innerHTML.replace(/ /g, ""));

      current_price_number.innerHTML =
        Number(current_price_number.innerHTML.replace(/ /g, "")) +
        Number(prod_price[i].innerHTML.replace(/ /g, ""));

      selected.innerHTML = +selected.innerHTML + 1;
    } else {
      price_number.innerHTML =
        Number(price_number.innerHTML.replace(/ /g, "")) -
        Number(prod_price[i].innerHTML.replace(/ /g, ""));

      current_price_number.innerHTML =
        Number(current_price_number.innerHTML.replace(/ /g, "")) -
        Number(prod_price[i].innerHTML.replace(/ /g, ""));

      selected.innerHTML = +selected.innerHTML - 1;
    }
  });
}

//Формирование цены при клике на кнопки
for (let i = 0; i < amount.length; i++) {
  increment[i].addEventListener("click", () => {
    if (+in_stock[i].innerHTML > 0) {
      in_stock[i].innerHTML = Number(in_stock[i].innerHTML) - 1;
    }
  });

  decrement[i].addEventListener("click", () => {
    in_stock[i].innerHTML = Number(in_stock[i].innerHTML) + 1;
  });
}

// Адаптив Mobile

let size = document.querySelectorAll(".prod__size");
let products = document.querySelectorAll(".stock .prod__price");
let producer = document.querySelectorAll(".producer_block");
let prod_all = document.querySelectorAll(".stock .prod__all__info");

if (windowOuterWidth < 550) {
  for (let i = 0; i < size.length; i++) {
    size[i].style.visibility = "hidden";
    size[i].style.width = 0;
    size[i].style.height = 0;
  }
  for (let i = 0; i < products.length; i++) {
    products[i].style.visibility = "hidden";
    products[i].style.width = 0;
    products[i].style.height = 0;
    producer[i].lastElementChild.style.display = "none";

    let all = document.createElement("div");
    let old_price = document.createElement("div");
    let actual_price = document.createElement("div");

    actual_price.prepend(prod_price[i].innerHTML + " сом");
    old_price.prepend(products[i].lastElementChild.innerHTML);

    all.append(actual_price, old_price);
    all.style.display = "flex";
    all.style.width = "100%";
    all.firstElementChild.style.fontSize = "16px";
    all.firstElementChild.style.marginRight = "5px";
    all.firstElementChild.style.fontWeight = 700;
    all.firstElementChild.style.wordSpacing = "-3px";

    all.lastElementChild.style.fontSize = "13px";
    all.lastElementChild.style.wordSpacing = "-2px";
    all.lastElementChild.style.textDecoration = "line-through";
    all.lastElementChild.style.borderBottom = "1px dashed #8a898e";
    all.lastElementChild.style.color = "#8a898e";

    prod_all[i].prepend(all);
  }
}

// Присвоение шрифта в зависимости от размера суммы

let font_price = document.querySelectorAll(".actual__price");

font_price.forEach((item, index) => {
  let price = Number(item.innerHTML.replace(/\s/g, ""));

  if (price > 100000) {
    item.style.fontSize = "16px";
    item.style.lineHeight = "24px";
    item.style.letterSpacing = "-0.4px";
    products[index].lastElementChild.style.letterSpacing = "-1px";
  } else {
    item.style.fontSize = "20px";
    item.style.lineHeight = "28px";
    products[index].style.marginTop = "-3px";
  }
});

//Изменение иконки меню для телефона
let menu = document.querySelector(".menu");
let menu_img = document.querySelector("#menu_img");

if (window.screen.availWidth < 400) {
  menu_img.src = "./images/mobile_burger.svg";
}
