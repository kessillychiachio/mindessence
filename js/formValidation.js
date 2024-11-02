document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm");

  const nameInput = document.getElementById("name");
  const birthdateInput = document.getElementById("birthdate");
  const emailInput = document.getElementById("email");
  const professionInput = document.getElementById("profession");
  const feedbackInput = document.getElementById("feedback");

  const nameError = document.getElementById("nameError");
  const birthdateError = document.getElementById("birthdateError");
  const emailError = document.getElementById("emailError");
  const professionError = document.getElementById("professionError");
  const feedbackError = document.getElementById("feedbackError");

  const showError = (input, errorElement, message) => {
    errorElement.textContent = message;
    errorElement.classList.remove("hidden");
    input.classList.add("border-red-500");
  };

  const hideError = (input, errorElement) => {
    errorElement.classList.add("hidden");
    input.classList.remove("border-red-500");
  };

  const validateName = () => {
    const name = nameInput.value.trim();
    if (name.length < 6) {
      showError(nameInput, nameError, "O nome deve ter pelo menos 6 caracteres.");
      return false;
    } else {
      hideError(nameInput, nameError);
      return true;
    }
  };

  const validateBirthdate = () => {
    const birthdate = birthdateInput.value;
    const birthDateObj = new Date(birthdate);
    const today = new Date();
    const age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    const dayDiff = today.getDate() - birthDateObj.getDate();

    const isOver18 =
      age > 18 || (age === 18 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)));

    if (!isOver18) {
      showError(birthdateInput, birthdateError, "Você deve ter pelo menos 18 anos para se inscrever.");
      return false;
    } else {
      hideError(birthdateInput, birthdateError);
      return true;
    }
  };

  const validateEmail = () => {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showError(emailInput, emailError, "Por favor, insira um e-mail válido no formato correto.");
      return false;
    } else {
      hideError(emailInput, emailError);
      return true;
    }
  };

  const validateProfession = () => {
    const profession = professionInput.value;
    if (profession === "") {
      showError(professionInput, professionError, "Escolha uma área de atuação.");
      return false;
    } else {
      hideError(professionInput, professionError);
      return true;
    }
  };

  const validateFeedback = () => {
    const feedback = feedbackInput.value.trim();
    if (feedback.length < 20) {
      showError(feedbackInput, feedbackError, "A descrição deve ter pelo menos 20 caracteres para ser válida.");
      return false;
    } else {
      hideError(feedbackInput, feedbackError);
      return true;
    }
  };

  nameInput.addEventListener("blur", validateName);
  birthdateInput.addEventListener("blur", validateBirthdate);
  emailInput.addEventListener("blur", validateEmail);
  professionInput.addEventListener("blur", validateProfession);
  feedbackInput.addEventListener("blur", validateFeedback);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const isNameValid = validateName();
    const isBirthdateValid = validateBirthdate();
    const isEmailValid = validateEmail();
    const isProfessionValid = validateProfession();
    const isFeedbackValid = validateFeedback();

    if (isNameValid && isBirthdateValid && isEmailValid && isProfessionValid && isFeedbackValid) {

      const formData = {
        name: nameInput.value.trim(),
        birthdate: birthdateInput.value,
        email: emailInput.value.trim(),
        profession: professionInput.value,
        feedback: feedbackInput.value.trim(),
      };
      localStorage.setItem("signupData", JSON.stringify(formData));
      
      form.submit();
    }
  });
});
