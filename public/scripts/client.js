/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
}