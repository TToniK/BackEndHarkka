const uri = 'api/Users';
let users = [];

function getUsers() {
    fetch(uri, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'ApiKey': 'KASDKJNFADLKJBASDKLJF'
        }
    })
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

function addUser() {
    const addFirstNameTextbox = document.getElementById('add-firstname');
    const addLastNameTextbox = document.getElementById('add-lastname');
    const addEmailTextbox = document.getElementById('email');
    const addPasswordTextbox = document.getElementById('psw');

    alert("Registeration successful !");

    const item = {
        firstname: addFirstNameTextbox.value.trim(),
        lastname: addLastNameTextbox.value.trim(),
        email: addEmailTextbox.value.trim(),
        password: addPasswordTextbox.value.trim()
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'ApiKey': 'KASDKJNFADLKJBASDKLJF'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getUser();
            addFirstNameTextbox.value = '';
            addLastNameTextbox.value = '';
            addEmailTextbox.value = '';
            addPasswordTextbox.value = '';

        })
        .catch(error => console.error('Unable to add item.', error));
}

function displayUsers() {
    const item = users.find(item);

    document.getElementById('add-firstname').value = item.firstname;
    document.getElementById('add-lastname').value = item.lastname;
    document.getElementById('email').value = item.email;
    
    document.getElementById('editForm').style.display = 'block';
}

/*function _displayItems(data) {
    const tBody = document.getElementById('users');
    tBody.innerHTML = '';


    data.forEach(item => {

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let firstNode = document.createTextNode(item.firstname);
        td1.appendChild(firstNode);

        let td2 = tr.insertCell(1);
        let lastNode = document.createTextNode(item.lastname);
        td2.appendChild(lastNode);

        let td3 = tr.insertCell(2);
        let emailNode = document.createTextNode(item.email);
        td3.appendChild(emailNode);

    });*/