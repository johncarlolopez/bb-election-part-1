document.addEventListener("DOMContentLoaded", function() {

  // Imagination!
  // https://bb-election-api.herokuapp.com/
  var imReadyButton = document.querySelector('.im_ready');
  var showDiv = document.querySelector('.show');
  imReadyButton.addEventListener('click', function() {
    $.ajax({
      url: 'https://bb-election-api.herokuapp.com/',
      method: 'GET'
    }).done(function(responseData) {
      showDiv.innerHTML = '';
      var ul = document.createElement('ul');
      for (var i = 0; i < responseData.candidates.length; i++) {
        var form = document.createElement('form');
        var li = document.createElement('li');
        var input_hidden = document.createElement('input');
        var input_button = document.createElement('input');
        input_button.type = 'submit';
        input_button.innerHTML = 'Vote';
        input_hidden.type = 'hidden';
        input_hidden.name = 'name';
        input_hidden.value = responseData.candidates[i].name;
        form.append(input_hidden, input_button);
        form.method = 'POST';
        form.action = 'https://bb-election-api.herokuapp.com/vote?name=';
        li.innerHTML = responseData.candidates[i].name + " - Votes: " + responseData.candidates[i].votes ;
        li.append(form);
        ul.append(li);
      }
      showDiv.append(ul);

      ul.addEventListener('submit', function(e) {
        e.preventDefault();
        form = e.target
        input = form.querySelector('input');
        $.ajax({
          url: form.action,
          method: 'POST',
          data: $(form).serialize()
        }).done(function(responseData) {
          imReadyButton.click();
        });
      });
    });
  });
});
