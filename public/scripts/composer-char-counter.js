// counts amount of text inputted into form and displays
// how many remaining characters are left to be used
$(document).ready(function() {
  $('.new-tweet form textarea').on('input', function() {
    let maxLength = 140;
    let currentLength = $(this).val().length;
    let count = maxLength - currentLength;
    if (count < 0)  {
      $('.counter').text(count);
      $('.counter').addClass("warning");
    } else if (count >= 0) {
      $('.counter').removeClass("warning");
      $('.counter').text(count);
    }
  });
});
