let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let btn = document.getElementById("btn");
let mode = "create";
let itemDelete;
// total
function getTotal() {
  if (price.value != "") {
    total.innerHTML = ` ${
      +price.value + +taxes.value + +ads.value - +discount.value
    } dh`;
    total.style.backgroundColor = "green";
  } else {
    total.style.backgroundColor = "red";
    total.innerHTML = ` 0 dh`;
  }
}
// create product
// ila kant data fl key array = data dyal key
let dataP;
if (localStorage.prod != null) {
  dataP = JSON.parse(localStorage.prod);
} else {
  dataP = [];
}
create.addEventListener("click", function () {
  let newProduct = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  // count
  if (title.value != "" && newProduct.count <= 100) {
    if (mode === "create") {
      if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; i++) {
          dataP.unshift(newProduct);
        }
      } else {
        dataP.unshift(newProduct);
      }
    } else {
      dataP[itemDelete] = newProduct;
      mode = "create";
      create.innerHTML = "Create";
      count.style.display = "block";
    }
    total.style.backgroundColor = "red";
    // clear inputs when create product
  }
  clearInputs();
  // save products local storage
  localStorage.setItem("prod", JSON.stringify(dataP));

  //read product
  showProduct();
});

function clearInputs() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

//  read products in table
function showProduct() {
  let tbody = "";
  for (let i = 0; i < dataP.length; i++) {
    tbody += `
        <tr>
          <td>${i + 1}</td>
          <td>${dataP[i].title}</td>
          <td>${dataP[i].price}</td>
          <td>${dataP[i].taxes}</td>
          <td>${dataP[i].ads}</td>
          <td>${dataP[i].discount}</td>
          <td>${dataP[i].total}</td>
          <td>${dataP[i].category}</td>
          <td>
          <i onclick="deleteProduct(${i})" id="delete" class="fa-solid fa-trash-can"></i>
          </td>
          <td>
          <i onclick="updateProduct(${i})" id="update" class="fa-solid fa-pencil"></i>
          </td>
        </tr>
        `;
  }
  // hide and show delete button
  document.getElementById("tbody").innerHTML = tbody;
  let btnDeleteAll = document.getElementById("deleteAll");
  if (dataP.length > 0) {
    btnDeleteAll.innerHTML = `<button onclick="deleteAll()" id="delete-all" >Delete All (${dataP.length})</button>`;
  } else {
    btnDeleteAll.innerHTML = "";
  }
}

// showProduct in reload
showProduct();

// delete
function deleteProduct(i) {
  dataP.splice(i, 1);
  localStorage.prod = JSON.stringify(dataP);
  showProduct();
}
// delete all products
function deleteAll() {
  localStorage.clear();
  dataP.splice(0);
  showProduct();
}
// update
function updateProduct(i) {
  title.value = dataP[i].title;
  price.value = dataP[i].price;
  taxes.value = dataP[i].taxes;
  ads.value = dataP[i].ads;
  discount.value = dataP[i].discount;
  count.style.display = "none";
  category.value = dataP[i].category;
  create.innerHTML = "Update";
  mode = "update";
  scrollTo(0, 0);
  getTotal();
  itemDelete = i;
}

// search
let search = document.getElementById("search");
let searchMode = "title";
function getSearchMode(id) {
  if (id == "search-title") {
    searchMode = "title";
  } else {
    searchMode = "category";
  }
  search.placeholder = `Search By ${searchMode.toUpperCase()}`;
  search.focus();
  search.value = "";
  showProduct();
}

function searchProduct(value) {
  let tbody = "";
  for (let i = 0; i < dataP.length; i++) {
    if (searchMode == "title") {
      if (dataP[i].title.toLowerCase().includes(value.toLowerCase().trim())) {
        tbody += `
        <tr>
          <td>${i + 1}</td>
          <td>${dataP[i].title}</td>
          <td>${dataP[i].price}</td>
          <td>${dataP[i].taxes}</td>
          <td>${dataP[i].ads}</td>
          <td>${dataP[i].discount}</td>
          <td>${dataP[i].total}</td>
          <td>${dataP[i].category}</td>
          <td>
          <i onclick="deleteProduct(${i})" id="delete" class="fa-solid fa-trash-can"></i>
          </td>
          <td>
          <i onclick="updateProduct(${i})" id="update" class="fa-solid fa-pencil"></i>
          </td>
        </tr>
        `;
      }
    } else {
      if (dataP[i].category.includes(value.toLowerCase().trim())) {
        tbody += `
        <tr>
          <td>${i + 1}</td>
          <td>${dataP[i].title}</td>
          <td>${dataP[i].price}</td>
          <td>${dataP[i].taxes}</td>
          <td>${dataP[i].ads}</td>
          <td>${dataP[i].discount}</td>
          <td>${dataP[i].total}</td>
          <td>${dataP[i].category}</td>
          <td>
          <i onclick="deleteProduct(${i})" id="delete" class="fa-solid fa-trash-can"></i>
          </td>
          <td>
          <i onclick="updateProduct(${i})" id="update" class="fa-solid fa-pencil"></i>
          </td>
        </tr>
        `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = tbody;
}
// clean data
