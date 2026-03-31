const apiBase = '/backend/index.php';

const cargoForm = document.getElementById('cargo-form');
const cargoMessage = document.getElementById('cargo-message');
const cargosBody = document.getElementById('cargos-body');
const buscaCargo = document.getElementById('busca-cargo');
const btnBuscarCargo = document.getElementById('btn-buscar-cargo');

let cargoEmEdicao = null;

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

function limparFormulario() {
  cargoForm.reset();
  cargoEmEdicao = null;
  document.querySelector('button[type="submit"]').textContent = 'Salvar Cargo';
  const btnDeletar = document.getElementById('btn-deletar-cargo');
  if (btnDeletar) btnDeletar.remove();
}

async function carregarCargos() {
  try {
    const q = buscaCargo.value.trim();
    const url = q ? `${apiBase}?resource=cargos&q=${encodeURIComponent(q)}` : `${apiBase}?resource=cargos`;
    const response = await fetch(url);
    const payload = await response.json();

    cargosBody.innerHTML = '';
    if (payload.data && payload.data.length > 0) {
      (payload.data || []).forEach((cargo) => {
        const row = document.createElement('tr');
        row.style.cursor = 'pointer';
        row.innerHTML = `<td>${cargo.id}</td><td>${cargo.nome}</td><td>${cargo.descricao || '-'}</td>`;
        row.addEventListener('click', () => selecionarCargo(row, cargo));
        cargosBody.appendChild(row);
      });
    } else {
      const row = document.createElement('tr');
      row.innerHTML = '<td colspan="3" style="text-align: center; color: #999;">Nenhum cargo encontrado</td>';
      cargosBody.appendChild(row);
    }
  } catch (error) {
    showMessage(cargoMessage, 'Erro ao carregar cargos: ' + error.message, 'error');
  }
}

function selecionarCargo(row, cargo) {
  // Remover destaque anterior
  document.querySelectorAll('#cargos-body tr').forEach(r => r.style.backgroundColor = '');
  row.style.backgroundColor = '#e3f2fd';
  
  // Carregar dados no formulário
  cargoEmEdicao = cargo;
  document.getElementById('nome').value = cargo.nome;
  document.getElementById('descricao').value = cargo.descricao || '';
  document.querySelector('button[type="submit"]').textContent = 'Atualizar Cargo';
  
  // Adicionar botão de deletar se não existir
  let btnDeletar = document.getElementById('btn-deletar-cargo');
  if (!btnDeletar) {
    btnDeletar = document.createElement('button');
    btnDeletar.id = 'btn-deletar-cargo';
    btnDeletar.type = 'button';
    btnDeletar.textContent = 'Deletar Cargo';
    btnDeletar.style.backgroundColor = '#f44336';
    btnDeletar.style.color = 'white';
    btnDeletar.style.marginLeft = '10px';
    btnDeletar.style.padding = '8px 16px';
    btnDeletar.style.border = 'none';
    btnDeletar.style.borderRadius = '4px';
    btnDeletar.style.cursor = 'pointer';
    btnDeletar.addEventListener('click', () => deletarCargo(cargo.id));
    cargoForm.appendChild(btnDeletar);
  }
}

cargoForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  
  if (!nome) {
    showMessage(cargoMessage, 'Nome do cargo é obrigatório.', 'error');
    return;
  }

  const body = {
    nome: nome,
    descricao: document.getElementById('descricao').value.trim() || null,
  };

  try {
    const method = cargoEmEdicao ? 'PUT' : 'POST';
    const url = cargoEmEdicao ? `${apiBase}?resource=cargos&id=${cargoEmEdicao.id}` : `${apiBase}?resource=cargos`;
    
    const response = await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const payload = await response.json();

    if (!response.ok) {
      showMessage(cargoMessage, payload.error || 'Erro ao salvar cargo.', 'error');
      return;
    }

    showMessage(cargoMessage, payload.message, 'success');
    limparFormulario();
    await carregarCargos();
  } catch (error) {
    showMessage(cargoMessage, 'Erro na requisição: ' + error.message, 'error');
  }
});

async function deletarCargo(id) {
  if (!confirm('Tem certeza que deseja deletar este cargo?')) {
    return;
  }

  try {
    const response = await fetch(`${apiBase}?resource=cargos&id=${id}`, {
      method: 'DELETE',
    });

    const payload = await response.json();

    if (!response.ok) {
      showMessage(cargoMessage, payload.error || 'Erro ao deletar cargo.', 'error');
      return;
    }

    showMessage(cargoMessage, payload.message, 'success');
    limparFormulario();
    await carregarCargos();
  } catch (error) {
    showMessage(cargoMessage, 'Erro na requisição: ' + error.message, 'error');
  }
}

btnBuscarCargo.addEventListener('click', carregarCargos);
buscaCargo.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') carregarCargos();
});

carregarCargos();
