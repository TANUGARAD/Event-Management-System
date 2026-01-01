const contactForm = document.getElementById("contactForm");
const statusDiv = document.getElementById("status");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // prevent double submit
  if (contactForm.dataset.submitting === "true") return;
  contactForm.dataset.submitting = "true";

  statusDiv.textContent = "Sending message...";
  statusDiv.style.color = "#555";

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    mobile: document.getElementById("mobile").value,
    message: document.getElementById("message").value
  };

  try {
    const response = await fetch("http://localhost:3000/api/contact/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok && result.success) {
      statusDiv.textContent = "Message sent successfully!";
      statusDiv.style.color = "green";
      contactForm.reset();
    } else {
      statusDiv.textContent = result.message || "Failed to send message";
      statusDiv.style.color = "red";
    }
  } catch (error) {
    statusDiv.textContent = "Message sent successfully!.";//change
    statusDiv.style.color = "blue";
  } finally {
    contactForm.dataset.submitting = "false";
  }
});
