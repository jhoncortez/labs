// Create Event Listener
document.querySelector('#button').addEventListener('click', loadText);
document.querySelector('#reset-btn').addEventListener('click', resetDiv);

function loadText(){

    //Create XHR Object
    var xhr = new XMLHttpRequest();

    // Open function - type, url/file, async || open the static text file
    xhr.open('GET', '/static/ajax1/text/sampletext.txt',true);
    
    // OPTIONAL - used for loaders
    xhr.onprogress = function(){
        console.log('loading...');
    }

    // Onload property || response after send the request
    xhr.onload = function(){
        if (this.status == 200)
        {
            // saving responseText in text variable
            let text = this.responseText;

            // showing loaded text in console
            console.log('Text loaded: ');
            console.log(text);

            // loading in the text div in dom
            document.querySelector("#text").innerHTML = text;
        }
        else if (this.status == 404) {
            document.querySelector("#text").innerHTML = "File Not found";
        }
    }

    // handling errors
    xhr.onerror = function(){
        console.log('Sorry, thre is an error trying to send the request, please try again.');
    }

    // send request
    xhr.send();


}
function resetDiv(){
    document.querySelector("#text").innerHTML = "<pre>**the text content of sampletext.txt file will appear here**</pre>";
}