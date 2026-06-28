let params = new URLSearchParams(window.location.search);
let id = params.get("id");

let url = `https://dummyjson.com/products/${id}`;
fetch(url)
  .then((res) => {
    return res.json();
  })
  .then((product) => {
    console.log(product);

    let main = document.getElementById("main-box");

    main.innerHTML = "";
    main.style.display = "flex";
    main.style.justifyContent = "center";
    main.style.alignItems = "center";
    main.style.padding = "40px";

    let card = document.createElement("div");
    card.style.width = "1250px";
    card.style.display = "flex";
    card.style.gap = "40px";
    card.style.padding = "40px";

    // Product Image
    let img = document.createElement("img");
    img.src = product.thumbnail || product.images[0];
    img.alt = product.title;
    img.style.width = "450px";
    img.style.height = "450px";
    img.style.objectFit = "contain";

    // Right Section
    let right = document.createElement("div");

    let title = document.createElement("h1");
    title.innerText = product.title;
    title.style.fontSize = "30px";
    title.style.fontWeight = "bold";
    title.style.marginTop = "40px";
    title.style.marginBottom = "15px";

    let brand = document.createElement("h2");
    brand.innerText = `Brand : ${product.brand || "N/A"}`;
    brand.style.fontSize = "22px";
    brand.style.marginBottom = "10px";

    let category = document.createElement("h3");
    category.innerText = `Category : ${product.category}`;

    let price = document.createElement("h2");
    price.innerText = `Price : Rs. ${Math.ceil(product.price * 95)} /-`;
    price.style.color = "red";
    price.style.marginTop = "10px";

    let desc = document.createElement("p");
    desc.innerText = product.description;
    desc.style.marginTop = "20px";
    desc.style.lineHeight = "28px";
    desc.style.fontSize = "18px";


    // Cart Button
    let btn = document.createElement("button");
    btn.innerText = "Add To Cart";
    btn.style.marginLeft = "20px";
    btn.style.marginTop = "20px";
    btn.style.background = "green";
    btn.style.color = "white";
    btn.style.padding = "15px 35px";
    btn.style.border = "none";
    btn.style.borderRadius = "8px";
    btn.style.cursor = "pointer";

    btn.addEventListener("click", () => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      let exist = cart.find((item) => item.id === product.id);

      if (exist) {
        exist.quantity += 1;
      } else {
        cart.push({
          ...product,
          quantity: 1,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      alert("Product Added Successfully");
    });

    right.append(
      title,
      brand,
      category,
      price,
      desc,
      btn
    );

    card.append(img, right);
    main.append(card);
  })
  .catch((err) => {
    console.error(err);
  });