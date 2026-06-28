let cartData = JSON.parse(localStorage.getItem("cart")) || [];

let main = document.getElementById("main-box");

main.style.display = "grid";
main.style.gridTemplateColumns = "repeat(auto-fit,minmax(320px,1fr))";
main.style.gap = "20px";
main.style.padding = "20px";
main.style.justifyItems = "center";


let summaryBox = document.createElement("div");

summaryBox.style.width = "90%";
summaryBox.style.margin = "50px";
summaryBox.style.padding = "20px";
summaryBox.style.background = "white";
summaryBox.style.border = "2px solid black";
summaryBox.style.borderRadius = "15px";
summaryBox.style.display = "flex";
summaryBox.style.justifyContent = "space-between";
summaryBox.style.alignItems = "center";
summaryBox.style.flexWrap = "wrap";


let info = document.createElement("div");

let totalProductText = document.createElement("h2");
let totalPriceText = document.createElement("h2");

totalPriceText.style.color = "red";

info.append(totalProductText, totalPriceText);

let btnDiv = document.createElement("div");
btnDiv.style.display = "flex";
btnDiv.style.gap = "15px";



let buyAll = document.createElement("button");
buyAll.innerText = "Buy All";
buyAll.style.background = "green";
buyAll.style.color = "white";
buyAll.style.padding = "12px 25px";
buyAll.style.border = "none";
buyAll.style.borderRadius = "10px";
buyAll.style.fontSize = "16px";



let removeAll = document.createElement("button");
removeAll.innerText = "Remove All";
removeAll.style.background = "red";
removeAll.style.color = "white";
removeAll.style.padding = "12px 25px";
removeAll.style.border = "none";
removeAll.style.borderRadius = "10px";
removeAll.style.cursor = "pointer";
removeAll.style.fontSize = "16px";

btnDiv.append(buyAll, removeAll);

summaryBox.append(info, btnDiv);

document.body.append(summaryBox);

function display() {
  main.innerHTML = "";

  let totalPrice = 0;
  let totalProduct = 0;

  if (cartData.length === 0) {
    let empty = document.createElement("h1");
    empty.innerText = "Cart is Empty";
    empty.style.marginTop = "100px";

    main.appendChild(empty);

    totalProductText.innerText = "Total Products : 0";
    totalPriceText.innerText = "Total Price : RS. 0";

    return;
  }

  cartData.forEach((el, index) => {
    totalProduct += el.quantity;
    totalPrice += Math.ceil(el.price) * 95 * el.quantity;

    let outer = document.createElement("div");

    outer.style.border = "2px solid black";
    outer.style.width = "350px";
    outer.style.height = "600px";
    outer.style.background = "wheat";
    outer.style.borderRadius = "20px";
    outer.style.display = "flex";
    outer.style.flexDirection = "column";
    outer.style.alignItems = "center";
    outer.style.justifyContent = "center";
    outer.style.cursor = "pointer";

    outer.addEventListener("click", () => {
      window.location.href = `PDetail.html?id=${el.id}`;
    });

    let title = document.createElement("h3");
    title.innerText = el.title;

    let img = document.createElement("img");
    img.src = el.thumbnail;
    img.style.width = "200px";
    img.style.height = "200px";

    let des = document.createElement("p");
    des.innerText = el.description;
    des.style.padding = "10px";
    des.style.textAlign = "justify";
    des.style.margin = "20px 0px";

    let qty = document.createElement("h3");
    qty.innerText = `Quantity : ${el.quantity}`;




    let price = document.createElement("h2");
    price.innerText = `Rs. ${Math.ceil(el.price) * 95 * el.quantity} /-`;
    price.style.color = "red";

    let buttonDiv = document.createElement("div");
    buttonDiv.style.display = "flex";
    buttonDiv.style.gap = "10px";
    buttonDiv.style.marginTop = "10px";

    let buy = document.createElement("button");
    buy.innerText = "Buy";
    buy.style.background = "green";
    buy.style.color = "white";
    buy.style.padding = "10px 20px";
    buy.style.border = "none";
    buy.style.borderRadius = "10px";
    buy.style.marginTop = "20px";
    buy.style.marginRight = "150px";

    buy.addEventListener("click", (e) => {
      e.stopPropagation();

      alert("Order Placed Successfully");
    });

    let remove = document.createElement("button");
    remove.innerText = "Remove";
    remove.style.background = "red";
    remove.style.color = "white";
    remove.style.padding = "10px 20px";
    remove.style.border = "none";
    remove.style.borderRadius = "10px";
    remove.style.marginTop = "20px";

   
    remove.addEventListener("click", (e) => {
      e.stopPropagation();

      cartData.splice(index, 1);

      localStorage.setItem("cart", JSON.stringify(cartData));

      display();
    });

    buttonDiv.append(buy, remove);

    outer.append(title, img, des, qty, price, buttonDiv);

    main.appendChild(outer);
  });

  totalProductText.innerText = `Total Products : ${totalProduct}`;
  totalPriceText.innerText = `Total Price : Rs. ${totalPrice} /-`;
}

display();

buyAll.addEventListener("click", () => {
  if (cartData.length === 0) {
    alert("Cart is Empty");
    return;
  }

  alert("All Products Purchased Successfully");

  localStorage.removeItem("cart");

  cartData = [];

  display();
});

  removeAll.addEventListener("click", () => {
    if (cartData.length === 0) {
      alert("Cart is Already Empty");
      return;
    }

  localStorage.removeItem("cart");

  cartData = [];

  display();
});