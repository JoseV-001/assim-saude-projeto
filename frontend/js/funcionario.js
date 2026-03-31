const apiBase = '/backend/index.php';

const funcionarioForm = document.getElementById('funcionario-form');
const funcionarioMessage = document.getElementById('funcionario-message');
const funcionariosBody = document.getElementById('funcionarios-body');
const buscaNome = document.getElementById('busca-nome');
const buscaCpf = document.getElementById('busca-cpf');
const btnBuscarFuncionario = document.getElementById('btn-buscar-funcionario');
const cargoSelect = document.getElementById('cargo_id');

let funcionarioEmEdicao = null;

function showMessage(element, text, type) {
  element.textContent = text;
  element.className = `message ${type}`;
  setTimeout(() => {
    if (type === 'success') {
      element.textContent = '';
      element.className = 'message';
    }
  }, 5000);
}

function formatarCPF(cpf) {
  return cpf.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

function formatarValor(valor) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
}

function limparFormulario() {
  funcionarioForm.reset();
  funcionarioEmEdicao = null;
  document.querySelector('button[type="submit"]').textContent = 'Salvar Funcionario';
  const btnDeletar = document.getElementById('btn-deletar-funcionario');
  if (btnDeletar) btnDeletar.remove();
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
    row.style.cursor = 'pointer';
    row.innerHTML = `
      <td>${funcionario.nome}</td>
      <td>${formatarCPF(funcionario.cpf)}</td>
      <td>${funcionario.data_nascimento}</td>
      <td>${funcionario.email || '-'}</td>
      <td>${funcionario.telefone || '-'}</td>
      <td>${formatarValor(funcionario.salario)}</td>
      <td>${funcionario.cargo_nome}</td>
    `;
    row.addEventListener('click', () => selecionarFuncionario(row, funcionario));
    funcionariosBody.appendChild(row);
  });
}

function selecionarFuncionario(row, funcionario) {
  // Remover destaque anterior
  document.querySelectorAll('#funcionarios-body tr').forEach(r => r.style.backgroundColor = '');
  row.style.backgroundColor = '#e3f2fd';
  
  // Carregar dados no formulário
  funcionarioEmEdicao = funcionario;
  document.getElementById('nome').value = funcionario.nome;
  document.getElementById('cpf').value = funcionario.cpf;
  document.getElementById('data_nascimento').value = funcionario.data_nascimento;
  document.getElementById('salario').value = funcionario.salario;
  cargoSelect.value = funcionario.cargo_id;
  document.getElementById('email').value = funcionario.email || '';
  document.getElementById('telefone').value = funcionario.telefone || '';
  document.getElementById('cep').value = funcionario.cep || '';
  document.getElementById('logradouro').value = funcionario.logradouro || '';
  document.getElementById('numero').value = funcionario.numero || '';
  document.getElementById('complemento').value = funcionario.complemento || '';
  document.getElementById('bairro').value = funcionario.bairro || '';
  document.getElementById('municipio').value = funcionario.municipio || '';
  document.getElementById('uf').value = funcionario.uf || '';
  
  document.querySelector('button[type="submit"]').textContent = 'Atualizar Funcionario';
  
  // Adicionar botão de deletar se não existir
  let btnDeletar = document.getElementById('btn-deletar-funcionario');
  if (!btnDeletar) {
    btnDeletar = document.createElement('button');
    btnDeletar.id = 'btn-deletar-funcionario';
    btnDeletar.type = 'button';
    btnDeletar.textContent = 'Deletar Funcionario';
    btnDeletar.style.backgroundColor = '#f44336';
    btnDeletar.style.color = 'white';
    btnDeletar.style.marginLeft = '10px';
    btnDeletar.style.padding = '8px 16px';
    btnDeletar.style.border = 'none';
    btnDeletar.style.borderRadius = '4px';
    btnDeletar.style.cursor = 'pointer';
    btnDeletar.addEventListener('click', () => deletarFuncionario(funcionario.id));
    funcionarioForm.appendChild(btnDeletar);
  }
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

  try {
    const method = funcionarioEmEdicao ? 'PUT' : 'POST';
    const url = funcionarioEmEdicao ? `${apiBase}?resource=funcionarios&id=${funcionarioEmEdicao.id}` : `${apiBase}?resource=funcionarios`;
    
    const response = await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const payload = await response.json();

    if (!response.ok) {
      showMessage(funcionarioMessage, payload.error || 'Erro ao salvar funcionario.', 'error');
      return;
    }

    showMessage(funcionarioMessage, payload.message, 'success');
    limparFormulario();
    await carregarFuncionarios();
  } catch (error) {
    showMessage(funcionarioMessage, 'Erro na requisição: ' + error.message, 'error');
  }
});

async function deletarFuncionario(id) {
  if (!confirm('Tem certeza que deseja deletar este funcionário?')) {
    return;
  }

  try {
    const response = await fetch(`${apiBase}?resource=funcionarios&id=${id}`, {
      method: 'DELETE',
    });

    const payload = await response.json();

    if (!response.ok) {
      showMessage(funcionarioMessage, payload.error || 'Erro ao deletar funcionario.', 'error');
      return;
    }

    showMessage(funcionarioMessage, payload.message, 'success');
    limparFormulario();
    await carregarFuncionarios();
  } catch (error) {
    showMessage(funcionarioMessage, 'Erro na requisição: ' + error.message, 'error');
  }
}

btnBuscarFuncionario.addEventListener('click', carregarFuncionarios);
buscaNome.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') carregarFuncionarios();
});
buscaCpf.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') carregarFuncionarios();
});

carregarCargos();
carregarFuncionarios();
