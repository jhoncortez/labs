document.querySelector('#button1').addEventListener('click', loadUser);
document.querySelector('#button2').addEventListener('click', loadUsers);
document.querySelector('#reset-btn').addEventListener('click', resetDiv);

function loadUser() 
{
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/static/ajax2/JSON/user.json', true);

    // ES5 Synthax
    /*xhr.onprogress =  function () {
        console.log('loading user data...');
    } */

    // ES6 SYNTHAX
    xhr.onprogress = () => console.log('loading user data...');
    

    // ES6 SYNTHAX
    xhr.onload = (event) => {
        // get XMLHttpRequest from ProgressEvent
        let request = event.target;

        if (request.status == 200) 
        {
            console.log('User data loaded...');
            console.log('Parsing data to JSON...');
            let user = JSON.parse(request.responseText);

            console.log('append adata to div #user');
            let output = '';

            /*
            // using ES5 Syntax 
            output += '<ul>'+
            '<li>ID: '+user.id+'</li>'+
            '<li>Name: '+user.name+'</li>'+
            '<li>Email: '+user.email+'</li>'+
            '</ul>';
            */

            // using ES6 Syntax
            output = `
            <ul>
                <li>ID: ${user.id}</li>
                <li>Name: ${user.name}</li>
                <li>ID: ${user.email}</li>
            </ul>
            `

            document.querySelector('#user').innerHTML = output;
            
        }
        else if (request.status == 404)
        {
            console.log('File not found. please create the file user.json and try later');
        }
    }

    xhr.send();
}

function loadUsers() 
{
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/static/ajax2/JSON/users.json', true);

    // ES5 Synthax
    /*xhr.onprogress =  function () {
        console.log('loading user data...');
    } */

    // ES6 SYNTHAX
    xhr.onprogress = () => console.log('loading user data...');
    

    // ES6 SYNTHAX
    xhr.onload = (event) => {
        // get XMLHttpRequest from ProgressEvent
        let request = event.target;

        if (request.status == 200) 
        {
            console.log('User data loaded...');
            console.log('Parsing data to JSON...');
            let users = JSON.parse(request.responseText);

            console.log('append adata to div #users');
            let output = '';

            
            // using ES5 Syntax 
            /*for (var i in users) {
                output += '<ul>'+
                '<li>ID: '+users[i].id+'</li>'+
                '<li>Name: '+users[i].name+'</li>'+
                '<li>Email: '+users[i].email+'</li>'+
                '</ul>';
                
            }*/
            

            // using ES6 Syntax
            for (let user of users) 
            {
                output += `
                            <ul>
                                <li>ID: ${user.id}</li>
                                <li>Name: ${user.name}</li>
                                <li>ID: ${user.email}</li>
                            </ul>
                            `
            }
            
            

            document.querySelector('#users').innerHTML = output;
            
        }
        else if (request.status == 404)
        {
            console.log('File not found. please create the file users.json and try later');
        }
    }

    xhr.send();
}

function resetDiv(){
    document.querySelector("#user").innerHTML = "<pre>**the user info will appear here**</pre>";
    document.querySelector("#users").innerHTML = "<pre>**the users will appear here**</pre>";
}