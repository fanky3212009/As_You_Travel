// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).on('ready page:load', function() {

  $('.fancybox').fancybox();

  $(".fancybox-effects-d").fancybox({
    padding: 0,

    openEffect : 'elastic',
    openSpeed  : 150,

    closeEffect : 'elastic',
    closeSpeed  : 150,

    closeClick : true,

    helpers : {
      overlay : null
    }
  });



    $("#modal-1").on("change", function() {
      if ($(this).is(":checked")) {
        $("body").addClass("modal-open");
      } else {
        $("body").removeClass("modal-open");
      }
    });

    $(".modal-fade-screen, .modal-close").on("click", function() {
      $(".modal-state:checked").prop("checked", false).change();
    });

    $(".modal-inner").on("click", function(e) {
      e.stopPropagation();
    });


});


// Dropzone.options.myAwesomeDropzone = { // The camelized version of the ID of the form element
//
//   // The configuration we've talked about above
//   autoProcessQueue: false,
//   uploadMultiple: true,
//   parallelUploads: 100,
//   maxFiles: 100,
//   addRemoveLinks:true,
//
//   // The setting up of the dropzone
//   init: function() {
//     var myDropzone = this;
//
//     // First change the button to actually tell Dropzone to process the queue.
//     // var self = this.element.getElementsByClassName("submit-picture")
//     $('.submit-picture').on("click", function(e) {
//       // Make sure that the form isn't actually being sent.
//       e.preventDefault();
//       e.stopPropagation();
//       myDropzone.processQueue();
//     });
//
//     // Listen to the sendingmultiple event. In this case, it's the sendingmultiple event instead
//     // of the sending event because uploadMultiple is set to true.
//     this.on("sendingmultiple", function() {
//       // Gets triggered when the form is actually being sent.
//       // Hide the success button or the complete form.
//     });
//     this.on("successmultiple", function(files, response) {
//       // Gets triggered when the files have successfully been sent.
//       // Redirect user or notify of success.
//     });
//     this.on("errormultiple", function(files, response) {
//       // Gets triggered when there was an error sending the files.
//       // Maybe show form again, and notify user of error
//     });
//   }
// }

// $(document).ready(function(){
//   // disable auto discover
//   Dropzone.autoDiscover = false;
//
//   var dropzone = new Dropzone (".dropzone", {
//     maxFilesize: 256, // set the maximum file size to 256 MB
//     paramName: "image[avatar]", // Rails expects the file upload to be something like model[field_name]
//     addRemoveLinks: false // don't show remove links on dropzone itself.
//   });
//
//   dropzone.on("success", function(file) {
//     this.removeFile(file);
//     $.getScript("/images");
//   })
// });
