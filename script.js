    
const form = document.getElementById('userForm');
const cepInput = document.getElementById('cep');

cepInput.addEventListener('input', () => {
  const cep = cepInput.value.replace(/\D/g, '');

  if (cep.length === 8) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => response.json())
      .then(data => {
        if (!data.erro) {
          document.getElementById('endereco').value = data.logradouro;
          document.getElementById('bairro').value = data.bairro;
          document.getElementById('cidade').value = data.localidade;
          document.getElementById('estado').value = data.uf;
        } else {
          alert('CEP não encontrado.');
        }
      })
      .catch(() => alert('Erro ao buscar o CEP.'));
  }
});


form.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(form);
  const userData = {};
  formData.forEach((value, key) => {
    userData[key] = value;
  });
  localStorage.setItem('userData', JSON.stringify(userData));
  alert('Dados salvos com sucesso!');
});


window.addEventListener('DOMContentLoaded', () => {
  const savedData = localStorage.getItem('userData');
  if (savedData) {
    const data = JSON.parse(savedData);
    
    for (let key in data) {
      if (form.elements[key]) {
     form.elements[key].value = data[key];
    }
    }
  }
});