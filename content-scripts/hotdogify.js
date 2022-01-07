"use strict";

(function () {
  // Prevent multiple instances of this script being on the same page.
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  // Gets the URL for a random hot dog image
  function getDogUrl() {
    const currentDog = Math.floor(Math.random() * 10);
    return browser.runtime.getURL(`assets/hotdog${currentDog}.png`);
  }

  // Iterates over every image in the page, then replaces it with a random hot dog.
  function insertDogs() {
    document.body.style.fontFamily += "Comic Sans MS";
    const images = document.getElementsByTagName("img");
    if (images.length > 0) {
      Array.prototype.forEach.call(images, (image) => {
        image.setAttribute("src", getDogUrl());
      });
    }
  }

  // Implement an event listener that fires when the button event is emitted from the popup.
  browser.runtime.onMessage.addListener((message) => {
    switch (message.command) {
      case "hotdogify":
        insertDogs();
        break;
      case "refresh":
        window.location.reload();
        break;
      default:
        break;
    }
  });
})();
