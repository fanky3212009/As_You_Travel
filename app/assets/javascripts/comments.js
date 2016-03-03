// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).on('ready page:load', function () {

  $('.comment-form').submit(function(event) {
    event.preventDefault();
    $.ajax({
      url: $(this).attr('action'),
      type: 'POST',
      dataType: 'json',
      data: $(this).serialize(),

      success: function (data) {
        console.log(data);
        var comment = '<p>' + data.comment.user.email + ': ' +
                      data.comment.body + '<br>' + 'Added on: ' +
                      data.comment.created_at + '</p>';
        $('.comments').append(comment);

       }
    });
  });
});
