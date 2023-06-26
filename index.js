const baseURL =
  "https://crudcrud.com/api/57063e16d75a4a07a7710b97b84ade85/itemData";

const form = document.getElementById("itemform");
const itemList = document.getElementById("item-list");
const msg = document.getElementById("msg");

const buyItem = (e) => {
  let ele = e.target;
  const li = ele.parentElement;
  const name = li.querySelector(".span-name").textContent;
  const desc = li.querySelector(".span-desc").textContent;
  const price = li.querySelector(".span-price").textContent;
  let qty = li.querySelector(".span-qty").textContent;
  const uid = li.id;
  let count = 0;
  if (ele.classList.contains("1")) {
    count = 1;
    qty -= 1;
  } else if (ele.classList.contains("2")) {
    count = 2;
    qty -= 2;
  } else if (ele.classList.contains("3")) {
    count = 3;
    qty -= 3;
  }
  let itemDetails = {
    name: name,
    desc: desc,
    price: price,
    qty: qty,
  };
  if (qty >= 0) {
    axios
      .put(`${baseURL}/${uid}`, itemDetails)
      .then(() => {
        getItems();
        msg.textContent = `Bought ${name} of qty: ${count}`;
        msg.className = "success";
        setTimeout(() => {
          msg.className = "";
          msg.textContent = "";
        }, 3000);
      })
      .catch((err) => {
        msg.textContent = `Something went wrong: ${err.message}`;
        msg.className = "error";
        setTimeout(() => {
          msg.className = "";
          msg.textContent = "";
        }, 3000);
      });
  } else {
    msg.textContent = `Low stock please order or buy less`;
    msg.className = "error";
    setTimeout(() => {
      msg.className = "";
      msg.textContent = "";
    }, 3000);
  }
};

const showItemList = (data) => {
  const name = data.name;
  const uid = data._id;
  const desc = data.desc;
  const price = data.price;
  const qty = data.qty;

  // create all the required elements
  const li = document.createElement("li");
  const nameSpan = document.createElement("span");
  const descSpan = document.createElement("span");
  const priceSpan = document.createElement("span");
  const qtySpan = document.createElement("span");
  const priceLabel = document.createElement("span");
  const qtyLabel = document.createElement("span");
  const buy1 = document.createElement("button");
  const buy2 = document.createElement("button");
  const buy3 = document.createElement("button");

  // insert required classnames and ids
  li.id = uid;
  li.className = "list-group-item";
  nameSpan.className = "span-name";
  descSpan.className = "span-desc";
  priceSpan.className = "span-price";
  qtyLabel.className = "qty-label";
  qtySpan.className = "span-qty";
  buy1.className = "btn btn-warning btn-sm buy 1";
  buy2.className = "btn btn-warning btn-sm buy 2";
  buy3.className = "btn btn-warning btn-sm buy 3";

  //add event listeners on buy buttons
  buy1.addEventListener("click", buyItem);
  buy2.addEventListener("click", buyItem);
  buy3.addEventListener("click", buyItem);

  // insert data
  nameSpan.appendChild(document.createTextNode(name));
  descSpan.appendChild(document.createTextNode(desc));
  priceLabel.appendChild(document.createTextNode(`Price: ₹`));
  priceSpan.appendChild(document.createTextNode(price));
  qtyLabel.appendChild(document.createTextNode("Qty:"));
  qtySpan.appendChild(document.createTextNode(qty));
  buy1.appendChild(document.createTextNode("Buy 1"));
  buy2.appendChild(document.createTextNode("Buy 2"));
  buy3.appendChild(document.createTextNode("Buy 3"));
  li.appendChild(nameSpan);
  li.appendChild(descSpan);
  li.appendChild(priceLabel);
  li.appendChild(priceSpan);
  li.appendChild(qtyLabel);
  li.appendChild(qtySpan);
  li.appendChild(buy3);
  li.appendChild(buy2);
  li.appendChild(buy1);

  //append to the list
  itemList.appendChild(li);
};

const getItems = () => {
  axios
    .get(baseURL)
    .then((res) => {
      itemList.replaceChildren();
      res.data.forEach((item) => {
        showItemList(item);
      });
    })
    .catch((err) => {
      msg.textContent = `Something went wrong: ${err.message}`;
      msg.className = "error";
      setTimeout(() => {
        msg.className = "";
        msg.textContent = "";
      }, 3000);
    });
};

document.addEventListener("DOMContentLoaded", getItems);

const submitHandler = (e) => {
  e.preventDefault();
  const name = document.getElementById("name");
  const desc = document.getElementById("desc");
  const price = document.getElementById("price");
  const qty = document.getElementById("quantity");

  if (
    name.value === "" ||
    desc.value === "" ||
    price.value === "" ||
    qty.value === ""
  ) {
    msg.textContent = "Please provide all details";
    msg.className = "error";
    setTimeout(() => {
      msg.className = "";
      msg.textContent = "";
    }, 3000);
  } else {
    let itemDetails = {
      name: name.value,
      desc: desc.value,
      price: price.value,
      qty: qty.value,
    };
    axios
      .post(baseURL, itemDetails)
      .then((res) => {
        showItemList(res.data);
        msg.textContent = "Item added successfully";
        msg.className = "success";
        setTimeout(() => {
          msg.className = "";
          msg.textContent = "";
        }, 3000);
      })
      .catch((err) => {
        msg.textContent = `Something went wrong: ${err.message}`;
        msg.className = "error";
        setTimeout(() => {
          msg.className = "";
          msg.textContent = "";
        }, 3000);
      });

    name.value = "";
    desc.value = "";
    price.value = "";
    qty.value = "";
  }
};

form.addEventListener("submit", submitHandler);
