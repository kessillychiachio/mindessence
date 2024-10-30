function loadHTML(id, filePath) {
  fetch(filePath)
    .then(response => {
      if (!response.ok) throw new Error("Erro ao carregar o arquivo");
      return response.text();
    })
    .then(data => {
      document.getElementById(id).innerHTML = data;
      console.log(`${id} carregado com sucesso`);

      // Adicionar classe ativa ao link da página atual após carregar o conteúdo
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
      }
    })
    .catch(error => console.error("Erro ao carregar o arquivo HTML:", error));
}

window.onload = function () {
  loadHTML("header", "/pages/header.html");
  loadHTML("footer", "/pages/footer.html");
};
