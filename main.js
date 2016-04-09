(function () {
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
  if (/^[0-9a-f]*$/g.test(gistId) === false) {
    console.error('Gist Id ' + gistId + ' is invalid')
    return;
  }

  // 4-2. check file name
  if (typeof fileName !== 'string' || fileName.length === 0) {
    console.error('File Name ' + fileName + ' is invalid');
    return;
  }

  // 5. fetch data
  fetch('https://api.github.com/gists/' + gistId)
  .then(function (res) {
    if (res.status !== 200) {
      throw new Error('Gist Id ' + gistId + ' is not exist');
    }
    return res.json();
  })
  .then(function (info) {
    if (info.files.hasOwnProperty(fileName) === false) {
      throw new Error('File ' + fileName + ' is not exist');
    }

    // 6. write data
    var content = info.files[fileName].content;
    document.write(content);
  })
  .catch(function (err) {
    console.error(err);
  });
})();
