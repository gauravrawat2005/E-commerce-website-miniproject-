let url="https://dummyjson.com/products?limit=500"
fetch(url)
.then((res)=>{
    console.log(res)
    return res.json()

})
.then((data)=>{
    data.products.map((el)=>{
        console.log(el.title);
        let outerdiv=document.createElement("div")
        outerdiv.style.border="2px solid black";
        outerdiv.style.height="600px";
        outerdiv.style.width="250px";
        outerdiv.style.padding="20px";
       outerdiv.style.margin="20px";
        outerdiv.style.display="flex";
        outerdiv.style.flexDirection="column";
        outerdiv.style.alignItems="center";
        //  outerdiv.style.display="grid";
        outerdiv.style.borderRadius="35px";
        outerdiv.style.backgroundColor="rgba(244, 11, 11, 0.43)";

        let mainbox=document.querySelector(".main")
        mainbox.style.display="grid";
        mainbox.style.padding="20px";
        mainbox.style.gridTemplateColumns="repeat(auto-fit, minmax(320px,1fr))";
        mainbox.style.justifyItems="Center";
        mainbox.style.backgroundColor="cadetblue";
        mainbox.append(outerdiv);

        let title=document.createElement("h3")
        title.innerText=el.title;
        outerdiv.append(title)

        let image= document.createElement("img")
        image.src=el.thumbnail;
        outerdiv.append(image)


        let description=document.createElement("p")
        description.innerText=el.description;
        outerdiv.append(description)

       let innerdiv=document.createElement("div")
       innerdiv.style.display="flex";
       innerdiv.style.textAlign="center";
       innerdiv.style.borderRadius="20px";
       innerdiv.style.flexDirection="columns";
       innerdiv.style.justifyContent="space-Between";

        outerdiv.append(innerdiv)

         //let innerdiv=document.querySelector("div")

        let prize=document.createElement("p")
        prize.innerText= `Rs .${Math.ceil(el.price)*95}/-`;
        prize.style.textDecorationColor="red";
        innerdiv.appendChild(prize)


        let  kart=document.createElement("button")
        kart.style.padding="10px,20px";
        kart.style.marginLeft="150px";
        kart.style.borderRadius="20px";
        kart.style.backgroundColor="green";
        kart.style.width="100px";
        kart.innerText="Add to kart";


        kart.addEventListener("click", (e)=>{
            e.stopPropagation();
            let kartItems = JSON.parse(localStorage.getItem("kart")) || [];

            let exist = kartItems.find((item)=>item.id === el.id);

            if(exist)
            {
                exist.quantity += 1;
            }else
            {
                el.quantity = 1;
                kartItems.push(el);
            }
            localStorage.setItem("kart",JSON.stringify(kartItems));

            alert("Product Added Successfully");
        })
        
       innerdiv.appendChild(kart);

        



    })
})
.catch((err)=>{
    console.log(err)
})
