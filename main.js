(function () {
  function showMainPage () {
    document.getElementById('main').className = 'container';  // remove class 'hide'
    document.getElementById('loading').className += ' hide';  // add class 'hide'
  }

  function showError (message) {
    document.getElementById('alert-box').innerHTML
      += '<div class="alert alert-danger">'
      +    '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'
      +    message
      +  '</div>';
  }

  function submit () {
    var query = document.getElementById('gist_id').value;
    var fileName = document.getElementById('file_name').value;
    if (fileName) {
      query += '/' + fileName;
    }
    location.search = query;  // page will be refreshed
  }

  document.getElementById('submit').onclick = submit;
  document.onkeypress = function (e) {
    if (e.keyCode === 13) submit();
  }

  // 1. check query string
  var query = location.search.substring(1);
  if (query.length === 0) {
    showMainPage();
    return;
  }

  // 2. get gist id and file name
  query = query.split('/');
  var gistId = query[0];
  var fileName = decodeURIComponent(query[1] || '');

  // 3. write data to blank
  document.getElementById('gist_id').value = gistId;
  document.getElementById('file_name').value = fileName;

  // 4. fetch data
  fetch('https://api.github.com/gists/' + gistId)
  .then(function (res) {
    return res.json().then(function (body) {
      if (res.status === 200) {
        return body;
      }
      console.log(res, body); // debug
      throw new Error('Gist <strong>' + gistId + '</strong>, ' + body.message.replace(/\(.*\)/, ''));
    });
  })
  .then(function (info) {
    if (fileName === '') {
      for (var file in info.files) {
        // index.html or the first file
        if (fileName === '' || file === 'index.html') {
          fileName = file;
        }
      }
    }

    if (info.files.hasOwnProperty(fileName) === false) {
      throw new Error('File <strong>' + fileName + '</strong> is not exist');
    }

    // 5. write data
    var content = info.files[fileName].content;
    document.write(content);
  })
  .catch(function (err) {
    showMainPage();
    showError(err.message);
  });
})();
