/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [];

// function that converts milliseconds into a string that states how many
// minutes, days, hours, days, weeks, months or years ago the tweet was created
const formatTime = function(timeCreated) {
  let diff = Math.floor((Date.now() - timeCreated) / 1000);
  let interval = Math.floor(diff / 31536000);
  if (interval >= 1) {
    return interval + " years ago";
  }
  interval = Math.floor(diff / 2592000);
  if (interval >= 1) {
    return interval + " months ago";
  }
  interval = Math.floor(diff / 604800);
  if (interval >= 1) {
    return interval + "weeks ago";
  }
  interval = Math.floor(diff / 86400);
  if (interval >= 1) {
    return interval + " days ago";
  }
  interval = Math.floor(diff / 3600);
  if (interval >= 1) {
    return interval + " hours ago";
  }
  interval = Math.floor(diff / 60);
  if (interval >= 1) {
    return interval + " minutes ago";
  }
  return "<1 minute ago";
};

// function that converts script injections into
// a text format that will not be executed as javascript
const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// function that creates new tweets from an object containing
// user data and input
const createTweetElement = function(tweet) {
  let date = formatTime(tweet.created_at);
  let $tweet = $(`<article>
  <div class="tweet-header">
    <img class='avatar' src=${escape(tweet.user.avatars)} alt=''>
    <p class='name'>${escape(tweet.user.name)}</p>
    <p class='handle'>${escape(tweet.user.handle)}</p>
  </div>
  <div class="tweet-content">
    <p>${escape(tweet.content.text)}</p>
  </div>
  <footer class="tweet-footer">
    <p>${escape(date)}</p>
    <div class='icons'>
      <i class='fas fa-flag'></i>
      <i class='fas fa-share'></i>
      <i class='fas fa-heart'></i>
    </div>
  </footer>
</article>`).addClass('tweet');
  return $tweet;
};

// function that prepends input onto the page
const renderTweets = function(tweets) {
  if (Array.isArray(tweets))  {
    tweets.forEach(function(element) {
      $('.tweets-container').prepend(createTweetElement(element));
    });
  } else {
    $('.tweets-container').prepend(createTweetElement(tweets));
  }
};

$(document).ready(function() {
  // function that sends a GET request and displays return data
  // as tweets on page
  const loadtweets = function(notFirstLoad) {
    $.ajax({url: "http://localhost:8080/tweets", method: "GET"})
      .then((data) => {
        let dataLast = data[data.length - 1];
        if (!notFirstLoad)  {
          renderTweets(data);
        } else if (notFirstLoad) {
          renderTweets(dataLast);
        }
      });
  };

  $('form').hide();
  loadtweets();

  // form submit event handler with data validation to ensure tweet
  // length is betweem 0 and 140 characters inclusive
  $('form').submit((event) => {
    event.preventDefault();
    const formData = $("#textarea").serialize();
    if (formData.length > 145 || formData.length <= 5)  {
      $('#error').replaceWith("<p id='error'>⚠️ Error: Tweets must be between 0 to 140 characters long ⚠️</p>");
      $('#error').slideDown(300);
    } else {
      $('#error').slideUp(300);
      console.log("form",formData);
      $.ajax({url: "http://localhost:8080/tweets", method: "POST", data: formData})
        .then(() => {
          loadtweets(true);
          $('#textarea').val('');
          $('.counter').text(140);
        });
    }
  });

  // event handler that opens and closes form text area on click
  $('#writeTweet').click(() => {
    $('form').slideToggle(100);
    $('textarea').focus();
  });

  $('#icon').click(() => {
    $('form').slideToggle(100);
    $('textarea').focus();
  });
});
