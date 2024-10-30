function loadHTML(id, filePath) {
  fetch(filePath)
    .then(response => {
      if (!response.ok) throw new Error("Erro ao carregar o arquivo");
      return response.text();
    })
    .then(data => {
      document.getElementById(id).innerHTML = data;
    })
    .catch(error => console.error("Erro ao carregar o arquivo HTML:", error));
}

window.onload = function () {
  loadHTML("header", "/pages/header.html");
  loadHTML("footer", "/pages/footer.html");
};
