// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).on('ready page:load', function() {


  $('.newPost button[data-func]').click(function(){
    document.execCommand( $(this).data('func'), false 	);
  });

  $('.newPost select[data-func]').change(function(){
    var $value = $(this).find(':selected').val();
    document.execCommand( $(this).data('func'), false, $value);
  });

  if(typeof(Storage) !== "undefined") {

  $('.editor').keypress(function(){
    $(this).find('.saved').detach();
  });
    $('.editor').html(localStorage.getItem("wysiwyg")) ;

    $('button[data-func="save"]').click(function(){
      $content = $('.editor').html();
      localStorage.setItem("wysiwyg", $content);
      dataText = JSON.stringify($('.editor').html());
      // dataText = ActiveSupport::JSON.decode("{\"content\": $('.editor').html()}")
      $.ajax({
        url: $('.new_diary_entry').attr('action'),
        type: 'POST',
        dataType: 'json',
        data: { "content": dataText},
      });
      // $('.editor').append('<span class="saved"><i class="fa fa-check"></i></span>').fadeIn(function(){
      //   $(this).find('.saved').fadeOut(500);
      // });
    });

    $('button[data-func="clear"]').click(function(){
      $('.editor').html('');
      localStorage.removeItem("wysiwyg");
    });
  }

  $('#first_diary').on('click', function (e) {
    e.preventDefault();

    $.ajax({
      url: $('.new_diary_entry').attr('action'),
      type: 'POST',
      dataType: 'json',
      data: $('.new_diary_entry').serialize(),
    });
  });

  $('#second_diary').on('click', function (e) {
    e.preventDefault();
    $('button[data-func="save"]').click();
  });

  $('#final_diary').on('click', function (e) {
    e.preventDefault();
    $(".h-link").find("a")[0].click();
  });

//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$('#first_submit').on('click', function (e) {
  e.preventDefault();

  $.ajax({
    url: $('.new_journey').attr('action'),
    type: 'POST',
    dataType: 'json',
    data: $('.new_journey').serialize(),
  });
});

$('#second_submit').on('click', function (e) {
  e.preventDefault();
  $.ajax({
    url: '/journeys',
    type: 'post',
    dataType: 'json',
    data: $('.existing-journey').serialize(),
  });
});

$('#final_submit').on('click', function (e) {
  e.preventDefault();
  $(".h-link").find("a")[0].click();
});

$(".next").click(function(){
	if(animating) return false;
	animating = true;
  // var newJourney = $('.new_journey')[0]

	current_fs = $(this).parent();
	next_fs = $(this).parent().next();

	//activate next step on progressbar using the index of next_fs
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

	//show the next fieldset
	next_fs.show();
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2;
			//2. bring next_fs from the right(50%)
			left = (now * 50)+"%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({
        'transform': 'scale('+scale+')',
        'position': 'absolute'
      });
			next_fs.css({'left': left, 'opacity': opacity});
		},
		duration: 800,
		complete: function(){
			current_fs.hide();
			animating = false;
		},

	});
});

$(".previous").click(function(){
	if(animating) return false;
	animating = true;

	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();

	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

	//show the previous fieldset
	previous_fs.show();
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		},
		duration: 800,
		complete: function(){
			current_fs.hide();
			animating = false;
		},
		//this comes from the custom easing plugin
	});
});

$(".submit").click(function(){
	return false;
})

});
