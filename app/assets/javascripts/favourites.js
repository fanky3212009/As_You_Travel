// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).on('ready page:load', function () {
  $('.new_favourite').on('click', function (e) {
    e.preventDefault();
    var self = $(this);
    $.ajax({
      url: self.attr('action'),
      method: "POST",
      data: self.serialize(),
      dataType: 'json',
      success: function (data) {
        if (data) {
          $('.new_favourite > button ').css("background","red");
        }
      }
    });
  });
})
