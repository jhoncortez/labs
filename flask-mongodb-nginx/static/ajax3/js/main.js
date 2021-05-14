document.querySelector('#button1').addEventListener('click', loadGithubUers);
document.querySelector('#reset-btn').addEventListener('click', resetDiv);

// load github users
function loadGithubUers(){

    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://api.github.com/users', true);

    xhr.onprogress = () => console.log('loading gitub data..');

    xhr.onload = (event) => {
        const request = event.target;

        if (request.status == 200) 
        {
            console.log('Data loaded..');

            console.log('Parsing JSON Users Data..');
            let users = JSON.parse(request.responseText);

            console.log('Adding users data to div #users');

            let output = '';

            for (let user of users)
            {
                output += `
                    <div id="user-${user.id}" class="user">
                        <img src="${user.avatar_url}" width="70" height="70">
                        <ul class="user-info">
                            <li>ID: ${user.id}</li>
                            <li>UserLogin: <a href="${user.html_url}" target="_blank">${user.login}</a></li>
                            <li><a href="${user.followers_url}" target="_blank">Followers</a></li>
                        </ul>
                    </div>
                `
            }
            document.querySelector('#users').innerHTML = output;
        }
        else if (request.status == 404)
        {
            console.log('File Not Found');
        }
    }

    xhr.send();
}

function resetDiv(){
    document.querySelector("#users").innerHTML = "<pre>**Github users will appear here**</pre>";
}