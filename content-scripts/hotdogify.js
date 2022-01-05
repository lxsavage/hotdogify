"use strict";
(function () {
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;
  const DOG_COUNT = 10;
  console.log("Hot-Dogify v1.0 by Logan Savage");
  function getDogUrl() {
    const currentDog = Math.floor(Math.random() * DOG_COUNT);
    return browser.runtime.getURL(`assets/hotdog${currentDog}.png`);
  }

  function insertDogs() {
    document.body.style += "Comic Sans MS";
    const images = document.getElementsByTagName("img");
    if (images.length > 0) {
      Array.prototype.forEach.call(images, (image) => {
        image.setAttribute("src", getDogUrl());
      });
    } else {
      console.log("No images detected on page");
    }
  }

  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "hotdogify") {
      insertDogs();
    }
  });
})();
