
var selectedRow = null;
function showAlert(message, className) {
  const div = document.createElement("div");
  div.className = `alert alert-${className}`;

  div.appendChild(document.createTextNode(message));
  const container = document.querySelector(".container");
  const main = document.querySelector(".main");
  container.insertBefore(div, main);
  setTimeout(() => document.querySelector(".alert").remove(), 3000);
}
// **********

// *************
// clear data
function clearfields() {
  document.querySelector("#id").value = "";
  document.querySelector("#name").value = "";
  document.querySelector("#age").value = "";
}
// add data
document.querySelector("#user-form").addEventListener("submit", (e) => {
  e.preventDefault();
  // getform value
  const id = document.querySelector("#id").value;
  const name = document.querySelector("#name").value;
  const age = document.querySelector("#age").value;

  //   validate
  if (id == "" || name == "" || age == "") {
    showAlert("please fill all fields", "danger");
  } else {
    if (selectedRow == null) {
      const list = document.querySelector("#user-list");
      const row = document.createElement("tr");

      row.innerHTML = ` 
        <td>${id}</td>
        <td>${name}</td>
        <td>${age}</td>
        <td>
                  <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                  <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
                  <a href="#" class="btn btn-primary btn-sm primary">show</a>
        
        `;
      list.appendChild(row);
      selectedRow = null;
      showAlert("user add data", "success");
    } else {
      selectedRow.children[0].textContent = id;
      selectedRow.children[1].textContent = name;
      selectedRow.children[2].textContent = age;
      selectedRow = null;
      showAlert("user edit data", "info");
    }
    clearfields();
  }
});


// edit data
document.querySelector("#user-list").addEventListener("click", (e) => {
  target = e.target;
  if (target.classList.contains("edit")) {
    selectedRow = target.parentElement.parentElement;
    selectedRow = target.parentElement.parentElement;
    document.querySelector("#id").value = selectedRow.children[0].textContent;
    document.querySelector("#name").value = selectedRow.children[1].textContent;
    document.querySelector("#age").value = selectedRow.children[2].textContent;
  }
});

// delet
document.querySelector("#user-list").addEventListener("click", (e) => {
  target = e.target;
  if (target.classList.contains("delete")) {
    target.parentElement.parentElement.remove();
    showAlert("user  deleted data", "danger");
  }
});

// *****

