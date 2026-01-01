/* ================= COUNTRY CODES ================= */
const countries = [
  ["🇮🇳", "+91"],
  ["🇺🇸", "+1"],
  ["🇬🇧", "+44"],
  ["🇩🇪", "+49"],
  ["🇦🇪", "+971"],
  ["🇨🇦", "+1"],
  ["🇦🇺", "+61"],
  ["🇯🇵", "+81"]
];

/* ================= DOM LOAD ================= */
document.addEventListener("DOMContentLoaded", () => {
  const cc = document.getElementById("countryCode");

  if (cc) {
    countries.forEach(c => {
      const option = document.createElement("option");
      option.value = c[1];
      option.textContent = `${c[0]} ${c[1]}`;
      cc.appendChild(option);
    });
  }

  const otherCheckbox = document.getElementById("otherService");
  const otherInput = document.getElementById("otherInput");

  if (otherCheckbox && otherInput) {
    otherCheckbox.addEventListener("change", () => {
      otherInput.style.display = otherCheckbox.checked ? "block" : "none";
    });
  }
});

/* ================= POPUP FUNCTIONS ================= */
function openPopup() {
  const popup = document.getElementById("popup");
  if (popup) popup.style.display = "flex";
}

function closePopup() {
  const popup = document.getElementById("popup");
  if (popup) popup.style.display = "none";
}

/* ================= SERVICES TOGGLE ================= */
function toggleServices() {
  const section = document.getElementById("servicesSection");
  if (!section) return;

  section.style.display =
    section.style.display === "block" ? "none" : "block";
}

/* ================= FORM SUBMIT ================= */
/* ONLY SUCCESS MESSAGE */
function submitForm() {
  alert("✅ Application sent successfully!");
  closePopup();
}
