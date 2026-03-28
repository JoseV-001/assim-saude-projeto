const apiBase = '/backend/index.php';

const filtroNome = document.getElementById('filtro-nome');
const filtroCargo = document.getElementById('filtro-cargo');
const btnFiltrar = document.getElementById('btn-filtrar');
const relatorioBody = document.getElementById('relatorio-body');

function formatarValor(valor) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
}

async function carregarRelatorio() {
  const nome = filtroNome.value.trim();
  const cargo = filtroCargo.value.trim();

  const query = new URLSearchParams({ resource: 'relatorio' });
  if (nome) {
    query.append('nome', nome);
  }
  if (cargo) {
    query.append('cargo', cargo);
  }

  const response = await fetch(`${apiBase}?${query.toString()}`);
  const payload = await response.json();

  relatorioBody.innerHTML = '';
  (payload.data || []).forEach((item) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.nome}</td>
      <td>${item.telefone || '-'}</td>
      <td>${item.cargo_nome}</td>
      <td>${formatarValor(item.salario)}</td>
    `;
    relatorioBody.appendChild(row);
  });
}

btnFiltrar.addEventListener('click', carregarRelatorio);

carregarRelatorio();

