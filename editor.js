console.log("Initialize editor.");

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(request);
  if(request.action == "read_html") {
    var html = document.documentElement.outerHTML;
    console.log(html);
    sendResponse(html);
  }
  if(request.action == "edit_page") {
    document.designMode = "on";
    sendResponse();
  }
});