var microcms = {};

microcms.edit = function() {
  microcms.send_message({action: "edit_page"}, function() {
    microcms.write_info("Editing...");
  });
};

microcms.get_html = function(callback) {
  microcms.send_message({action: "read_html"}, function(response) {
    callback(response);
  });
};

microcms.save = function() {
  var github = new Github({
    username: localStorage['account'],
    password: localStorage['password'],
    auth: "basic"
  });
  var repo = github.getRepo(
    localStorage['user'],
    localStorage['repository']
  );
  microcms.get_html(function(html) {
    repo.write(
      localStorage['branch'],
      'index.html',
      html,
      'updated via microcms',
      function(err) {
        if(err) {
          microcms.write_info(err);
        } else {
          microcms.write_info("Saved", 4000);
        }
      });
  });
};

microcms.send_message = function(request, callback) {
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendMessage(tab.id, request, callback);
  });
};

microcms.write_info = function(message, duration) {
  $("#message").show();
  $("#message").html(message);
  if(duration) {
    $("#message").hide(duration);
  }
}

$(document).ready(function() {
  $("#save").click(function() {
    microcms.save();
  });
  $("#edit").click(function() {
    microcms.edit();
  });
});