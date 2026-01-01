document.getElementById("careerForm1").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form); // IMPORTANT

  try {
    const response = await fetch("http://localhost:5000/api/joinus", {
      method: "POST",
      body: formData // NO headers
    });

    const result = await response.json();

    if (result.success) {
      alert("Application submitted successfully ✅");
      form.reset();
      document.getElementById("pop1").style.display = "none";
    } else {
      alert(result.message || "Something went wrong");
    }

  } catch (error) {
    console.error("Frontend Error:", error);
    alert("Server error. Please try again later.");
  }
});

/* ===== Popup Controls ===== */
document.getElementById("closeBtn1").onclick = () => {
  document.getElementById("pop1").style.display = "none";
};

document.getElementById("cancelBtn1").onclick = () => {
  document.getElementById("pop1").style.display = "none";
};
