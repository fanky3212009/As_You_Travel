// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

$(document).on('ready page:load', function () {

  $.ajax({
    url: window.location.pathname,
    type: 'GET',
    dataType: 'json',
    success: function (data) {

       var timeline = new TL.Timeline('user'+data.id+'-timeline', data,
       {
         theme_color: "#288EC3",
         ga_property_id: "UA-27829802-4"
       });
     }
  });

});
