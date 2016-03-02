// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

$(document).on('ready page:load', function () {

//   var welcome = $.getJSON( "welcome.json", function() {
//   console.log( "success" );
// });

// example = {
//   "title": {
//           "media": {
//               "caption":      "",
//               "credit":       "",
//               "url":          "url_to_your_media.jpg",
//               "thumbnail":    "url_to_your_media.jpg"
//           },
//           "text": {
//               "headline": "Headline Goes Here",
//               "text":     "Your slide text goes here."
//           }
//   },
//   "events": [
//       {
//           "start_date": {
//               "year":         "1900",
//               "month":        "01",
//               "day":          "05",
//               "hour":         "",
//               "minute":       "",
//               "second":       "",
//               "millisecond":  "",
//               "format":       ""
//           },
//                   "end_date": {
//               "year":         "1900",
//               "month":        "06",
//               "day":          "07",
//               "hour":         "",
//               "minute":       "",
//               "second":       "",
//               "millisecond":  "",
//               "format":       ""
//           },
//           "media": {
//               "caption":      "",
//               "credit":       "",
//               "url":          "url_to_your_media.jpg",
//               "thumbnail":    "url_to_your_media.jpg"
//           },
//           "text": {
//               "headline": "Headline Goes Here",
//               "text":     "Your slide text goes here."
//           }
//       }
//   ]
// }

  $.ajax({
    url: window.location.pathname,
    type: 'GET',
    dataType: 'json',
    success: function (data) {

      // $('#user'+data.user.id+'-timeline').html(data.user.id);

       var timeline = new TL.Timeline('user'+data.id+'-timeline', data,
       {
         theme_color: "#288EC3",
         ga_property_id: "UA-27829802-4"
       });
     }
  });

});
