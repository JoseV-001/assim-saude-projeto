const apiBase = '/backend/index.php';

const funcionarioForm = document.getElementById('funcionario-form');
const funcionarioMessage = document.getElementById('funcionario-message');
const funcionariosBody = document.getElementById('funcionarios-body');
const buscaNome = document.getElementById('busca-nome');
const buscaCpf = document.getElementById('busca-cpf');
const btnBuscarFuncionario = document.getElementById('btn-buscar-funcionario');
const cargoSelect = document.getElementById('cargo_id');

function showMessage(element, text, type) {
  element.textContent = text;
  element.className = `message ${type}`;
}

function formatarCPF(cpf) {
  return cpf.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

function formatarValor(valor) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
}

async function carregarCargos() {
  const response = await fetch(`${apiBase}?resource=cargos`);
  const payload = await response.json();

  cargoSelect.innerHTML = '<option value="">Selecione o Cargo *</option>';
  (payload.data || []).forEach((cargo) => {
    const option = document.createElement('option');
    option.value = cargo.id;
    option.textContent = cargo.nome;
    cargoSelect.appendChild(option);
  });
}

async function carregarFuncionarios() {
  const nome = buscaNome.value.trim();
  const cpf = buscaCpf.value.trim();
  
  const query = new URLSearchParams({ resource: 'funcionarios' });
  if (nome) {
    query.append('nome', nome);
  }
  if (cpf) {
    query.append('cpf', cpf);
  }
  
  const url = `${apiBase}?${query.toString()}`;
  const response = await fetch(url);
  const payload = await response.json();

  funcionariosBody.innerHTML = '';
  (payload.data || []).forEach((funcionario) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${funcionario.nome}</td>
      <td>${formatarCPF(funcionario.cpf)}</td>
      <td>${funcionario.data_nascimento}</td>
      <td>${funcionario.email || '-'}</td>
      <td>${funcionario.telefone || '-'}</td>
      <td>${formatarValor(funcionario.salario)}</td>
      <td>${funcionario.cargo_nome}</td>
    `;
    funcionariosBody.appendChild(row);
  });
}

funcionarioForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const body = {
    nome: document.getElementById('nome').value.trim(),
    cpf: document.getElementById('cpf').value.trim(),
    data_nascimento: document.getElementById('data_nascimento').value,
    salario: parseFloat(document.getElementById('salario').value),
    cargo_id: parseInt(cargoSelect.value, 10),
    email: document.getElementById('email').value.trim() || null,
    telefone: document.getElementById('telefone').value.trim() || null,
    cep: document.getElementById('cep').value.trim() || null,
    logradouro: document.getElementById('logradouro').value.trim() || null,
    numero: document.getElementById('numero').value.trim() || null,
    complemento: document.getElementById('complemento').value.trim() || null,
    bairro: document.getElementById('bairro').value.trim() || null,
    municipio: document.getElementById('municipio').value.trim() || null,
    uf: document.getElementById('uf').value.trim() || null,
  };

  const response = await fetch(`${apiBase}?resource=funcionarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const payload = await response.json();

  if (!response.ok) {
    showMessage(funcionarioMessage, payload.error || 'Erro ao salvar funcionario.', 'error');
    return;
  }

  showMessage(funcionarioMessage, payload.message, 'success');
  funcionarioForm.reset();
  await carregarFuncionarios();
});

btnBuscarFuncionario.addEventListener('click', carregarFuncionarios);

carregarCargos();
carregarFuncionarios();

