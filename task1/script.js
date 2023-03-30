const myForm = document.querySelector("#myForm");
const userWrap = document.querySelector("#userWrap");
const singleData = document.querySelector("#singleData");
const editData = document.querySelector('#edit')

const heads = ["name", "age", "email", "Sutue"];

const readFromStorage = (key = `tasks`) =>
  JSON.parse(localStorage.getItem(key)) || [];
const writeToStorage = (data, key = `tasks`) =>
  localStorage.setItem(key, JSON.stringify(data));

const userObjCreator = (myForm) => {
  const user = { id: Date.now() };
  heads.forEach((h) => (user[h] = myForm.elements[h]));
  return user;
};

const addUser = (user) => {
  const allUsers = readFromStorage("users");
  allUsers.push(user);
  writeToStorage(allUsers, "users");
};

function createMyOwnElement(ele, parent, txt = null, classes = null) {
  const myElement = document.createElement(ele);
  parent.appendChild(myElement);
  if (txt) myElement.textContent = txt;
  if (classes) myElement.classList = classes;
  return myElement;
}

if (myForm) {
  myForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const user = userObjCreator(myForm);
    addUser(user);
    window.location = "index.html";
  });
}
const deleteMyElement = (allUsers, i) => {
  allUsers.splice(i, 1);
  writeToStorage(allUsers, "users");
  drawData();
};
const drawData = () => {
  userWrap.innerHTML = "";
  const allUsers = readFromStorage("users");
  allUsers.forEach((user, i) => {
    const tr = createMyOwnElement("tr", userWrap);
    createMyOwnElement("td", tr, user.id);
    createMyOwnElement("td", tr, user.name);
    createMyOwnElement("td", tr, user.email);
    createMyOwnElement("td", tr, user.age);
    const td = createMyOwnElement("td", tr);

    const delBtn = createMyOwnElement(
      "button",
      td,
      "Delete",
      "mx-2 btn btn-danger"
    );
    delBtn.addEventListener("click", (e) => deleteMyElement(allUsers, i));
    // const showBtn = createMyOwnElement(
    //   "button",
    //   td,
    //   "Show",
    //   "mx-2 btn btn-primary"
    // );
    showBtn.addEventListener("click", () => {
      localStorage.setItem("index", i);
      window.location = "single.html";
    });

    
    
      editBtn.addEventListener(`click`, (e) => {
      e.preventDefult();
      console.log('edit btn');
      localStorage.setItem("edit", i);
      const edit = localstorage.getItem("edit");
      const ed = readFromStorage('users');
      let state = ed[edit].Sutue;
      console.log(Sutue);
      if (state === "deactive") {
        Sutue.textContent = "active";
        Sutue.style.color = "blue";
        ed[edit].Sutue = "active";
      } else if (Sutue === "active") {
        Sutue.textContent = "deactive";
        Sutue.style.color = "red";
        ed[edit].status = "deactive";
      } else {
        Sutue.textContent = "not have status";
        Sutue.style.color = "green";
      }
      writeToStorage(ed, "users");
    });
    const editBtn = createMyOwnElement(
      "button",
      td,
      "Edit",
      "mx-2 btn btn-warning"
    );
  });
};

// if (userWrap) {
//   drawData();
// }

if (singleData) {
  const index = localStorage.getItem("index");
  const allUsers = readFromStorage("users");
  createMyOwnElement("p", singleData, allUsers[index].name);
}
if (userWrap) {
  drawData();
}
