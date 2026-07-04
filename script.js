const faqItems = document.querySelectorAll(".faq-item");
const paymentForm = document.querySelector("#paymentForm");
const contactInput = document.querySelector("#contact");
const formMessage = document.querySelector("#formMessage");
const fatMascot = document.querySelector(".fat-mascot");

faqItems.forEach((item) => {
  const button = item.querySelector(".faq-question");

  button.addEventListener("click", () => {
    const isOpen = item.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
  });
});

fatMascot.addEventListener("error", () => {
  fatMascot.closest(".hero-visual").classList.add("is-fallback");
});

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

function setFormMessage(text, type) {
  formMessage.textContent = text;
  formMessage.className = `form-message ${type ? `is-${type}` : ""}`.trim();
}

paymentForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const contact = contactInput.value.trim();
  const isValidContact = isValidEmail(contact) || isValidPhone(contact);

  if (!isValidContact) {
    setFormMessage("FAT требует нормальный email или телефон. Магией оплату не отправим.", "error");
    contactInput.focus();
    return;
  }

  setFormMessage("Контакт принят. Сейчас покажем инструкцию после оплаты.", "success");

  // TODO: передать contact в платёжный шлюз ЮKassa / CloudPayments / Prodamus.
  // TODO: после подтверждения оплаты вызвать Telegram-бота для выдачи доступа.
  window.setTimeout(() => {
    window.location.hash = "success";
  }, 700);
});
