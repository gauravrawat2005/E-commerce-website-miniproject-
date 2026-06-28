let url="https://dummyjson.com/products?limit=500"
fetch(url)
.then((res)=>{
    console.log(res)
    return res.json()

})
  .then((data)=>{
    data.products.map((el)=>{
        console.log(el.title)

        let outerdiv=document.createElement("div");
        
        outerdiv.style.border="2px solid black";
        outerdiv.style.height="600px";
        outerdiv.style.width="450px";
        outerdiv.style.borderRadius="40px";
        outerdiv.style.alignItems="center";
        outerdiv.style.display="flex";
        outerdiv.style.flexDirection="column";
        outerdiv.style.justifyContent="center";
        outerdiv.style.display="grid";
        outerdiv.style.textAlign="center";
        outerdiv.style.backgroundColor="rgb(456,222,192)";


    
      outerdiv.addEventListener("click", () => {
    window.location.href = `PDetail.html?id=${el.id}`;
});

        

         let mainbox = document.getElementById("main-box");
        mainbox.append(outerdiv);

        mainbox.style.display="grid";
        mainbox.style.gridTemplateColumns="repeat(auto-fit, minmax(320px, 1fr))";
        mainbox.style.gap="100px";
        mainbox.style.padding="30px";
        mainbox.style.margin="30px";
        mainbox.style.justifyItems="center"; 
        
        
        
        let title=document.createElement("h2")
        title.innerText=el.title;
        outerdiv.append(title)

        let image=document.createElement("img")
        image.src=el.thumbnail;
        outerdiv.append(image)

        let description=document.createElement("p");
        description.innerText=el.description
        outerdiv.append(description)

       let div=document.createElement("div");
        div.style.display="flex";
        div.style.flexDirection="row";
         div.style.margin="10px";
         outerdiv.append(div);

        let price=document.createElement("p");
        price.innerText=`Rs. ${Math.ceil(el.price) * 95}/-`;
        price.style.color="black";
        price.style.marginLeft="10px";
        
        let cart=document.createElement("button");
        cart.innerText="add to cart";
        cart.style.padding="5px 10px";
        cart.style.marginLeft="250px";
        cart.style.borderRadius="20px";
        cart.style.backgroundColor="pink";
        
        cart.addEventListener("click", (e) => {
        e.stopPropagation();

        let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

        let exist = cartItems.find((item) => item.id === el.id);

        if (exist) {
          exist.quantity += 1;
        } else {
          el.quantity = 1;
          cartItems.push(el);
        }

        localStorage.setItem("cart", JSON.stringify(cartItems));

        
      });
        
        div.appendChild(price);
        div.appendChild(cart);

    }); 
  })

  .catch((error)=>{
    console.log(error)
  });