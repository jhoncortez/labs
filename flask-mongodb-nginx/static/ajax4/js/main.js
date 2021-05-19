document.querySelector('#button1').addEventListener('click', loadLocalUser);

function loadLocalUser(){
    const xhr = new XMLHttpRequest();
    let name = document.querySelector('#name').value;

    console.log(`request data from /user/${name}`);

    xhr.open('GET', `/user/${name}`, true);

    xhr.onprocess = () => console.log('loading...');

    xhr.onload = (event) => {
        const request = event.target;

        if (request.status == 200 ){

            console.log('data loaded...');

            let user = JSON.parse(request.responseText);

            if (Object.keys(user).length > 0) {

                console.log('has data...');

                let output = 
                `

                <div id="user-${user.id}" class="user">
                    <ul class="user-info">
                        <li>Name: ${user.name}</li>
                        <li>lastname: ${user.lastname}</li>
                        <li><a href="/user/${user.name}">Ver usuario</a></li>
                    </ul>
                
                </div>
                `
                console.log('has data...');

                console.log('adding data to div #user');

                document.querySelector('#user').innerHTML = output;

            } else {

                console.log('Has no data...');
                
                document.querySelector('#user').innerHTML = "User not found";
            }
            
        } else if (request.status == 404 ){

            console.log('route not found...');

            document.querySelector('#user').innerHTML = "please type an user in the field";
        }
        //console.log(JSON.parse(request.reponseText));
    }

    xhr.send();
}

document.querySelector('#button2').addEventListener('click', loadLocalUsers);

function loadLocalUsers(){
    const xhr = new XMLHttpRequest();

    console.log(`request data from /users`);

    xhr.open('GET', `/users`, true);

    xhr.onprocess = () => console.log('loading...');

    xhr.onload = (event) => {

        const request = event.target;

        if (request.status == 200 ){

            console.log('data loaded...');

            let users = JSON.parse(request.responseText);
            users = users.data;
            
            if (Object.keys(users).length > 0) {

                console.log('has data...');
                console.log(users);
                let output = '';
                for (let user of users)
                {
                    output += 
                    `
                    <div id="user-${user.id}" class="user">
                        <ul class="user-info">
                            <li>Name: ${user.name}</li>
                            <li>lastname: ${user.lastname}</li>
                            <li><a href="/user/${user.name}">Ver usuario</a></li>
                        </ul>
                    </div>
                    `
                }
                console.log('has data...');

                console.log('adding data to div #users');

                document.querySelector('#users').innerHTML = output;

            } else {

                console.log('Has no data...');
                
                document.querySelector('#users').innerHTML = "User not found";
            }
            
        } else if (request.status == 404 ){

            console.log('route not found...');

            document.querySelector('#users').innerHTML = "please type an user in the field";
        }
        //console.log(JSON.parse(request.reponseText));
    }

    xhr.send();
}