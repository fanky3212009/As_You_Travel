// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).on('ready page:load', function () {
  // $('.tag-form').hide();

  $('.accordion-tabs-minimal').each(function(index) {
    $(this).children('li').first().children('a').addClass('is-active').next().addClass('is-open').show();
  });
  $('.accordion-tabs-minimal').on('click', 'li > a.tab-link', function(event) {
    if (!$(this).hasClass('is-active')) {
      event.preventDefault();
      var accordionTabs = $(this).closest('.accordion-tabs-minimal');
      accordionTabs.find('.is-open').removeClass('is-open').hide();

      $(this).next().toggleClass('is-open').toggle();
      accordionTabs.find('.is-active').removeClass('is-active');
      $(this).addClass('is-active');

    } else {
      event.preventDefault();
    }
    $('#search_tag').trigger('submit');
  });

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
    if ($('.diary-tag-form').css("display") == "block") {
      $('.diary-tag-form').css("display", "none");
    }
    else {
      $('.diary-tag-form').css("display", "block");
    }
  });


  $('#search_tag').on('submit', function (e) {
    $('.search-tag-results').html(' ')
    e.preventDefault();

    var params = {
      method: 'GET',
      data: $(this).serialize(),
      dataType: 'script'

    }
    if ($('.is-active').html() == "Tag") {
      params.url = $('#search_tag').attr('action');
    } else if ($('.is-active').html() == "Location") {
      console.log('Location works');
      params.url = '/';
    } else if ($('.is-active').html() == "Top") {
      console.log('Top work');
      params.url = '/users/1/favourites';
    } else if ($('.is-active').html() == "Name") {
      console.log('Name work');
      params.url = '/users';
    }

    $.ajax(params);
  });

  // $('.tab-link').on('click', function (e) {
  //
  //   $('#search_tag').trigger('submit');
  //
  // });
});
