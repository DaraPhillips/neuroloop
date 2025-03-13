document.getElementById("contactForm").addEventListener("submit", function (event) {
  event.preventDefault();

  emailjs.init("YOUR_USER_ID"); // Replace with your EmailJS user ID

  const serviceID = "YOUR_SERVICE_ID"; // Replace with your service ID
  const templateID = "YOUR_TEMPLATE_ID"; // Replace with your template ID

  const params = {
    name: this.name.value,
    email: this.email.value,
    subject: this.subject.value,
    message: this.message.value,
  };

  emailjs.send(serviceID, templateID, params)
    .then(() => {
      alert("Message sent successfully!");
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Failed to send message. Please try again later.");
    });
});
