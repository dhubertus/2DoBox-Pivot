//To initate our tests, we must first include the selenium-webdriver module. We require the module and assign it to the variable "webdriver". We create a "By" and "until" shorthand variable for referencing the "By" class and "until" module more easily within our subsequent code. "until" defines common conditions for use with "WebDriver wait". "By" describes a mechanism for locating an element on the page.

var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

// var driver_fx = new webdriver.Builder()
//     .forBrowser('firefox')
//     .build();

var driver_chr = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

// var driver_saf = new webdriver.Builder()
//     .forBrowser('safari')
//     .build();

// cardCreationTest(driver_fx);
cardCreationTest(driver_chr);
titleValueTest(driver_chr);
// cardCreationTest(driver_saf);

bodyValueTest(driver_chr);

prependTest(driver_chr);

searchFilterTest(driver_chr);

deleteFromDOMTest(driver_chr);

upvoteTest(driver_chr);

downvoteTest(driver_chr);

editTitleTest(driver_chr);

editBodyTest(driver_chr);

localStorageTest(driver_chr);

function cardCreationTest(driver) {
  driver.get('https://buji405.github.io/2DoBox-Pivot/');
  driver.findElement(By.id('title-input')).sendKeys('hello');
  driver.findElement(By.id('save-button')).click();

  driver.sleep(3000).then(function() {
    driver.findElement(By.className('idea-title')).getText().then(function(title) {
      if(title === 'hello') {
        console.log('Test 1 passed');
      } else {
        console.log('Test 1 failed');
      }
    });
  });
}

function titleValueTest(driver) {
  driver.get('https://buji405.github.io/2DoBox-Pivot/');
  driver.findElement(By.id('title-input')).sendKeys('hello');
  driver.findElement(By.id('save-button')).click();
  driver.findElement(By.id('title-input')).sendKeys('');
  driver.findElement(By.id('save-button')).click();

  driver.sleep(3000).then(function() {
    driver.findElement(By.className('idea-title')).getText().then(function(title) {
      if(title === '') {
        console.log('Test 2 failed');
      } else if (title === 'hello'){
        console.log('Test 2 passed');
      }
    });
  });
}

function bodyValueTest(driver) {
  driver.get('https://buji405.github.io/2DoBox-Pivot/');
  driver.findElement(By.id('body-input')).sendKeys('this is the body');
  driver.findElement(By.id('save-button')).click();
  driver.findElement(By.id('body-input')).sendKeys('');
  driver.findElement(By.id('save-button')).click();

  driver.sleep(3000).then(function() {
    driver.findElement(By.className('idea-body')).getText().then(function(title) {
      if(title === '') {
        console.log('Test 3 failed');
      } else if (title === 'this is the body'){
        console.log('Test 3 passed');
      }
    });
  });
}

function prependTest(driver) {
  driver.get('https://buji405.github.io/2DoBox-Pivot/');
  driver.findElement(By.id('title-input')).sendKeys('First card');
  driver.findElement(By.id('save-button')).click();
  driver.findElement(By.id('title-input')).sendKeys('Second card');
  driver.findElement(By.id('save-button')).click();

  driver.sleep(3000).then(function() {
    driver.findElement(By.className('idea-title')).getText().then(function(title) {
      if(title === 'First card') {
        console.log('Test 4 failed');
      } else if (title === 'Second card'){
        console.log('Test 4 passed');
      }
    });
  });
}

function searchFilterTest(driver) {
  driver.get('https://buji405.github.io/2DoBox-Pivot/');
  driver.findElement(By.id('title-input')).sendKeys('Google');
  driver.findElement(By.id('save-button')).click();
  driver.findElement(By.id('title-input')).sendKeys('Amazon');
  driver.findElement(By.id('save-button')).click();
  driver.findElement(By.id('search-input')).sendKeys('Amazon');

  driver.sleep(3000).then(function() {
    driver.findElement(By.className('idea-title')).getText().then(function(title) {
      if(title === 'Google') {
        console.log('Test 5 failed');
      } else if (title === 'Amazon'){
        console.log('Test 5 passed');
      }
    });
  });
}

function deleteFromDOMTest(driver) {
  driver.get('https://buji405.github.io/2DoBox-Pivot/');
  driver.findElement(By.id('title-input')).sendKeys('Remaining card');
  driver.findElement(By.id('save-button')).click();
  driver.findElement(By.id('title-input')).sendKeys('Card to be deleted');
  driver.findElement(By.id('save-button')).click();


  driver.sleep(3000).then(function() {
    driver.findElement(By.className('delete-button')).click();
    driver.findElement(By.className('idea-title')).getText().then(function(title) {
      if(title === 'Card to be deleted') {
        console.log('Test 6 failed');
      } else if (title === 'Remaining card'){
        console.log('Test 6 passed');
      }
    });
  });
}


function upvoteTest(driver) {
  driver.get('https://buji405.github.io/2DoBox-Pivot/');
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
  driver.get('https://buji405.github.io/2DoBox-Pivot/');
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
  driver.get('https://buji405.github.io/2DoBox-Pivot/');
  driver.findElement(By.id('title-input')).sendKeys('heyoo');
  driver.findElement(By.id('save-button')).click();

  driver.sleep(3000).then(function() {
    driver.findElement(By.className('idea-title')).sendKeys('heyoooooo');
    driver.sleep(3000);
    driver.findElement(By.className('idea-title')).getText().then(function(title) {
      if(title === 'heyooooooheyoo') {
        console.log('Test 13 passed');
      } else {
        console.log('Test 13 failed');
      }
    });
  });
}


function editBodyTest(driver) {
  driver.get('https://buji405.github.io/2DoBox-Pivot/');
  driver.findElement(By.id('body-input')).sendKeys('woowoo');
  driver.findElement(By.id('save-button')).click();

  driver.sleep(3000).then(function() {
    driver.findElement(By.className('idea-body')).sendKeys('heyhey');
    driver.sleep(3000);
    driver.findElement(By.className('idea-body')).getText().then(function(title) {
      if(title === 'heyheywoowoo') {
        console.log('Test 14 passed');
      } else {
        console.log('Test 14 failed');
      }
    });
  });

}


function localStorageTest(driver) {
  driver.get('https://buji405.github.io/2DoBox-Pivot/');
  driver.findElement(By.id('title-input')).sendKeys('rendering on page');
  driver.findElement(By.id('body-input')).sendKeys('rendering on page');
  driver.findElement(By.id('save-button')).click();

  driver.sleep(3000).then(function() {
    driver.findElement(By.className('upvote-button')).click();
    driver.findElement(By.className('current-quality')).getText().then(function(quality){
      if(quality === 'plausible') {
        console.log('Test 15 Passed')
      } else {
        console.log('Test 15 Failed');
      }

      driver.navigate().refresh();
      driver.findElement(By.className('current-quality')).getText().then(function(quality){
        if(quality === 'plausible') {
          console.log('Test 16 Passed')
        } else {
          console.log('Test 16 Failed');
        }

 
    });
  })
})

  //   driver.findElement(By.className('downvote-button')).click();
  //   driver.findElement(By.className('current-quality')).getText().then(function(quality) {
  //     if(quality === 'genius') {
  //       console.log('Test 11 failed');
  //     } else if (quality === 'plausible'){
  //       console.log('Test 11 passed');
  //     }
  //   });
  //   driver.findElement(By.className('downvote-button')).click();
  //   driver.findElement(By.className('current-quality')).getText().then(function(quality){
  //     if(quality === 'plausible') {
  //       console.log('Test 12 failed');
  //     } else if (quality === 'swill') {
  //       console.log('Test 12 passed');
  //     }
  //
  //   })
  // });
  driver.quit();
}
