let essentialOilCount = 1;

// Função para adicionar novos campos de óleo essencial dinamicamente
function addEssentialOil() {
  const container = document.getElementById("essential-oils-container");

  const newOilEntry = document.createElement("div");
  newOilEntry.classList.add("essential-oil-entry", "flex", "items-center", "space-x-2", "mb-2");

  newOilEntry.innerHTML = `
    <select class="essential-oil w-full p-2 border rounded-lg">
      <option value="lavanda">Lavanda - Relaxamento</option>
      <option value="tea tree">Tea Tree - Antibacteriano</option>
      <option value="hortelã">Hortelã - Refrescante</option>
      <option value="alecrim">Alecrim - Estimulante</option>
    </select>
  `;

  container.appendChild(newOilEntry);
}

function calculateBlend() {
  const totalVolume = parseFloat(document.getElementById("total-volume").value);
  const concentrationPercent = parseFloat(document.getElementById("concentration").value);

  if (isNaN(totalVolume) || isNaN(concentrationPercent)) {
    document.getElementById("result").textContent = "Por favor, insira um volume e uma concentração válidos.";
    return;
  }

  // Calcula o limite de gotas com base na concentração desejada e volume total
  const maxDrops = Math.floor((totalVolume * concentrationPercent) / 100 * 20); // 20 gotas por ml como estimativa

  const essentialOilEntries = document.querySelectorAll(".essential-oil-entry");

  // Divide as gotas igualmente entre os óleos essenciais selecionados
  const dropsPerOil = Math.floor(maxDrops / essentialOilEntries.length);

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `<p><strong>Volume Total:</strong> ${totalVolume} ml</p>`;
  resultDiv.innerHTML += `<p><strong>Concentração:</strong> ${concentrationPercent}%</p>`;
  resultDiv.innerHTML += `<p><strong>Gotas Permitidas por Óleo Essencial:</strong> ${dropsPerOil} gotas</p>`;

  essentialOilEntries.forEach(entry => {
    const selectedOil = entry.querySelector(".essential-oil").value;
    resultDiv.innerHTML += `<p>${dropsPerOil} gotas de ${selectedOil}</p>`;
  });
}
