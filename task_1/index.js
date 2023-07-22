
let users = [];
let nextId = 1;


const form = document.querySelector('form');
const nameInput = document.querySelector('#name');
const nameError = document.querySelector('#nameError');
const surnameInput = document.querySelector('#surname');
const surnameError = document.querySelector('#surnameError');
const ageInput = document.querySelector('#age');
const ageError = document.querySelector('#ageError');
const submitButton = document.querySelector('input[type="submit"]');
const userTableBody = document.getElementById('userTableBody');
const deleteAllButton = document.getElementById('deleteAllButton');




function addUserToTable(user) {
userTableBody.innerHTML +=`<tr>
<td>${user.id}</td>
<td>${user.name}</td>
<td>${user.surname}</td>
<td>${user.age}</td>
</tr>`;
}


const validateForm = ()=> {
  let isValid = true;

  if (nameInput.value === '') {
    nameError.innerHTML = '<span style="color:red">error</span>';
    isValid = false;
  } else {
    nameError.textContent = '';
  }

  if (surnameInput.value === '') {
    surnameError.innerHTML = '<span style="color:red">error</span>';
    isValid = false;
  } else {
    surnameError.textContent = '';
  }
  if (ageInput.value === '') {
    ageError.innerHTML = '<span style="color:red">error</span>';
    isValid = false;
  } else {
    ageError.textContent = '';
  }

  return isValid;
}

form.addEventListener('submit', (event) => {
  event.preventDefault(); 
const isValidate = validateForm();
  if (isValidate) { 
    const user = {
      id: nextId,
      name: nameInput.value,
      surname: surnameInput.value,
      age: ageInput.value,
    };
    users.push(user); 
    addUserToTable(user); 
    form.reset();
    nextId++; 
  }
});


deleteAllButton.addEventListener('click', () => {
  users = [];
  userTableBody.innerHTML = ''; 
  nextId = 1; 
});