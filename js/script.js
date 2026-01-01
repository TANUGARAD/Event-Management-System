/* ================= COUNTRY CODES ================= */
const countries = [
  ["🇮🇳", "+91"], ["🇺🇸", "+1"], ["🇬🇧", "+44"],
  ["🇩🇪", "+49"], ["🇦🇪", "+971"], ["🇨🇦", "+1"],
  ["🇦🇺", "+61"], ["🇯🇵", "+81"]
];

document.addEventListener("DOMContentLoaded", () => {
  const cc = document.getElementById("countryCode");
  countries.forEach(c => {
    const o = document.createElement("option");
    o.value = c[1];
    o.textContent = `${c[0]} ${c[1]}`;
    cc.appendChild(o);
  });

  const otherCheckbox = document.getElementById("otherService");
  const otherInput = document.getElementById("otherInput");
  otherCheckbox.addEventListener("change", () => {
    otherInput.style.display = otherCheckbox.checked ? "block" : "none";
  });
});

function openPopup() { document.getElementById("popup").style.display = "flex"; }
function closePopup() { document.getElementById("popup").style.display = "none"; }
function toggleServices() {
  const section = document.getElementById("servicesSection");
  section.style.display = section.style.display === "block" ? "none" : "block";
}

async function submitForm() {
  try {
    const name = document.getElementById("fullName").value.trim();
    const company = document.getElementById("companyName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("countryCode").value +
                  document.getElementById("phone").value.trim();

    if (!name || !company || !email) {
      alert("Please fill all required fields");
      return;
    }

    const services = [];
    document.querySelectorAll(".services-section input[type=checkbox]:checked")
      .forEach(cb => { if(cb.id!=="otherService") services.push(cb.value) });

    const otherChecked = document.getElementById("otherService").checked;
    const otherValue = document.getElementById("otherInput").value.trim();
    if(otherChecked && otherValue) services.push(otherValue);

    if(services.length===0){ alert("Select at least one service"); return; }

    const payload = { name, company, email, phone, services };

    const response = await fetch("http://localhost:3000/send-enquiry", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(payload)
    });

    const result = await response.json();

    if(!response.ok || !result.success){
      console.error("Server error:", result.error || result.message);
      throw new Error(result.error || "Mail failed");
    }

    alert("✅ Enquiry sent successfully!");
    closePopup();

  } catch(error){
    console.error("❌ Frontend error:", error);
    alert("❌ Error occurred while sending mail. Check server console.");
  }
}
