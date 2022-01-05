"use script";
function startListening() {
  document.addEventListener("click", () => {
    function hotdogify(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {
        command: "hotdogify",
      });
    }

    function reportError(error) {
      console.error(`Runtime error in Hot-Dogify: ${error}`);
    }

    browser.tabs
      .query({ active: true, currentWindow: true })
      .then(hotdogify)
      .catch(reportError);
  });
}

function scriptError(error) {
  console.error(`Unable to run script injection: ${error}`);
  let btn = document.getElementById("--dog-button");
  btn.disabled = true;
  btn.addClass("--dog-button-disabled");
  document.getElementById("--dog-success").display = "none";
  document.getElementById("--dog-error").display = "inline";
  console.log("beep");
}

browser.tabs
  .executeScript({ file: "/content-scripts/hotdogify.js" })
  .then(startListening)
  .catch(scriptError);
