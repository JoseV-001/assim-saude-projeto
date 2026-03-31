const apiBase = '/backend/index.php';

const funcionarioForm = document.getElementById('funcionario-form');
const funcionarioMessage = document.getElementById('funcionario-message');
const funcionariosBody = document.getElementById('funcionarios-body');
const buscaNome = document.getElementById('busca-nome');
const buscaCpf = document.getElementById('busca-cpf');
const btnBuscarFuncionario = document.getElementById('btn-buscar-funcionario');
const cargoSelect = document.getElementById('cargo_id');
const telefoneInput = document.getElementById('telefone');

let funcionarioEmEdicao = null;
let debounceTimer = null;
const DEBOUNCE_DELAY = 300;

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

function debounce(callback, delay) {
  return function() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(callback, delay);
  };
}

async function carregarFuncionariosComTratamento() {
  try {
    await carregarFuncionarios();
  } catch (error) {
    showMessage(funcionarioMessage, 'Erro ao buscar funcionários: ' + error.message, 'error');
  }
}

function formatarCPF(cpf) {
  return cpf.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

function formatarValor(valor) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
}

function formatarTelefone(telefone) {
  if (telefone === null || telefone === undefined || telefone === '') {
    return '-';
  }

  const valorOriginal = String(telefone);
  const numeros = valorOriginal.replace(/\D/g, '');

  if (numeros.length === 11) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
  }

  return valorOriginal;
}

function aplicarMascaraTelefone(input) {
  const numeros = input.value.replace(/\D/g, '').slice(0, 11);

  if (numeros.length === 0) {
    input.value = '';
    return;
  }

  if (numeros.length <= 2) {
    input.value = `(${numeros}`;
    return;
  }

  if (numeros.length <= 7) {
    input.value = `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    return;
  }

  input.value = `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
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
  
  try {
    const response = await fetch(url);
    const payload = await response.json();

    if (!response.ok) {
      showMessage(funcionarioMessage, payload.error || 'Erro ao buscar funcionários. Tente novamente.', 'error');
      funcionariosBody.innerHTML = '';
      return;
    }

    funcionariosBody.innerHTML = '';
    const funcionarios = payload.data || [];
    
    if (funcionarios.length === 0) {
      funcionariosBody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: #999;">Nenhum funcionário encontrado</td></tr>';
      return;
    }

    funcionarios.forEach((funcionario) => {
      const row = document.createElement('tr');
      row.style.cursor = 'pointer';
      row.innerHTML = `
        <td>${funcionario.nome}</td>
        <td>${formatarCPF(funcionario.cpf)}</td>
        <td>${funcionario.data_nascimento}</td>
        <td>${funcionario.email || '-'}</td>
        <td>${formatarTelefone(funcionario.telefone)}</td>
        <td>${formatarValor(funcionario.salario)}</td>
        <td>${funcionario.cargo_nome}</td>
      `;
      row.addEventListener('click', () => selecionarFuncionario(row, funcionario));
      funcionariosBody.appendChild(row);
    });
  } catch (error) {
    showMessage(funcionarioMessage, 'Erro na comunicação com o servidor. Verifique sua conexão.', 'error');
    funcionariosBody.innerHTML = '';
  }
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
  aplicarMascaraTelefone(telefoneInput);
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

  const telefoneNumeros = document.getElementById('telefone').value.replace(/\D/g, '').slice(0, 11);

  const body = {
    nome: document.getElementById('nome').value.trim(),
    cpf: document.getElementById('cpf').value.trim(),
    data_nascimento: document.getElementById('data_nascimento').value,
    salario: parseFloat(document.getElementById('salario').value),
    cargo_id: parseInt(cargoSelect.value, 10),
    email: document.getElementById('email').value.trim() || null,
    telefone: telefoneNumeros || null,
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

telefoneInput.addEventListener('input', () => {
  aplicarMascaraTelefone(telefoneInput);
});

buscaNome.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') carregarFuncionarios();
});
buscaCpf.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') carregarFuncionarios();
});

// Busca dinâmica com debounce para campo de CPF
buscaCpf.addEventListener('input', debounce(() => {
  carregarFuncionariosComTratamento();
}, DEBOUNCE_DELAY));

// Busca dinâmica com debounce para campo de Nome
buscaNome.addEventListener('input', debounce(() => {
  carregarFuncionariosComTratamento();
}, DEBOUNCE_DELAY));

carregarCargos();
carregarFuncionarios();
