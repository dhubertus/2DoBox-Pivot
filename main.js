$(function () {
  for (var i = 0; i < localStorage.length; i++){
    var $storedItems = getStoredItems(localStorage.key(i));
    prependCard($storedItems);
    $('.completed-task-background').hide();
    $('article:visible').slice(10).hide();
   };
  });

function getStoredItems (id) {
  return JSON.parse(localStorage.getItem(id));
};

$('#save-button').on('click', function() {
  var $title = $('#title-input').val();
  var $body = $('#body-input').val();
  var $uniqId = Date.now()
  var $quality = 'normal';
  var $status = '';
  var $newItem = new cardObject ($uniqId, $title, $body, $quality, $status);
  var $key = $newItem.id;
  localStorage.setItem($key, JSON.stringify($newItem));
  prependCard($newItem);
  resetInputs();
  $('.completed-task-background').hide();
  $('article:visible').slice(10).hide();
  $('#save-button').prop('disabled', true);
});

function cardObject (id, title, body, quality, status){
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = quality;
  this.status = status;
};

function prependCard(cardObj) {
  $('.prepend-container').prepend(
    `<article class="card ${cardObj.status}" id="${cardObj.id}">
      <button class="delete-button"></button>
      <section class="search-target">
      <h2 class="card-title" contenteditable>${cardObj.title}</h2>
      <p class="card-body" contenteditable>${cardObj.body}</p>
      </section>
      <section class="quality">
        <button class="upvote-button"></button>
        <button class="downvote-button"></button>
        <h3>importance: <span class="current-quality">${cardObj.quality}</span></h3>
        <button class="completed-button">Done</button>
      </section>
    </article>`
  );
};

$('.prepend-container').on('click', '.delete-button', function() {
  var $selectId = $(this).parents('.card').attr('id')
  $(this).parents('.card').remove()
  localStorage.removeItem($selectId);
});

function resetInputs(){
  $('#title-input, #body-input').val("");
};

$('#title-input, #body-input').on('keyup', function(){
 var $titleInput = $('#title-input');
 var $bodyInput = $('#body-input');
 if($titleInput.val() !== "" && $bodyInput.val() !== "") {
   $('#save-button').prop('disabled', false);
 } else {
   $('#save-button').prop('disabled', true);
 }
});

$('.prepend-container').on('click','.upvote-button' , function() {
  var $currentQuality = $(this).closest('.card').find('.current-quality');
  if ($currentQuality.text() === "none") {
    $currentQuality.text("low");
  } else if ($currentQuality.text() === "low"){
    $currentQuality.text("normal");
  } else if  ($currentQuality.text() === "normal"){
    $currentQuality.text("high");
  } else if ($currentQuality.text() === "high"){
    $currentQuality.text("critical");
  }

  var $key = $(this).closest('.card').attr('id');
  var $updatedQuality = $currentQuality.text();
  var parsedObj = JSON.parse(localStorage.getItem($key));
  parsedObj.quality = $updatedQuality;
  localStorage.setItem($key, JSON.stringify(parsedObj));
});

$('.prepend-container').on('click','.downvote-button', function() {
  var $currentQuality = $(this).closest('.card').find('.current-quality');
  if ($currentQuality.text() === "critical"){
    $currentQuality.text("high");
  } else if ($currentQuality.text() === "high"){
    $currentQuality.text("normal");
  } else if ($currentQuality.text() === "normal"){
    $currentQuality.text("low");
  } else if ($currentQuality.text() === "low"){
    $currentQuality.text("none");
  }
  var $key = $(this).closest('.card').attr('id');
  var $updatedQuality = $currentQuality.text();
  var parsedObj = JSON.parse(localStorage.getItem($key));
  parsedObj.quality = $updatedQuality;
  localStorage.setItem($key, JSON.stringify(parsedObj));
});

$('.prepend-container').on('focus', '.card-title, .card-body', function() {
  var $key = $(this).closest('.card').attr('id');
  var parsedObj = JSON.parse(localStorage.getItem($key));
  $(this).on('keydown', function(event){
    if(event.keyCode === 13){
      event.preventDefault();
      $(this).blur();
      return false;
    }
  });

$(this).on('blur', function() {
  parsedObj.title = $(this).closest('.card').find('.card-title').text();
  parsedObj.body = $(this).closest('.card').find('.card-body').text();
  localStorage.setItem($key, JSON.stringify(parsedObj));
  })
});

$('#search-input').on('keyup',function (){
  var $searchValue = $(this).val().toLowerCase();
  $('.search-target').each(function(){
    var $text = $(this).text().toLowerCase();
    var $isAMatch = !!$text.match($searchValue);
    $(this).closest('.card').toggle($isAMatch);
  })
});

$('.prepend-container').on('click', '.completed-button', function(){
  var $key = $(this).closest('.card').attr('id');
  var parsedObj = JSON.parse(localStorage.getItem($key));

  if ($(this).closest('.card').hasClass('completed-task-background')){
    parsedObj.status = '';
    localStorage.setItem($key, JSON.stringify(parsedObj));
    $(this).closest('.card').toggleClass('completed-task-background');
  } else {
    parsedObj.status = 'completed-task-background';
    localStorage.setItem($key, JSON.stringify(parsedObj));
    $(this).closest('.card').toggleClass('completed-task-background');
  }
});

$('.filter-button-all').on('click', function(){
 var lookFor = '';
 console.log(lookFor);
 $('.card').each(function(index, element){
   var text = $(element).children().text().toLowerCase();
   var match = !!text.match(lookFor);
   $(element).toggle(match);
 })
 $('.completed-task-background').hide();
});

$('.filter-button-critical, .filter-button-high, .filter-button-normal, .filter-button-low, .filter-button-none').on('click', function(){
 var lookFor = $(this).text().toLowerCase();
 console.log(lookFor);
 $('.card').each(function(index, element){
   var text = $(element).find('.current-quality').text().toLowerCase();
   var match = !!text.match(lookFor);
   $(element).toggle(match);
 })
 $('.completed-task-background').hide();
 $('article:visible').slice(10).hide();
});

$('.filter-button-done').on('click', function(){
  $('.prepend-container').prepend($('.completed-task-background').show());
  $('article').slice(10).hide();
});

$('.expand').on('click', function(){
  $('article').show();
});
