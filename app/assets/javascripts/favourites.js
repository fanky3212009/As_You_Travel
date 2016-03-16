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
          $('.fa.fa-heart').css("color","#FF6767");
        }
      }
    });
  });

  $(".no-f-yet").on('click', function() {
    $('.new_favourite').click();
    // success: function() {
    //   $(".no-f-yet").toggleClass(".f-already");

  })

  $('.edit_favourite').on('click', function (e) {
    e.preventDefault();
    var self = $(this);
    $.ajax({
      url: self.attr('action'),
      method: "DELETE",
      data: self.serialize(),
      dataType: 'json',
      success: function (data) {
        if (data) {
          $('.fa.fa-heart').css("color","grey");
        }
      }
    });
  });

  $(".f-already").on('click', function() {
    $('.edit_favourite').click();
  })




})
