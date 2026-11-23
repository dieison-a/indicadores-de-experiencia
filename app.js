const coortes = {
  todas: {
    contas: 240,
    retencao: 86,
    satisfacao: 4.2,
    etapas: [["Implantação", 3.8], ["Primeiro uso", 4.1], ["Rotina", 4.5], ["Suporte", 4.0]],
    analise: "Na amostra fictícia, a implantação aparece como a etapa com menor satisfação. É uma hipótese para investigar com entrevistas e dados reais antes de propor mudanças."
  },
  novas: {
    contas: 82,
    retencao: 74,
    satisfacao: 3.7,
    etapas: [["Implantação", 3.3], ["Primeiro uso", 3.8], ["Rotina", 4.2], ["Suporte", 3.6]],
    analise: "A coorte nova sinaliza uma oportunidade de acompanhar configuração e primeiro valor percebido. O indicador é ilustrativo, não uma conclusão de pesquisa."
  },
  recorrentes: {
    contas: 158,
    retencao: 92,
    satisfacao: 4.5,
    etapas: [["Implantação", 4.1], ["Primeiro uso", 4.3], ["Rotina", 4.7], ["Suporte", 4.4]],
    analise: "Clientes recorrentes têm uma leitura mais positiva neste cenário fictício. Compare comportamentos e contexto antes de atribuir causalidade."
  }
};

const botoes = [...document.querySelectorAll(".coorte")];
const grafico = document.querySelector("#grafico");

function mostrarCoorte(chave) {
  const coorte = coortes[chave];
  document.querySelector("#contas").textContent = coorte.contas.toLocaleString("pt-BR");
  document.querySelector("#retencao").textContent = `${coorte.retencao}%`;
  document.querySelector("#satisfacao").textContent = `${coorte.satisfacao.toFixed(1)} / 5`;
  document.querySelector("#texto-analise").textContent = coorte.analise;
  grafico.replaceChildren();

  for (const [rotulo, valor] of coorte.etapas) {
    const grupo = document.createElement("div");
    grupo.className = "grupo-coluna";
    const coluna = document.createElement("div");
    coluna.className = "coluna";
    coluna.style.setProperty("--altura", `${valor / 5 * 100}%`);
    const saida = document.createElement("span");
    saida.className = "valor-coluna";
    saida.textContent = valor.toFixed(1);
    const legenda = document.createElement("span");
    legenda.className = "rotulo-coluna";
    legenda.textContent = rotulo;
    coluna.append(saida);
    grupo.append(coluna, legenda);
    grafico.append(grupo);
  }

  for (const botao of botoes) {
    const ativo = botao.dataset.coorte === chave;
    botao.classList.toggle("ativo", ativo);
    botao.setAttribute("aria-pressed", String(ativo));
  }
}

for (const botao of botoes) {
  botao.addEventListener("click", () => mostrarCoorte(botao.dataset.coorte));
}

mostrarCoorte("todas");

