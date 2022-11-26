// Валидация (задание масок) для телефона и ИНН
document.addEventListener("DOMContentLoaded", () => {
  const telElement = document.getElementById("tel"); // ищем наш единственный input
  const innElement = document.getElementById("inn");
  const maskOptions = {
    // создаем объект параметров
    mask: "+{7}(000)000-00-00", // задаем единственный параметр mask
  };
  const innMask = {
    mask: "000000000000",
  };
  IMask(telElement, maskOptions); // запускаем плагин с переданными параметрами
  IMask(innElement, innMask);
});

// Укорачивание описания товара
const description = document.getElementsByClassName("prod__header");
const windowOuterWidth = window.innerWidth;

if (windowOuterWidth < 531) {
  for (let i = 0; i < description.length; i++) {
    description[i].innerHTML = description[i].innerText.slice(0, 44) + "...";
  }
}

// Оформление покупки
const button = document.getElementById("buy");
const form = document.querySelector("form");
const inputs = form.querySelectorAll("input");

button.addEventListener("click", () => {
  let result = [];
  for (let i = 0; i < inputs.length; i++) {
    if (!inputs[i].value) {
      inputs[i].setAttribute("class", "error");
      if (windowOuterWidth < 550) {
        form.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      inputs[i].removeAttribute("class");
      result.push(inputs[i].value);
    }
  }

  if (result.length == 5) {
    alert("Вы успешно приобрели эти продукты");
  }
});
