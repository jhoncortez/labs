document.querySelector('#AJAX-add-form').addEventListener('submit', addSubmit);

function addSubmit(ev) {
    ev.preventDefault();

    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', addUserResponse);

    xhr.open('POST','/addUser', true);

    xhr.onprogress = ()  => console.log('lodading...');

    xhr.send(new FormData(this));

 }

 function addUserResponse() {

    console.log(this.responseText);

    let data = JSON.parse(this.responseText);

    let resultDiv = document.querySelector('#result');

    if (this.status == 200){

        if (data.response.error == 1 ) {
            resultDiv.classList.remove("div-success");
            resultDiv.classList.add("div-error");
        }
        else {
            resultDiv.classList.remove("div-error");
            resultDiv.classList.add("div-success");
        }

        resultDiv.innerText = data.response.text;
    }
    else if (this.status == 404) {
        resultDiv.innerHTML = "Error: url not found";
    }
    
    
  }
