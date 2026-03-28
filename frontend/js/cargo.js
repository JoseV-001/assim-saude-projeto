const apiBase = '/backend/index.php';

const cargoForm = document.getElementById('cargo-form');
const cargoMessage = document.getElementById('cargo-message');
const cargosBody = document.getElementById('cargos-body');
const buscaCargo = document.getElementById('busca-cargo');
const btnBuscarCargo = document.getElementById('btn-buscar-cargo');

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
        row.innerHTML = `<td>${cargo.id}</td><td>${cargo.nome}</td><td>${cargo.descricao || '-'}</td>`;
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
    const response = await fetch(`${apiBase}?resource=cargos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const payload = await response.json();

    if (!response.ok) {
      showMessage(cargoMessage, payload.error || 'Erro ao salvar cargo.', 'error');
      return;
    }

    showMessage(cargoMessage, payload.message, 'success');
    cargoForm.reset();
    await carregarCargos();
  } catch (error) {
    showMessage(cargoMessage, 'Erro na requisição: ' + error.message, 'error');
  }
});

btnBuscarCargo.addEventListener('click', carregarCargos);
buscaCargo.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') carregarCargos();
});

carregarCargos();

