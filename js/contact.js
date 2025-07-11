const form = document.getElementById("contactForm");
const captchaCodeEl = document.getElementById("captchaCode");
const captchaInput = document.getElementById("captchaInput");
const statusMsg = document.getElementById("status");

// Generuj CAPTCHA
function generateCaptcha() {
  const code = Math.random().toString(36).substring(2, 8);
  captchaCodeEl.textContent = code;
  return code;
}

let currentCaptcha = generateCaptcha();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Walidacja CAPTCHA
  if (captchaInput.value.trim() !== currentCaptcha) {
    statusMsg.textContent = "Błędny kod CAPTCHA. Spróbuj ponownie.";
    statusMsg.classList.remove("hidden");
    currentCaptcha = generateCaptcha();
    captchaInput.value = "";
    return;
  }

  // Jeśli wszystko OK
  statusMsg.textContent = "Wiadomość została wysłana (symulacja).";
  statusMsg.classList.remove("hidden");
  statusMsg.style.color = "green";

  form.reset();
  currentCaptcha = generateCaptcha();
});
