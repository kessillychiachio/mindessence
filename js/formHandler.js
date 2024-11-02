document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = {
      name: document.getElementById("name").value.trim(),
      birthdate: document.getElementById("birthdate").value,
      email: document.getElementById("email").value.trim(),
      profession: document.getElementById("profession").value,
      feedback: document.getElementById("feedback").value.trim(),
    };

    localStorage.setItem("signupData", JSON.stringify(formData));

    displaySuccessMessage("Inscrição salva com sucesso! Obrigado por participar.");

    form.reset();
  });

  function displaySuccessMessage(message) {
    const successMessage = document.createElement("p");
    successMessage.textContent = message;
    successMessage.classList.add("text-green-500", "text-center", "mt-4");

    form.appendChild(successMessage);

    setTimeout(() => {
      successMessage.remove();
    }, 5000);
  }
});
