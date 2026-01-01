const form = document.getElementById("contactForm");
const statusDiv = document.getElementById("status");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById("name").value,
        phone: document.getElementById("mobile").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };

    try {
        const response = await fetch("http://localhost:3000/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        // now this will work because server sends JSON
        const data = await response.json();
        console.log("Server response:", data);

        if (data.success) {
            statusDiv.style.color = "green";
            statusDiv.textContent = "✔ Message Sent Successfully!";
            form.reset();
        } else {
            statusDiv.style.color = "red";
            statusDiv.textContent = "❌ Error: " + (data.error || "Unknown error");
        }
    } catch (err) {
        console.error("Fetch error:", err);
        statusDiv.style.color = "red";
        statusDiv.textContent = "❌ Fetch failed: " + err.message;
    }
});
