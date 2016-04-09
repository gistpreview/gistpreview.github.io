(function () {
  function showError (message) {
    document.getElementById('alert-box').innerHTML
      += '<div class="alert alert-danger">'
      +    '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'
      +    message
      +  '</div>';
  }

  document.getElementById('submit').onclick = function () {
    location.search = document.getElementById('gist_id').value + '/'
                    + document.getElementById('file_name').value;
  }

  // 1. check query string
  var query = location.search.substring(1);
  if (query.length === 0) {
    return;
  }

  // 2. get gist id and file name
  query = query.split('/');
  var gistId = query[0];
  var fileName = query[1];

  // 3. write data to blank
  document.getElementById('gist_id').value = gistId;
  document.getElementById('file_name').value = fileName;

  // 4-1. check gist id
  if (gistId.length === 0 || /^[0-9a-f]*$/g.test(gistId) === false) {
    showError('Gist Id <strong>' + gistId + '</strong> is invalid')
    return;
  }

  // 4-2. check file name
  if (typeof fileName !== 'string' || fileName.length === 0) {
    showError('File Name <strong>' + fileName + '</strong> is invalid');
    return;
  }

  // 5. fetch data
  fetch('https://api.github.com/gists/' + gistId)
  .then(function (res) {
    if (res.status !== 200) {
      throw new Error('Gist Id <strong>' + gistId + '</strong> is not exist');
    }
    return res.json();
  })
  .then(function (info) {
    if (info.files.hasOwnProperty(fileName) === false) {
      throw new Error('File <strong>' + fileName + '</strong> is not exist');
    }

    // 6. write data
    var content = info.files[fileName].content;
    document.write(content);
  })
  .catch(function (err) {
    showError(err.message);
  });
})();
