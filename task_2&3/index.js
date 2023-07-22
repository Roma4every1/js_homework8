const renderUserList = () => {
  userList.innerHTML = "";
  data.forEach((item) => {
    userList.innerHTML += `
  <li class="user-card" id=${item.id}>
  <p>Title: ${item.title}</p>
  <p>Description: ${item.description}</p>
  <p class="card-buttons">
  <button class="edit-button">Edit</button>
  <button class="del-button">Delete</button>
  </p>
  </li>
  `;
  });
};

let data = [];
const form = document.querySelector("form");
const submitBtn = document.querySelector("#submit-btn");
const userList = document.querySelector("#user-list");

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const title = document.querySelector("#title");
  const description = document.querySelector("#description");
  const user = {
    id: Date.now(),
    title: title.value,
    description: description.value,
  };
  data.push(user);
  renderUserList();
  form.reset();
});

userList.addEventListener("click", (event) => {
  if (event.target.classList.contains("del-button")) {
    const li = event.target.closest(".user-card");
    const userId = +li.id;
    data = data.filter((item) => item.id !== userId);
    renderUserList();
  }
});

const editBtn = document.querySelector(".edit-btn");
userList.addEventListener("click", (event) => {
  if (event.target.classList.contains("edit-button")) {
    const editButtons = document.querySelectorAll(".edit-button");
    editButtons.forEach((button) => {
      if (button !== editBtn) {
        button.setAttribute("disabled", true);
      }
    });
    const li = event.target.closest(".user-card");
    const userId = +li.id;
    let index = data.findIndex((item) => item.id == userId);
    li.innerHTML = "";
    li.innerHTML = `<form id="edit-form">
 <h3 style="text-align:center; color:red;">Edit</h3>
 <input id="title-edit" type="text"  value="${data[index].title}">
 <input id="description-edit" type="text" value="${data[index].description}">
   <button type="submit" class="save-btn">Save</button></form>
 `;
    const editForm = document.querySelector("#edit-form");
    const titleEdit = document.querySelector("#title-edit");
    const descriptionEdit = document.querySelector("#description-edit");
    const saveBtn = document.querySelector(".save-btn");
    editForm.addEventListener("submit", (event) => {
      event.preventDefault();
      editButtons.forEach((button) => {
        button.removeAttribute("disabled");
      });
      const updatedUser = {
        id: userId,
        title: titleEdit.value,
        description: descriptionEdit.value,
      };
      data[index] = updatedUser;
      renderUserList();
      editForm.remove();
    });
  }
});
