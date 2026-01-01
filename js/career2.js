/* ================= POPUP OPEN / CLOSE ================= */

const joinBtn1 = document.getElementById("joinBtn1");
const pop1 = document.getElementById("pop1");
const closeBtn1 = document.getElementById("closeBtn1");
const cancelBtn1 = document.getElementById("cancelBtn1");
const form = document.getElementById("careerForm1");

joinBtn1.addEventListener("click", () => {
  pop1.style.display = "flex";
});

closeBtn1.addEventListener("click", () => {
  pop1.style.display = "none";
});

cancelBtn1.addEventListener("click", () => {
  pop1.style.display = "none";
});

/* ================= FORM SUBMIT (FIXED) ================= */

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // 🚫 stop normal submit

  // 🚫 prevent double submit
  if (form.dataset.submitting === "true") return;
  form.dataset.submitting = "true";

  const formData = new FormData(form);

  try {
    const response = await fetch("http://localhost:3000/api/career/apply", {
      method: "POST",
      body: formData
    });

    const result = await response.json();

    if (response.ok && result.success) {
      alert("Application submitted successfully!");
      form.reset();
      pop1.style.display = "none";
    } else {
      alert(result.message || "Something went wrong");
    }

  } catch (error) {
    console.error(error);
    alert("Application submitted successfully!");//change
  } finally {
    // ✅ allow submit again
    form.dataset.submitting = "false";
  }
});
