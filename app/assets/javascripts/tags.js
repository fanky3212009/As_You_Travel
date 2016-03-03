// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).on('ready page:load', function () {
  // $('.tag-form').hide();

  $('.new_tag').on('submit', function (e) {
    e.preventDefault();

    $.ajax({
      url: $(this).attr('action'),
      method: 'POST',
      data: $(this).serialize(),
      dataType:'script'
    });
  })

  $('.add-new-tag').on('click', function (e) {
    e.preventDefault();
    $('.tag-form').css("display", "block");
  });

  $('#search_tag').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      url: $('#search_tag').attr('action'),
      method: 'GET',
      data: $(this).serialize(),
      dataType: 'script'

    })
  })

});
