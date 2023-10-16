// Валидация телефона
const telInpEl = document.querySelector(
  ".constructor__menu-constructor__order-menu__input-phone"
);
const nameInpEl = document.querySelector(
  ".constructor__menu-constructor__order-menu__input-name"
);
// console.log(naem)
$(function () {
  $(telInpEl).mask("+7(999)-999-99-99");
});

// telInpEl.addEventListener("input", () => console.log(telInpEl.value));

// вызов модалки
const modal = document.querySelector(".modal-window");
const btn = document.querySelector(
  ".constructor__menu-constructor__order-menu__button-order"
);
const span = document.querySelector(".modal-window__modal-content__close");

btn.onclick = function () {
  if (nameInpEl.value.length) {
    nameInpEl.style.border = "1px solid green";
  } else {
    nameInpEl.style.border = "1px solid red";
  }

  if (telInpEl.value.length === 17) {
    telInpEl.style.border = "1px solid green";
  } else {
    telInpEl.style.border = "1px solid red";
  }

  if (nameInpEl.value.length && telInpEl.value.length === 17) {
    modal.style.display = "block";
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    sumElement.textContent = `${litresPrice} ₽`;
    otherProductsPrice = 0;
    imgEls.forEach((img) => {
      img.classList.remove("show");
    });
  }
};

span.onclick = function () {
  modal.style.display = "none";
};

// анимация и сумма

const checkboxes = document.querySelectorAll(
  ".constructor__menu-constructor__other-product__other-item__description-other-product__check-product"
);
const sumElement = document.querySelector(
  ".constructor__menu-constructor__order-menu__sum-order span"
);

const checkboxesContainer = document.querySelector(
  ".constructor__menu-constructor__other-product"
);
const imgEls = document.querySelectorAll(
  ".constructor__menu-constructor__preview-window-product__ten-img"
);

let litresPrice = 15000;
let otherProductsPrice = 0;

checkboxesContainer.addEventListener("change", function (event) {
  if (
    event.target.matches(
      ".constructor__menu-constructor__other-product__other-item__description-other-product__check-product"
    )
  ) {
    const checkbox = event.target;
    const isChecked = checkbox.checked;
    const priceElement = parseInt(checkbox.dataset.value);
    if (isChecked) {
      otherProductsPrice += priceElement;
    } else {
      otherProductsPrice -= priceElement;
    }
    recalculateSum();

    const imgEl = imgEls[checkbox.dataset.index];
    imgEl.classList.toggle("show", checkbox.checked);
  }
});

const select = document.querySelector(
  ".constructor__menu-constructor__order-menu__select-litres-list"
);
const mainImgEl = document.querySelector(
  ".constructor__menu-constructor__preview-window-product__main-ten-img"
);

select.addEventListener("change", function (event) {
  const selectedOption = event.target.options[event.target.selectedIndex];
  const newSrc = selectedOption.dataset.src;

  if (newSrc) {
    mainImgEl.src = newSrc;
  }

  litresPrice = parseInt(selectedOption.dataset.value);
  recalculateSum();
});

function recalculateSum() {
  const totalSum = litresPrice + otherProductsPrice;
  sumElement.textContent = `${totalSum} ₽`;
}
