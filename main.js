$(function () {
  for (var i = 0; i < localStorage.length; i++){
    var $storedIdeas = getStoredIdeas(localStorage.key(i));
    prependIdeaBox($storedIdeas)
  }
})

function getStoredIdeas (id) {
  return JSON.parse(localStorage.getItem(id));
}

$('#save-button').on('click', function() {
  var $title = $('#title-input').val();
  var $body = $('#body-input').val();
  var $uniqId = Date.now()
  var $quality = 'swill';
  var $newIdea = new IdeaObject ($uniqId, $title, $body, $quality);
  var $key = $newIdea.id;
  localStorage.setItem($key, JSON.stringify($newIdea));
  prependIdeaBox($newIdea);
  resetInputs();
})

function IdeaObject (id, title, body, quality){
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = quality;
}

function prependIdeaBox(ideaObj) {
  $('.prepend-container').prepend(
    `<article class="card" id="${ideaObj.id}">
      <button class="delete-button"></button>
      <section class="search-target">
      <h2 class="idea-title" contenteditable>${ideaObj.title}</h2>
      <p class="idea-body" contenteditable>${ideaObj.body}</p>
      </section>
      <section class="quality">
        <button class="upvote-button"></button>
        <button class="downvote-button"></button>
        <h3>quality: <span class="current-quality">${ideaObj.quality}</span></h3>
      </section>
    </article>
    `
  )
}

$('.prepend-container').on('click', '.delete-button', (function() {
  var $selectId = $(this).parents('.card').attr('id')
  $(this).parents('.card').remove()
  localStorage.removeItem($selectId)
}))

function resetInputs(){
  $('#title-input, #body-input').val("");
  $('#save-button').prop('disabled', true);
}

$('#title-input, #body-input').on('keyup', function(){
  $('#save-button').prop('disabled', false);
})

$('.prepend-container').on('click','.upvote-button' , function() {
  var $currentQuality = $(this).closest('.card').find('.current-quality');
  if ($currentQuality.text() === "swill") {
    $currentQuality.text("plausible");
  } else if ($currentQuality.text() === "plausible"){
    $currentQuality.text("genius");
  }
  var $key = $(this).closest('.card').attr('id');
  var $updatedQuality = $currentQuality.text();
  var ideaBox = JSON.parse(localStorage.getItem($key));
  ideaBox.quality = $updatedQuality;
  localStorage.setItem($key, JSON.stringify(ideaBox))
})

$('.prepend-container').on('click','.downvote-button', function() {
  var $currentQuality = $(this).closest('.card').find('.current-quality');
  if ($currentQuality.text() === "genius") {
    $currentQuality.text("plausible");
  } else if ($currentQuality.text() === "plausible"){
    $currentQuality.text("swill");
  }
  var $key = $(this).closest('.card').attr('id');
  var $updatedQuality = $currentQuality.text();
  var ideaBox = JSON.parse(localStorage.getItem($key));
  ideaBox.quality = $updatedQuality;
  localStorage.setItem($key, JSON.stringify(ideaBox))
})

$('.prepend-container').on('focus', '.idea-title, .idea-body', function() {
  var $key = $(this).closest('.card').attr('id')
  var ideabox = JSON.parse(localStorage.getItem($key));
  $(this).on('keydown', function(event) {
    if(event.keyCode === 13){
      event.preventDefault();
      $(this).blur();
      return false;
    }
  })

  $(this).on('blur', function() {
    ideabox.title = $(this).closest('.card').find('.idea-title').text();
    ideabox.body = $(this).closest('.card').find('.idea-body').text();
    localStorage.setItem($key, JSON.stringify(ideabox));
  })
})

$('#search-input').on('keyup',function (){
  var $searchValue = $(this).val().toLowerCase();
  $('.search-target').each(function(){
    var $text = $(this).text().toLowerCase();
    var $isAMatch = !!$text.match($searchValue);
    $(this).closest('.card').toggle($isAMatch);
  });
});
