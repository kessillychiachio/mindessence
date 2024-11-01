function loadHTML(id, filePath) {
  fetch(filePath)
    .then(response => {
      if (!response.ok) throw new Error("Erro ao carregar o arquivo");
      return response.text();
    })
    .then(data => {
      document.getElementById(id).innerHTML = data;
      console.log(`${id} carregado com sucesso`);

      if (id === "header") {
        const currentPath = window.location.pathname;
        console.log("Caminho atual:", currentPath);

        document.querySelectorAll(".nav-link").forEach(link => {
          console.log("Verificando link:", link.getAttribute("href"));
          if (link.getAttribute("href") === currentPath) {
            link.classList.add("text-darkAccent", "font-bold");
            console.log("Classe ativa adicionada ao link:", link);
          }
        });

        const toggleButton = document.getElementById("menu-toggle-button");
        const mobileMenu = document.getElementById("mobile-menu");

        if (toggleButton) {
          toggleButton.addEventListener("click", function () {
            mobileMenu.classList.toggle("hidden");
            mobileMenu.classList.toggle("flex");
          });
          console.log("Funcionalidade de menu sanduíche configurada");
        }
      }
    })
    .catch(error => console.error("Erro ao carregar o arquivo HTML:", error));
}

window.onload = function () {
  loadHTML("header", "/pages/header.html");
  loadHTML("footer", "/pages/footer.html");
};
