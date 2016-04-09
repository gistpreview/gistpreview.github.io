(function () {
  var input = location.search.substring(1).split('/');
  var gistId = input[0];
  var fileName = input[1] || 'index.html';

  fetch('https://api.github.com/gists/' + gistId)
  .then(function (res) {
    if (res.status !== 200) {
      var err = new Error(gistId + ' is not found');
      err.code = 'ENOENT';
      throw err;
    }
    return res.json();
  })
  .then(function (info) {
    if (info.files.hasOwnProperty(fileName) === false) {
      var err = new Error(fileName + ' is not found');
      err.code = 'ENOENT';
      throw err;
    }

    var content = info.files[fileName].content;
    document.write(content);
  })
  .catch(function (err) {
    console.error(err);
  });
})();
