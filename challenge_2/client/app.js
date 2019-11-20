document.getElementById('submit').addEventListener("click", function(event) {

  event.preventDefault();

  if (document.getElementById('textInput').value !== '') {
    fetch('/', {
      method: 'POST',
      body: document.getElementById('textInput').value,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } else {

    var file = document.getElementById('fileInput').files[0];

    if (file !== undefined) {
      printFile(file);
    }
  }
});

function printFile(file) {
  var reader = new FileReader();
  reader.onload = function(evt) {
    var data = evt.target.result;

    fetch('/', {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  };
  reader.readAsText(file);
}