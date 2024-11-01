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
      <option value="hortelã">Hortelã-pimenta - Refrescante</option>
      <option value="alecrim">Alecrim - Estimulante</option>
    </select>
  `;

  container.appendChild(newOilEntry);
}

// Remove opção de Hortelã se o destinatário for criança
document.getElementById("user").addEventListener("change", function () {
  const essentialOilSelectors = document.querySelectorAll(".essential-oil");
  const isChild = document.getElementById("user").value === "criança";

  essentialOilSelectors.forEach(select => {
    // Verifica se Hortelã está na lista
    const peppermintOption = Array.from(select.options).find(option => option.value === "hortelã");

    if (isChild && peppermintOption) {
      select.removeChild(peppermintOption); // Remove Hortelã
      document.getElementById("result").textContent = "Aviso: Óleo de Hortelã não é permitido para crianças devido a possíveis irritações.";
    } else if (!isChild && !peppermintOption) {
      // Reinsere a opção de Hortelã se o destinatário não for criança
      const newOption = document.createElement("option");
      newOption.value = "hortelã";
      newOption.textContent = "Hortelã-pimenta - Refrescante";
      select.appendChild(newOption);
    }
  });
});

function calculateBlend() {
  const totalVolume = parseFloat(document.getElementById("total-volume").value);
  const concentrationPercent = parseFloat(document.getElementById("concentration").value);
  const carrierOil = document.getElementById("carrier-oil").value;

  if (isNaN(totalVolume) || isNaN(concentrationPercent)) {
    document.getElementById("result").textContent = "Por favor, insira um volume e uma concentração válidos.";
    return;
  }

  // Definindo os benefícios e contra-indicações dos óleos
  const carrierOilBenefits = {
    "óleo de coco": "Óleo de Coco - Hidratante leve e não oleoso, ideal para peles sensíveis e ótimo como veículo para óleos essenciais.",
    "jojoba": "Óleo de Jojoba - Similar ao sebo natural da pele, auxilia no equilíbrio da oleosidade e hidratação sem obstruir os poros.",
    "amêndoas": "Óleo de Amêndoas - Rico em vitaminas E e A, hidrata profundamente, melhora a elasticidade da pele e acalma irritações.",
    "abacate": "Óleo de Abacate - Nutritivo e regenerador, ajuda a fortalecer a barreira cutânea, promovendo elasticidade e hidratação."
  };

  const essentialOilInfo = {
    "lavanda": {
      "benefits": "Lavanda - conhecida por suas propriedades relaxantes, alivia o estresse e promove um sono reparador.",
      "contraindications": "<br><strong>Contraindicações:</strong> Pode causar irritação em peles muito sensíveis; evite o uso em excesso para evitar sonolência."
    },
    "tea tree": {
      "benefits": "Tea Tree - poderoso antibacteriano e antifúngico, eficaz em tratamentos para acne e pequenas infecções cutâneas.",
      "contraindications": "<br><strong>Contraindicações:</strong> Pode ser irritante para peles muito sensíveis; evitar uso em crianças pequenas e diluir adequadamente."
    },
    "hortelã": {
      "benefits": "Hortelã - refrescante e revigorante, auxilia na melhora da respiração e alívio de dores de cabeça.",
      "contraindications": "<br><strong>Contraindicações:</strong> Não indicado para uso em crianças menores de 6 anos e em gestantes; pode causar irritação se usado puro."
    },
    "alecrim": {
      "benefits": "Alecrim - estimula a circulação e pode ajudar na concentração e memória.",
      "contraindications": "<br><strong>Contraindicações:</strong> Evitar uso em pessoas com hipertensão e em gestantes; pode ser irritante para peles sensíveis."
    }
  };

  // Calcula o limite de gotas com base na concentração desejada e volume total
  const maxDrops = Math.floor((totalVolume * concentrationPercent) / 100 * 20); // 20 gotas por ml como estimativa
  const essentialOilEntries = document.querySelectorAll(".essential-oil-entry");

  // Divide as gotas igualmente entre os óleos essenciais selecionados
  const dropsPerOil = Math.floor(maxDrops / essentialOilEntries.length);

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `<p><strong>Volume Total:</strong> ${totalVolume} ml</p>`;
  resultDiv.innerHTML += `<p><strong>Concentração:</strong> ${concentrationPercent}%</p>`;
  resultDiv.innerHTML += `<p><strong>Gotas Permitidas por Óleo Essencial:</strong> ${dropsPerOil} gotas</p>`;

  // Exibe o benefício do óleo carreador selecionado
  resultDiv.innerHTML += `<p><strong>Óleo Carreador Selecionado:</strong> ${carrierOilBenefits[carrierOil]}</p>`;

  // Exibe os benefícios e contra-indicações dos óleos essenciais selecionados
  essentialOilEntries.forEach(entry => {
    const selectedOil = entry.querySelector(".essential-oil").value;
    const oilInfo = essentialOilInfo[selectedOil];
    resultDiv.innerHTML += `<p><strong>${selectedOil}</strong>: ${dropsPerOil} gotas - ${oilInfo.benefits}. <em>Contraindicações:</em> ${oilInfo.contraindications}</p>`;
  });
}
