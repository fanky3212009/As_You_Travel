// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

$(document).on('ready page:change', function () {


  $('.new_relationship .relationship-button-border').on('click', function () {
    $('.follow-button').submit();
  });
  $('.edit_relationship .relationship-button-border').on('click', function () {
    $('.follow-button').submit();
  });

  $('.timeline-button-border').on('click', function(e){
    e.preventDefault();

    $.ajax({
      url: window.location.pathname,
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        var timeline = new TL.Timeline('page-content', data,
        {
          theme_color: "#288EC3",
          ga_property_id: "UA-27829802-4"
        });
      }
    });
  });

    $('#search_nearby').on('click', function() {
      if("geolocation" in navigator)  {
        navigator.geolocation.getCurrentPosition(itWorked, itDidNotWork);
      }
    });



});

function itWorked(position){
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;

  $.ajax({
    url: window.location.pathname,
    method: 'get',
    data: {latitude: lat, longitude: lon},
    dataType: 'script'
  })
}

function itDidNotWork(error){
  console.log(error.message);
}
