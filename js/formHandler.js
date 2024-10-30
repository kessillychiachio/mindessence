document.getElementById("signupForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const birthdate = document.getElementById("birthdate").value;
  const email = document.getElementById("email").value;
  const profession = document.getElementById("profession").value;
  const feedback = document.getElementById("feedback").value;


  let valid = true;

  if (!name.trim()) {
    document.getElementById("nameError").classList.remove("hidden");
    valid = false;
  } else {
    document.getElementById("nameError").classList.add("hidden");
  }

  if (!email.includes("@")) {  // Validação específica do e-mail
    document.getElementById("emailError").classList.remove("hidden");
    valid = false;
  } else {
    document.getElementById("emailError").classList.add("hidden");
  }

  if (!profession) {
    document.getElementById("professionError").classList.remove("hidden");
    valid = false;
  } else {
    document.getElementById("professionError").classList.add("hidden");
  }

  if (!feedback.trim()) {
    document.getElementById("feedbackError").classList.remove("hidden");
    valid = false;
  } else {
    document.getElementById("feedbackError").classList.add("hidden");
  }

  if (valid) {
   
    const formData = {
      name,
      birthdate,
      email,
      profession,
      feedback,
    };
    localStorage.setItem("mindEssenceSignup", JSON.stringify(formData));
    alert("Inscrição realizada com sucesso!");

    
    document.getElementById("signupForm").reset();
  }
});
