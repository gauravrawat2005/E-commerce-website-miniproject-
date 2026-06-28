let params = new URLSearchParams(window.location.search);
let id = params.get("id");

let url = `https://dummyjson.com/products/${id}`;
fetch(url)
  .then((res) => res.json())
  .then((product) => {
    let main = document.getElementById("main-box");
    main.style.display = "flex";
    main.style.justifyContent = "center";
    main.style.alignItems = "center";
    main.style.padding = "30px";

    let card = document.createElement("div");
    card.style.width = "1250px";
    card.style.display = "flex";
    card.style.gap = "40px";
    card.style.padding = "30px";

    let img = document.createElement("img");
    img.src = product.thumbnail;
    img.style.width = "450px";
    img.style.height = "450px";

    let right = document.createElement("div");

    let title = document.createElement("h1");
    title.innerText = product.title;
    title.style.fontSize = "30px";
    title.style.fontWeight = "bold";
    title.style.marginTop = "40px";
    title.style.marginBottom = "15px";

    let brand = document.createElement("h2");
    brand.innerText = `Brand : ${product.brand}`;
    brand.style.fontSize = "22px";
    brand.style.marginBottom = "5px";

    let category = document.createElement("h3");
    category.innerText = `Category : ${product.category}`;
    category.style.fontSize = "20px";
    category.style.marginBottom = "5px";

    let rating = document.createElement("h3");
    rating.innerText = `Rating :  ${Math.floor(product.rating)}/5`;
    rating.style.fontSize = "20px";
    rating.style.marginBottom = "5px";

    let stock = document.createElement("h3");
    stock.innerText = `Stock : ${product.stock}`;
    stock.style.fontSize = "20px";
    stock.style.marginBottom = "5px";

    let discount = document.createElement("h3");
    discount.innerText = `Discount : ${Math.floor(product.discountPercentage)}%`;
    discount.style.fontSize = "20px";
    discount.style.marginBottom = "5px";

    let price = document.createElement("h2");
    price.innerText = `Price : Rs. ${Math.ceil(product.price) * 95} /-`;
    price.style.color = "red";

    let desc = document.createElement("p");
    desc.innerText = product.description;
    desc.style.marginTop = "20px";
    desc.style.lineHeight = "25px";
    desc.style.fontSize = "18px";

    let buybtn = document.createElement("button");
    buybtn.innerText = "Buy Now";
    buybtn.style.marginTop = "20px";
    buybtn.style.background = "green";
    buybtn.style.color = "white";
    buybtn.style.padding = "20px 40px";
    buybtn.style.border = "none";
    buybtn.style.borderRadius = "10px";
    buybtn.style.cursor = "pointer";
    buybtn.style.position = "relative";
    buybtn.style.left = "50px";
    buybtn.style.top = "15px";

    buybtn.addEventListener("click", (e) => {
      e.stopPropagation();

      alert("Order Placed Successfully");
    });

    let btn = document.createElement("button");
    btn.innerText = "Add To Cart";
    btn.style.marginTop = "20px";
    btn.style.background = "blue";
    btn.style.color = "white";
    btn.style.padding = "20px 40px";
    btn.style.border = "none";
    btn.style.borderRadius = "10px";
    btn.style.cursor = "pointer";
    btn.style.position = "relative";
    btn.style.left = "145px";
    btn.style.top = "15px";

    btn.addEventListener("click", () => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      let exist = cart.find((item) => item.id == product.id);

      if (exist) {
        exist.quantity++;
      } else {
        product.quantity = 1;
        cart.push(product);
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      alert("Product Added Successfully");
    });

    right.append(
      title,
      brand,
      category,
      rating,
      stock,
      discount,
      price,
      desc,
      buybtn,
      btn,
    );

    card.append(img, right);

    main.append(card);
  });
  