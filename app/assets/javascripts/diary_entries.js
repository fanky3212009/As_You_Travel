// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// var map;
// function initMap() {
//   map = new google.maps.Map(document.getElementById('map-canvas'), {
//     center: {lat: -34.397, lng: 150.644},
//     zoom: 8
//   });
// }
//
// $(document).on('ready page:load', function () {
//     initMap();
//    $("h1").on('click', function () {
//     $('.map-wrap').css({ height: '500px', width: '500px' }); //For showing your map
//     });
//     // $("h1").on('click', function () {
//     //    initMap();
//     //    google.maps.event.trigger(map, 'resize');
//     //    map.setCenter({lat: -34.397, lng: 150.644});
//     // })
// });

  $(document).on('ready page:load', function () {
    $('h1').on('click', function (e) {
      e.preventDefault();

      $.ajax({
         url: $(this).attr('href'),
         type: 'GET',
         dataType: 'json',
         success: function (data) {

           var map = new GMaps({
             el: '#map',
             lat: -12.043333,
             lng: -77.028333
           });

           var latlngs = [{lat:data.latitude, lng:data.longitude}];
           var bounds = [];

           for (var i in latlngs) {
             var latlng = new google.maps.LatLng(latlngs[i].lat, latlngs[i].lng);
             bounds.push(latlng);
             map.addMarker({
               lat: latlngs[i].lat,
               lng: latlngs[i].lng
             });
           }
           map.fitLatLngBounds(bounds);
         }
      });
    });

     $('#path_map>a').on('click', function (e) {
       e.preventDefault();

       $.ajax({
          url: $('#path_map>a').attr('href'),
          type: 'GET',
          dataType: 'json',
          success: function (data) {

            var map = new GMaps({
              el: '#path_map',
              lat: -12.043333,
              lng: -77.028333
            });

            console.log(data);
            var latlngs = [];
            for (var i = 0; i < data.length; i++) {
              // latlngs[i].lat = data[i].latitude;
              // latlngs[i].lng = data[i].longitude;
              latlngs.push({lat:data[i].latitude, lng:data[i].longitude})

            }
            var bounds = [];

            for (var i in latlngs) {
              var latlng = new google.maps.LatLng(latlngs[i].lat, latlngs[i].lng);
              bounds.push(latlng);
              map.addMarker({
                lat: latlngs[i].lat,
                lng: latlngs[i].lng
              });
            }
            map.fitLatLngBounds(bounds);
    //  map.addMarker({
          //    lat: data.latitude,
          //    lng: data.longitude,
          //    title: 'Lima',
          //    click: function(e) {
          //      alert('You clicked in this marker');
          //    }
          //  });

         }
      });
    });
  });




//
