

$(document).on('ready page:load', function () {

  $("#home-top-picks").on("click", function() {
    $('.title-single').next().slideToggle();
    $(this).toggleClass("active");
})

});
