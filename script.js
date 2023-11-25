function obterValorDoInput() {
  const logradouro = document.querySelector('.logradouro');
  const bairro = document.querySelector('.bairro');
  const localidade = document.querySelector('.localidade');
  const uf = document.querySelector('.uf');
  const cep = document.getElementById('cep').value;
  console.log(cep)
  const url = `https://viacep.com.br/ws/${cep}/json/`;

  logradouro.innerHTML = '';
  bairro.innerHTML = '';
  localidade.innerHTML = '';
  uf.innerHTML = '';

  fetch(url)
    .then(response => response.json())
    .then(body => {
      console.log(body)

      logradouro.innerHTML += body.logradouro;
      bairro.innerText += body.bairro;
      localidade.innerText += body.localidade;
      uf.innerText += body.uf;

      return body;
    })
    .then(inicializarMapa)  
    .catch(error => {
      console.error('Ocorreu um erro:', error);
    });
}

function inicializarMapa(dados) {
  var geocoder = new google.maps.Geocoder();

  geocoder.geocode({ 'address': dados.cep }, function (results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      var latitude = results[0].geometry.location.lat();
      var longitude = results[0].geometry.location.lng();
      console.log(dados.cep)

      var mapOptions = {
        center: new google.maps.LatLng(latitude, longitude),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      var mapa = new google.maps.Map(document.getElementById('mapa'), mapOptions);

      var marcador = new google.maps.Marker({
        position: new google.maps.LatLng(latitude, longitude),
        map: mapa,
        title: 'Localização do CEP'
      });
    } else {
      alert('Erro ao obter as coordenadas do CEP. Verifique se o CEP foi inserido corretamente e tente novamente.');
    }
  });
}
