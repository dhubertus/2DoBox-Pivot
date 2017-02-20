//To initate our tests, we must first include the selenium-webdriver module. We require the module and assign it to the variable "webdriver". We create a "By" and "until" shorthand variable for referencing the "By" class and "until" module more easily within our subsequent code. "until" defines common conditions for use with "WebDriver wait". "By" describes a mechanism for locating an element on the page.

var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;


var driver_chr = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

// var driver_fx = new webdriver.Builder()
//     .forBrowser('firefox')
//     .build();
// var driver_saf = new webdriver.Builder()
//     .forBrowser('safari')
//     .build();

cardCreationTest(driver_chr);
// cardCreationTest(driver_fx);

titleValueTest(driver_chr);
// titleValueTest(driver_fx);

bodyValueTest(driver_chr);
// bodyValueTest(driver_fx);

prependTest(driver_chr);
// prependTest(driver_fx);

searchFilterTest(driver_chr);
// searchFilterTest(driver_fx);

deleteFromDOMTest(driver_chr);
// deleteFromDOMTest(driver_fx);

upvoteTest(driver_chr);
// upvoteTest(driver_fx);

downvoteTest(driver_chr);
// downvoteTest(driver_fx);

editTitleTest(driver_chr);
// editTitleTest(driver_fx);

editBodyTest(driver_chr);
// editBodyTest(driver_fx);

lsUpVote(driver_chr);
// lsUpVote(driver_fx);

lsDownVote(driver_chr);
// lsDownVote(driver_fx);

lsBodyTest(driver_chr);
// lsBodyTest(driver_fx);

lsTitleTest(driver_chr);
// lsTitleTest(driver_fx);

lsDeleteTest(driver_chr);
// lsDeleteTest(driver_fx);

function cardCreationTest(driver) {
  driver.get('https://dhubertus.github.io/2DoBox-Pivot/');
  driver.findElement(By.id('title-input')).sendKeys('hello');
  driver.findElement(By.id('save-button')).click();

  driver.sleep(3000).then(function() {
    driver.findElement(By.className('card-title')).getText().then(function(title) {
      if(title === 'hello') {
        console.log('Test 1 passed');
      } else {
        console.log('Test 1 failed');
      }
    });
  });
}

function titleValueTest(driver) {
  driver.get('https://dhubertus.github.io/2DoBox-Pivot/');
  driver.findElement(By.id('title-input')).sendKeys('hello');
  driver.findElement(By.id('save-button')).click();
  driver.findElement(By.id('title-input')).sendKeys('');
  driver.findElement(By.id('save-button')).click();

  driver.sleep(3000).then(function() {
    driver.findElement(By.className('card-title')).getText().then(function(title) {
      if(title === '') {
        console.log('Test 2 failed');
      } else if (title === 'hello'){
        console.log('Test 2 passed');
      }
    });
  });
}

function bodyValueTest(driver) {
  driver.get('https://dhubertus.github.io/2DoBox-Pivot/');
  driver.findElement(By.id('body-input')).sendKeys('this is the body');
  driver.findElement(By.id('save-button')).click();
  driver.findElement(By.id('body-input')).sendKeys('');
  driver.findElement(By.id('save-button')).click();

  driver.sleep(3000).then(function() {
    driver.findElement(By.className('card-body')).getText().then(function(title) {
      if(title === '') {
        console.log('Test 3 failed');
      } else if (title === 'this is the body'){
        console.log('Test 3 passed');
      }
    });
  });
}

function prependTest(driver) {
  driver.get('https://dhubertus.github.io/2DoBox-Pivot/');
  driver.findElement(By.id('title-input')).sendKeys('First card');
  driver.findElement(By.id('save-button')).click();
  driver.findElement(By.id('title-input')).sendKeys('Second card');
  driver.findElement(By.id('save-button')).click();

  driver.sleep(3000).then(function() {
    driver.findElement(By.className('card-title')).getText().then(function(title) {
      if(title === 'First card') {
        console.log('Test 4 failed');
      } else if (title === 'Second card'){
        console.log('Test 4 passed');
      }
    });
  });
}

function searchFilterTest(driver) {
  driver.get('https://dhubertus.github.io/2DoBox-Pivot/');
  driver.findElement(By.id('title-input')).sendKeys('Google');
  driver.findElement(By.id('save-button')).click();
  driver.findElement(By.id('title-input')).sendKeys('Amazon');
  driver.findElement(By.id('save-button')).click();
  driver.findElement(By.id('search-input')).sendKeys('Amazon');

  driver.sleep(3000).then(function() {
    driver.findElement(By.className('card-title')).getText().then(function(title) {
      if(title === 'Google') {
        console.log('Test 5 failed');
      } else if (title === 'Amazon'){
        console.log('Test 5 passed');
      }
    });
  });
}

function deleteFromDOMTest(driver) {
  driver.get('https://dhubertus.github.io/2DoBox-Pivot/');
  driver.findElement(By.id('title-input')).sendKeys('Remaining card');
  driver.findElement(By.id('save-button')).click();
  driver.findElement(By.id('title-input')).sendKeys('Card to be deleted');
  driver.findElement(By.id('save-button')).click();


  driver.sleep(3000).then(function() {
    driver.findElement(By.className('delete-button')).click();
    driver.findElement(By.className('card-title')).getText().then(function(title) {
      if(title === 'Card to be deleted') {
        console.log('Test 6 failed');
      } else if (title === 'Remaining card'){
        console.log('Test 6 passed');
      }
    });
  });
}


function upvoteTest(driver) {
  driver.get('https://dhubertus.github.io/2DoBox-Pivot/');
  driver.findElement(By.id('title-input')).sendKeys('Best idea yet');
  driver.findElement(By.id('save-button')).click();

  driver.sleep(3000).then(function() {
    driver.findElement(By.className('current-quality')).getText().then(function(quality){
      if(quality === 'swill') {
        console.log('Test 7 Passed')
      } else {
        console.log('Test 7 Failed');
      }
    })
    driver.findElement(By.className('upvote-button')).click();
    driver.findElement(By.className('current-quality')).getText().then(function(quality) {
      if(quality === 'swill') {
        console.log('Test 8 failed');
      } else if (quality === 'plausible'){
        console.log('Test 8 passed');
      }
    });
    driver.findElement(By.className('upvote-button')).click();
    driver.findElement(By.className('current-quality')).getText().then(function(quality){
      if(quality === 'plausible') {
        console.log('Test 9 failed');
      } else if (quality === 'genius') {
        console.log('Test 9 passed');
      }
    })
  });
}


function downvoteTest(driver) {
  driver.get('https://dhubertus.github.io/2DoBox-Pivot/');
  driver.findElement(By.id('title-input')).sendKeys('Best idea yet');
  driver.findElement(By.id('save-button')).click();

  driver.sleep(3000).then(function() {
    driver.findElement(By.className('upvote-button')).click();
    driver.findElement(By.className('upvote-button')).click();
    driver.findElement(By.className('current-quality')).getText().then(function(quality){
      if(quality === 'genius') {
        console.log('Test 10 Passed')
      } else {
        console.log('Test 10 Failed');
      }
    });

    driver.findElement(By.className('downvote-button')).click();
    driver.findElement(By.className('current-quality')).getText().then(function(quality) {
      if(quality === 'genius') {
        console.log('Test 11 failed');
      } else if (quality === 'plausible'){
        console.log('Test 11 passed');
      }
    });
    driver.findElement(By.className('downvote-button')).click();
    driver.findElement(By.className('current-quality')).getText().then(function(quality){
      if(quality === 'plausible') {
        console.log('Test 12 failed');
      } else if (quality === 'swill') {
        console.log('Test 12 passed');
      }
    })
  });
}

function editTitleTest(driver) {
  driver.get('https://dhubertus.github.io/2DoBox-Pivot/');
  driver.findElement(By.id('title-input')).sendKeys('heyoo');
  driver.findElement(By.id('save-button')).click();

  driver.sleep(3000).then(function() {
    driver.findElement(By.className('card-title')).sendKeys('heyoooooo');
    driver.sleep(3000);
    driver.findElement(By.className('card-title')).getText().then(function(title) {
      if(title === 'heyooooooheyoo') {
        console.log('Test 13 passed');
      } else {
        console.log('Test 13 failed');
      }
    });
  });
}


function editBodyTest(driver) {
  driver.get('https://dhubertus.github.io/2DoBox-Pivot/');
  driver.findElement(By.id('body-input')).sendKeys('woowoo');
  driver.findElement(By.id('save-button')).click();

  driver.sleep(3000).then(function() {
    driver.findElement(By.className('card-body')).sendKeys('heyhey');
    driver.sleep(3000);
    driver.findElement(By.className('card-body')).getText().then(function(title) {
      if(title === 'heyheywoowoo') {
        console.log('Test 14 passed');
      } else {
        console.log('Test 14 failed');
      }
    });
  });
}


function lsUpVote(driver) {
  driver.get('https://dhubertus.github.io/2DoBox-Pivot/');
  driver.findElement(By.id('title-input')).sendKeys('rendering on page');
  driver.findElement(By.id('body-input')).sendKeys('rendering on page');
  driver.findElement(By.id('save-button')).click();

  driver.sleep(3000).then(function() {
    driver.findElement(By.className('upvote-button')).click();
    driver.findElement(By.className('current-quality')).getText().then(function(quality){
console.log(quality);
      if(quality === 'plausible') {
        console.log('Test 15 Passed')
      } else {
        console.log('Test 15 Failed');
      }

      driver.get('https://dhubertus.github.io/2DoBox-Pivot/');
      driver.sleep(3000);
      driver.findElement(By.className('current-quality')).getText().then(function(quality){
        console.log(quality);
        if(quality === 'plausible') {
          console.log('Test 16 Passed')
        } else {
          console.log('Test 16 Failed');
        }
    });
  })
})
}

function lsDownVote(driver) {
  driver.get('https://dhubertus.github.io/2DoBox-Pivot/');
  driver.findElement(By.id('title-input')).sendKeys('Downvote working?');
  driver.findElement(By.id('body-input')).sendKeys('rendering on page');
  driver.findElement(By.id('save-button')).click();

  driver.sleep(3000).then(function() {
    driver.findElement(By.className('upvote-button')).click();
    driver.findElement(By.className('upvote-button')).click();
    driver.findElement(By.className('current-quality')).getText().then(function(quality){
      if(quality === 'genius') {
        console.log('Test 17 Passed')
      } else {
        console.log('Test 17 Failed');
      }
      driver.findElement(By.className('downvote-button')).click();
      driver.navigate().refresh();
      driver.findElement(By.className('current-quality')).getText().then(function(quality){
        if(quality === 'plausible') {
          console.log('Test 18 Passed')
        } else {
          console.log('Test 18 Failed');
        }
    });
  })
})
}

function lsBodyTest(driver) {
  driver.get('https://dhubertus.github.io/2DoBox-Pivot/');
  driver.findElement(By.id('body-input')).sendKeys('woowoo');
  driver.findElement(By.id('save-button')).click();

  driver.sleep(3000).then(function() {
    driver.findElement(By.className('card-body')).sendKeys('heyhey');
    driver.findElement(By.className('upvote-button')).click();
    driver.navigate().refresh();
    driver.sleep(3000);
    driver.findElement(By.className('card-body')).getText().then(function(title) {
      if(title === 'heyheywoowoo') {
        console.log('Test 19 passed');
      } else {
        console.log('Test 19 failed');
      }
    });
  });
}

function lsTitleTest(driver) {
  driver.get('https://dhubertus.github.io/2DoBox-Pivot/');
  driver.findElement(By.id('title-input')).sendKeys('woowoo');
  driver.findElement(By.id('save-button')).click();

  driver.sleep(3000).then(function() {
    driver.findElement(By.className('card-title')).sendKeys('heyhey');
    driver.findElement(By.className('upvote-button')).click();
    driver.navigate().refresh();
    driver.sleep(3000);
    driver.findElement(By.className('card-title')).getText().then(function(title) {
      if(title === 'heyheywoowoo') {
        console.log('Test 20 passed');
      } else {
        console.log('Test 20 failed');
      }
    });
  });
}

function lsDeleteTest(driver) {
  driver.get('https://dhubertus.github.io/2DoBox-Pivot/');
  driver.findElement(By.id('title-input')).sendKeys('Remaining card');
  driver.findElement(By.id('save-button')).click();
  driver.findElement(By.id('title-input')).sendKeys('Card to be deleted');
  driver.findElement(By.id('save-button')).click();


  driver.sleep(3000).then(function() {
    driver.findElement(By.className('delete-button')).click();
    driver.navigate().refresh();
    driver.findElement(By.className('card-title')).getText().then(function(title) {
      if(title === 'Card to be deleted') {
        console.log('Test 21 failed');
      } else if (title === 'Remaining card'){
        console.log('Test 21 passed');
      }
    });
  });
    driver.quit();
}
