const uri = 'api/Messages';
let todos = [];

function getItems() {
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



function addItem() {
    const addNameTextbox = document.getElementById('add-name');
    var dt = new Date();
    document.getElementById("datetime").innerHTML = (("0" + (dt.getMonth() + 1)).slice(-2)) + "/" + (("0" + dt.getDate()).slice(-2)) + "/" + (dt.getFullYear()) + " " + (("0" + dt.getHours() + 1).slice(-2)) + ":" + (("0" + dt.getMinutes() + 1).slice(-2));
    //var addDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    //const addDate = document.getElementById('add-date');
    //const addDescriptionTextbox = document.getElementById('add-description');
    //var addDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    //const addDate = document.getElementById('date')
    //const addPrivate = document.getElementById('add-deadline');


    const item = {
        //isComplete: false,
        name: addNameTextbox.value.trim(),
        dt1: dt.getTime().toString
        //description: addDescriptionTextbox.value.trim(),
        //deadline: addDeadline.value
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
            getItems();
            addNameTextbox.value = '';
            //addDescriptionTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
}


function deleteItem(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'ApiKey': 'KASDKJNFADLKJBASDKLJF'
    },
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
    const item = todos.find(item => item.id === id);

    document.getElementById('edit-name').value = item.name;
    document.getElementById('edit-id').value = item.id;
    //document.getElementById('edit-isComplete').checked = item.isComplete;
    document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
    const itemId = document.getElementById('edit-id').value;
    const item = {
        id: parseInt(itemId, 10),
        name: document.getElementById('edit-name').value.trim(),
        
    };

    fetch(`${uri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'ApiKey': 'KASDKJNFADLKJBASDKLJF'
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));

    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
    const name = (itemCount === 1) ? 'messages' : 'message';

    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {
    const tBody = document.getElementById('todos');
    tBody.innerHTML = '';

    _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {
        let isCompleteCheckbox = document.createElement('input');
        isCompleteCheckbox.type = 'checkbox';
        isCompleteCheckbox.disabled = true;
        isCompleteCheckbox.checked = item.isComplete;

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

        /*let ts = Date.now();

        let date_ob = new Date(ts);
        let date = date_ob.getDate();
        let month = date_ob.getMonth() + 1;
        let year = date_ob.getFullYear();
        let today = year + "-" + month + "-" + date;*/




        let tr = tBody.insertRow();

        //let td1 = tr.insertCell(0);
        //td1.appendChild(isCompleteCheckbox);

        let td1 = tr.insertCell(0);
        let textNode = document.createTextNode(item.name);
        td1.appendChild(textNode);

        //let td3 = tr.insertCell(2);
        //let descrNode = document.createTextNode(item.description);
        //td3.appendChild(descrNode);

        //let td4 = tr.insertCell(3);
        //let deadlineNode = document.createTextNode(item.deadline);
        //td4.appendChild(deadlineNode);

        let td5 = tr.insertCell(1);
        td5.appendChild(editButton);

        let td6 = tr.insertCell(2);
        td6.appendChild(deleteButton);

        let td4 = tr.insertCell(3);
        let dateNode = document.createTextNode(item.dt1);
        td4.appendChild(dateNode);
    });

    todos = data;
}