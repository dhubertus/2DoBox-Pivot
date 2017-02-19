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

  driver.quit();
}
