let essentialOilCount = 1;

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
      <option value="eucalipto">Eucalipto - Descongestionante</option>
      <option value="gerânio">Gerânio - Equilíbrio Emocional</option>
      <option value="limão">Limão - Energizante</option>
      <option value="laranja">Laranja - Calmante</option>
      <option value="sândalo">Sândalo - Meditativo</option>
      <option value="rosa">Rosa - Regenerador de Pele</option>
      <option value="ylang-ylang">Ylang-Ylang - Afrodisíaco</option>
      <option value="patchouli">Patchouli - Relaxante</option>
      <option value="camomila">Camomila - Calmante</option>
      <option value="cravo">Cravo - Fortalecedor Imunológico</option>
      <option value="gengibre">Gengibre - Estimulante</option>
      <option value="cipreste">Cipreste - Tônico Circulatório</option>
    </select>
    <button type="button" class="remove-oil text-red-500 font-bold" onclick="removeEssentialOil(this)">X</button>
  `;

  container.appendChild(newOilEntry);
  essentialOilCount++;
}

function removeEssentialOil(button) {
  const container = document.getElementById("essential-oils-container");
  if (container.children.length > 1) {
    button.parentElement.remove();
    essentialOilCount--;
  }
}

document.getElementById("user").addEventListener("change", function () {
  const essentialOilSelectors = document.querySelectorAll(".essential-oil");
  const isChild = document.getElementById("user").value === "criança";

  essentialOilSelectors.forEach(select => {
    const peppermintOption = Array.from(select.options).find(option => option.value === "hortelã");

    if (isChild && peppermintOption) {
      select.removeChild(peppermintOption);
      document.getElementById("result").textContent = "Aviso: Óleo de Hortelã não é permitido para crianças devido a possíveis irritações.";
    } else if (!isChild && !peppermintOption) {
      const newOption = document.createElement("option");
      newOption.value = "hortelã";
      newOption.textContent = "Hortelã - Refrescante";
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

  const carrierOilBenefits = {
    "óleo de coco": "Óleo de Coco - Hidratante leve e não oleoso, ideal para peles sensíveis e ótimo como veículo para óleos essenciais.",
    "jojoba": "Óleo de Jojoba - Similar ao sebo natural da pele, auxilia no equilíbrio da oleosidade e hidratação sem obstruir os poros.",
    "amêndoas": "Óleo de Amêndoas - Rico em vitaminas E e A, hidrata profundamente, melhora a elasticidade da pele e acalma irritações.",
    "abacate": "Óleo de Abacate - Nutritivo e regenerador, ajuda a fortalecer a barreira cutânea, promovendo elasticidade e hidratação."
  };

  const essentialOilInfo = {
    "lavanda": { "benefits": "Lavanda - Relaxamento", "contraindications": "<strong>Contraindicações:</strong> Pode causar irritação em peles muito sensíveis." },
    "tea tree": { "benefits": "Tea Tree - Antibacteriano", "contraindications": "<strong>Contraindicações:</strong> Evitar em crianças pequenas; diluir adequadamente." },
    "hortelã": { "benefits": "Hortelã - Refrescante", "contraindications": "<strong>Contraindicações:</strong> Não indicado para uso em crianças menores de 6 anos." },
    "alecrim": { "benefits": "Alecrim - Estimulante", "contraindications": "<strong>Contraindicações:</strong> Evitar uso em hipertensos e gestantes." },
    "eucalipto": { "benefits": "Eucalipto - Descongestionante", "contraindications": "<strong>Contraindicações:</strong> Evitar uso em crianças e asmáticos." },
    "gerânio": { "benefits": "Gerânio - Equilíbrio Emocional", "contraindications": "<strong>Contraindicações:</strong> Usar com moderação em pele sensível." },
    "limão": { "benefits": "Limão - Energizante", "contraindications": "<strong>Contraindicações:</strong> Fotossensível; evitar exposição ao sol." },
    "laranja": { "benefits": "Laranja - Calmante", "contraindications": "<strong>Contraindicações:</strong> Fotossensível; evitar exposição ao sol." },
    "sândalo": { "benefits": "Sândalo - Meditativo", "contraindications": "<strong>Contraindicações:</strong> Pode causar alergias em peles muito sensíveis." },
    "rosa": { "benefits": "Rosa - Regenerador de Pele", "contraindications": "<strong>Contraindicações:</strong> Usar com moderação; pode ser alergênico." },
    "ylang-ylang": { "benefits": "Ylang-Ylang - Afrodisíaco", "contraindications": "<strong>Contraindicações:</strong> Pode causar dor de cabeça em altas concentrações." },
    "patchouli": { "benefits": "Patchouli - Relaxante", "contraindications": "<strong>Contraindicações:</strong> Evitar uso excessivo; cheiro forte." },
    "camomila": { "benefits": "Camomila - Calmante", "contraindications": "<strong>Contraindicações:</strong> Usar com moderação em peles sensíveis." },
    "cravo": { "benefits": "Cravo - Fortalecedor Imunológico", "contraindications": "<strong>Contraindicações:</strong> Evitar em gestantes e crianças pequenas." },
    "gengibre": { "benefits": "Gengibre - Estimulante", "contraindications": "<strong>Contraindicações:</strong> Evitar em pele sensível; pode ser irritante." },
    "cipreste": { "benefits": "Cipreste - Tônico Circulatório", "contraindications": "<strong>Contraindicações:</strong> Evitar em gestantes." }
  };

  const maxDrops = Math.floor((totalVolume * concentrationPercent) / 100 * 20);
  const essentialOilEntries = document.querySelectorAll(".essential-oil-entry");

  const dropsPerOil = Math.floor(maxDrops / essentialOilEntries.length);

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `<p><strong>Volume Total:</strong> ${totalVolume} ml</p>`;
  resultDiv.innerHTML += `<p><strong>Concentração:</strong> ${concentrationPercent}%</p>`;
  resultDiv.innerHTML += `<p><strong>Gotas Permitidas por Óleo Essencial:</strong> ${dropsPerOil} gotas</p>`;

  resultDiv.innerHTML += `<p><strong>Óleo Carreador Selecionado:</strong> ${carrierOilBenefits[carrierOil]}</p>`;

  essentialOilEntries.forEach(entry => {
    const selectedOil = entry.querySelector(".essential-oil").value;
    const oilInfo = essentialOilInfo[selectedOil];
    resultDiv.innerHTML += `<p><strong>${selectedOil}</strong>: ${dropsPerOil} gotas - ${oilInfo.benefits}. <em>${oilInfo.contraindications}</em></p>`;
  });
}
