/** 
 * Install Web Application
 * @manifestURL {string} url of webapp.manifest (must be full url)
 */

var manifestURL = document.location.href + 'manifest.webapp';
var manifestRelativeURL = manifestURL.replace(/^app:\/\/[^\/]+/, "");
var Apps = navigator.mozApps;

function checkInstalled(manifestURL) {
  var req = Apps.checkInstalled(manifestURL);
  req.onsuccess = function(e) {
    var app = req.result
    if (app) {
      //console.log(app.manifest.name + "がインストールされています");
      console.log("アプリはインストールされています");
      return app;
    }
    else {
      console.log("アプリはインストールされていません");
    }
  };
  req.onerror = function(e) {
    console.log("Apps.checkInstalled() 呼び出しエラー: " + this.error.name);
  };
}

function install(manifestURL) {
  var req = Apps.install(manifestURL);
  req.onsuccess = function() {
    console.log("result.origin: " + this.result.origin);
  };
  req.onerror = function(e) {
    console.log("Apps.install() 呼び出しエラー: " + this.error.name);
  };
}

var installer = document.getElementById("installer");
var installButton = document.getElementById("installButton");

var installedApp = checkInstalled(manifestURL);
if (installedApp) {
  installer.style.display = "none";
}
else {
  installButton.addEventListener("click", function() {
    install(manifestURL);
  });
}




