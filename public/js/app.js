//Inicializador del elemento Slider
$("#rangoPrecio").ionRangeSlider({
  type: "double",
  grid: false,
  min: 0,
  max: 100000,
  from: 1000,
  to: 20000,
  prefix: "$"
})

$(function(){
  var socket = io.connect('http://localhost:3000', {'forceNew': true});
  var Bienes = {
    apiUrl: '/datos',
    bienList: $('.lista'),
    $btnBuscar: $('#buscar'),
    $btnIris: $('.irs'),
    $btnBusqueda: $('#checkPersonalizada'),
    customSearch: null,
    bienes: [],

    Init: function(){
      this.cargarSelect()
      this.getInitialBienes()
      this.fetchBienesInfo()
      this.getCustomSearch()
    },
    cargarSelect: function(){
      $('select').material_select()
    },
    getCustomSearch: function(){
      var self = this
      self.$btnBusqueda.on('change', (e)=>{
        if(self.customSearch == null){
          self.customSearch = true
        }else if(self.customSearch == true){
          self.customSearch = false
        }else{
          self.customSearch = true
        }
        $('#personalizada').toggleClass('invisible')
      })
    },
    fetchBienesInfo: function(callback){
      var self = this
      self.$btnBuscar.on('click', ()=>{
        if(self.customSearch == null || self.customSearch == false){
          self.renderBienes(JSON.stringify(self.bienes))
        }else if(self.customSearch == true){
          self.getBienesSearch()
        }
      })
    },
    getInitialBienes: function(){
      var self = this
      var endpoint = self.apiUrl + '/bienes'
      self.ajaxRequest(endpoint, 'GET', {})
          .done((data)=>{
            var bienes = data
            self.bienes = JSON.parse(bienes)
          }).fail((err)=>{
            console.log(err)
          })
    },
    getBienesSearch: function(){
      var self = this
      var newBienes = []
      var from = $('.irs-from').text()
      var to = $('.irs-to').text()
      var ciudad = $('#ciudad').val()
      var tipo = $('#tipo').val()

      for(var i = 0; i < self.bienes.length; i++){
        if(self.toNumero(self.bienes[i].Precio) >= self.toNumero(from) && self.toNumero(self.bienes[i].Precio) <= self.toNumero(to) && self.bienes[i].Ciudad == ciudad && self.bienes[i].Tipo == tipo){
          newBienes.push(self.bienes[i])

        }else if(self.toNumero(self.bienes[i].Precio) >= self.toNumero(from) && self.toNumero(self.bienes[i].Precio) <= self.toNumero(to) && self.bienes[i].Ciudad == ciudad && tipo.length == 0){
          newBienes.push(self.bienes[i])

        }else if(self.toNumero(self.bienes[i].Precio) >= self.toNumero(from) && self.toNumero(self.bienes[i].Precio) <= self.toNumero(to) && self.bienes[i].Tipo == tipo && ciudad.length == 0){
          newBienes.push(self.bienes[i])

        }else if(self.toNumero(self.bienes[i].Precio) >= self.toNumero(from) && self.toNumero(self.bienes[i].Precio) <= self.toNumero(to) && tipo.length == 0 && ciudad.length == 0){
          newBienes.push(self.bienes[i])

        }
      }
      self.renderBienes(JSON.stringify(newBienes))
      newBienes = []
    },
    toNumero: function(num){
      var numero = num
      var newNumero = Number(numero.replace('$', '').replace(',', '').replace(' ', ''))
      return newNumero
    },
    ajaxRequest: function(url, type, data){
      return $.ajax({
        url: url,
        type: type,
        data: data
      })
    },
    renderBienes: function(bienes){
      var self = this
      var bien = JSON.parse(bienes)
      self.bienList.html('')

      bien.map((bien)=>{
        var bienTemplate = '<div class="card horizontal">'+
                              '<div class="card-image">'+
                                '<img src="img/home.jpg">'+
                              '</div>'+
                              '<div class="card-stacked">'+
                                '<div class="card-content">'+
                                  '<div>'+
                                    '<b>Direccion: </b>:direccion:<p></p>'+
                                  '</div>'+
                                  '<div>'+
                                    '<b>Ciudad: </b>:ciudad:<p></p>'+
                                  '</div>'+
                                  '<div>'+
                                    '<b>Telefono: </b>:telefono:<p></p>'+
                                  '</div>'+
                                  '<div>'+
                                    '<b>Código postal: </b>:codigo_postal:<p></p>'+
                                  '</div>'+
                                  '<div>'+
                                    '<b>Precio: </b>:precio:<p></p>'+
                                  '</div>'+
                                  '<div>'+
                                    '<b>Tipo: </b>:tipo:<p></p>'+
                                  '</div>'+
                                '</div>'+
                                '<div class="card-action right-align">'+
                                  '<a href="#">Ver más</a>'+
                                '</div>'+
                              '</div>'+
                            '</div>';

        var newBien = bienTemplate.replace(':direccion:', bien.Direccion)
                                  .replace(':ciudad:', bien.Ciudad)
                                  .replace(':telefono:', bien.Telefono)
                                  .replace(':codigo_postal:', bien.Codigo_Postal)
                                  .replace(':precio:', bien.Precio)
                                  .replace(':tipo:', bien.Tipo)
        self.bienList.append(newBien)
      })
    }
  }
  Bienes.Init()
})
