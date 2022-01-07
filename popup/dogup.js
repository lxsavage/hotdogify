"use strict";

function startListening() {
  document.addEventListener("click", () => {
    // Emit an event to signal the content script to replace the page's images with hot dogs
    function hotdogify(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {
        command: "hotdogify",
      });
    }

    // Report a promise rejection from hotdogify or querying for the active tab
    function reportError(error) {
      console.error(`Runtime error in Hot-Dogify: ${error}`);
    }

    // Call the content script to replace the images on the page with hot dogs
    browser.tabs
      .query({ active: true, currentWindow: true })
      .then(hotdogify)
      .catch(reportError);
  });
  enableButton();
}

// Enable the button on the page in the event that the injection of the script is successful
function enableButton() {
  let btn = document.getElementById("--dog-button");
  btn.disabled = false;
  btn.classList.remove("--dog-button-disabled");
}

// Display an error message from executing the content script
function scriptError(error) {
  console.error(`Unable to run script injection: ${error}`);
  document.getElementById("--dog-error").hidden = false;
}

// Inject the content script, then add the event listener for the Hotdog button.
browser.tabs
  .executeScript({ file: "/content-scripts/hotdogify.js" })
  .then(startListening)
  .catch(scriptError);
