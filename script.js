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

    inicializarMapa(cep);
  })
}

function inicializarMapa(cep) {
  // Obtenha o CEP do usuário (pode ser obtido de um campo de entrada HTML, por exemplo)
  // Use um serviço de geocodificação para obter as coordenadas a partir do CEP
  var geocoder = new google.maps.Geocoder();

  geocoder.geocode({ 'address': cep }, function (results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      // Obtenha as coordenadas
      var latitude = results[0].geometry.location.lat();
      var longitude = results[0].geometry.location.lng();

      // Crie um objeto de opções para o mapa
      var mapOptions = {
        center: new google.maps.LatLng(latitude, longitude),
        zoom: 15, // Ajuste o nível de zoom conforme necessário
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      // Crie o mapa
      var mapa = new google.maps.Map(document.getElementById('mapa'), mapOptions);

      // Adicione um marcador no mapa
      var marcador = new google.maps.Marker({
        position: new google.maps.LatLng(latitude, longitude),
        map: mapa,
        title: 'Localização do CEP'
      });
    } else {
      alert('Erro ao obter as coordenadas do CEP. Status: ' + status);
    }
  });
}
