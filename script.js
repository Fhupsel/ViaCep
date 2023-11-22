function obterValorDoInput() {
  const logradouro = document.querySelector('.logradouro')
  const bairro = document.querySelector('.bairro')
  const localidade = document.querySelector('.localidade')
  const uf = document.querySelector('.uf')
  const cep = document.getElementById('cep').value;
  const url = `https://viacep.com.br/ws/${cep}/json/`;

  const endereço = fetch(url);

  logradouro.innerHTML = '';
  bairro.innerHTML = '';
  localidade.innerHTML = '';
  uf.innerHTML = '';

  endereço.then(r => r.json())
  .then(body => {
    console.log(body);
    logradouro.innerHTML += body.logradouro;
    bairro.innerText += body.bairro;
    localidade.innerText += body.localidade;
    uf.innerText += body.uf;
  })
}




