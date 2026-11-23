const cohorts = {
  all: {
    accounts: 240,
    retention: 86,
    satisfaction: 4.2,
    stages: [["Implantação", 3.8], ["Primeiro uso", 4.1], ["Rotina", 4.5], ["Suporte", 4.0]],
    insight: "Na amostra fictícia, a implantação aparece como a etapa com menor satisfação. É uma hipótese para investigar com entrevistas e dados reais antes de propor mudanças."
  },
  new: {
    accounts: 82,
    retention: 74,
    satisfaction: 3.7,
    stages: [["Implantação", 3.3], ["Primeiro uso", 3.8], ["Rotina", 4.2], ["Suporte", 3.6]],
    insight: "A coorte nova sinaliza uma oportunidade de acompanhar configuração e primeiro valor percebido. O indicador é ilustrativo, não uma conclusão de pesquisa."
  },
  mature: {
    accounts: 158,
    retention: 92,
    satisfaction: 4.5,
    stages: [["Implantação", 4.1], ["Primeiro uso", 4.3], ["Rotina", 4.7], ["Suporte", 4.4]],
    insight: "Clientes recorrentes têm uma leitura mais positiva neste cenário fictício. Compare comportamentos e contexto antes de atribuir causalidade."
  }
};

const buttons = [...document.querySelectorAll(".cohort")];
const chart = document.querySelector("#chart");

function showCohort(key) {
  const cohort = cohorts[key];
  document.querySelector("#accounts").textContent = cohort.accounts.toLocaleString("pt-BR");
  document.querySelector("#retention").textContent = `${cohort.retention}%`;
  document.querySelector("#satisfaction").textContent = `${cohort.satisfaction.toFixed(1)} / 5`;
  document.querySelector("#insight-text").textContent = cohort.insight;
  chart.replaceChildren();

  for (const [label, value] of cohort.stages) {
    const group = document.createElement("div");
    group.className = "bar-group";
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.setProperty("--height", `${value / 5 * 100}%`);
    const output = document.createElement("span");
    output.className = "bar-value";
    output.textContent = value.toFixed(1);
    const caption = document.createElement("span");
    caption.className = "bar-label";
    caption.textContent = label;
    bar.append(output);
    group.append(bar, caption);
    chart.append(group);
  }

  for (const button of buttons) {
    const active = button.dataset.cohort === key;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  }
}

for (const button of buttons) {
  button.addEventListener("click", () => showCohort(button.dataset.cohort));
}

showCohort("all");
