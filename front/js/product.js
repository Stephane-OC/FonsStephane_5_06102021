const queryString_url_id = window.location.search;
/** This const is to find a query string who contain '?' **
**  Which is followed by URL parameter                   **
**  In this case the "id" parameter                     **/

const urlSearchParams = new URLSearchParams(queryString_url_id);
/*  This const is here to define i'm gonna work with  **
**  In this case that will be for my 'get' method    **/

const id = urlSearchParams.get("id");
//This const is here to gonna catch the "id"

const colorChoice = document.getElementById("colors");

const itemsName = document.getElementById("title");

const itemsPrice = document.getElementById("price");






fetch("http://localhost:3000/api/products/" + id) 
//Catch data i need from the api 

.then(data =>data.json())
.then(product=>{

    /** Gave the attribute src to my image, to indicated the image URL        **
    **  Create content productsImg who gonna return the img                   **
    **  Gave an alt attribute, who gonna contein the description of pictures **/

    let conteinerImg = document.getElementsByClassName('item__img');
    let itemImg = document.createElement('img');
    itemImg.setAttribute('src', product.imageUrl);
    itemImg.setAttribute('alt', product.altTxt);
    conteinerImg[0].appendChild(itemImg);

    /** Catch the Id "title"                                     **
    **  Ask to take the name of the products in product "name"  **/ 

    let itemName = document.getElementById('title');
    itemName.textContent = product.name;
 
    /*  Catch itemPrice in product "price"                         **
    **  Ask to take the price of the products in product "price"  **/

    let itemPrice = document.getElementById('price');
    itemPrice.textContent = product.price;

    /** Catch ID description from P element                    **
    **  Catch the Elements from "product" description i need  **/

    let itemDescription = document.getElementById('description');  
    itemDescription.textContent = product.description;


    let productName = product["name"];

    let productPrice = product["price"];

    let productQuantity = document.getElementById('quantity');


  /** Here i make a loop "forEach"                                           **
  **  that will be usefull for all the values who can be in the option value **
  **  in here we have a different number of option value                     */

  product.colors.forEach(color=>{

    let colorOption = document.createElement('option');
    colorOption.setAttribute("value", color);
    colorOption.textContent = color;
    
    colorChoice.appendChild(colorOption);
  
  });


//Here is the selection of the id of my button
const btnCart = document.getElementById("addToCart");  
const cartName = "products";


//The EventListener to make everything i need to happen 
btnCart.addEventListener("click", (event)=>{

  //Then i make in "event" preventDefault so that wont refresh the page on click
  event.preventDefault();

  function addToCart() {


    let color = colorChoice.value;
  
    let name = productName;
  
    let price = productPrice;
  
    let quantity = productQuantity.value;

    let imageUrl = product.imageUrl;

    let altTxtS = product.altTxt;


    //Function for the pop up when a product is added in the cart
    const popupConfirm = () => {
    if(window.confirm(`${name} Couleur: ${color} à bien été ajouté au panier
      Consulter le panier OK ou revenir à l'acceuil ANNULER`)){
        window.location.href = "cart.html";
      }
      
      else{
        window.location.href = "index.html";
      }
  }

    // Here i create an object of my product to add with all the data i need
  
    const productToAdd = {
      id : id,
      name : name,
      price : price,
      color: color,
      quantity: quantity,
      imageUrl: imageUrl,
      altTxt: altTxtS
    };
    
    // Catching the cart from Local Storage 
    // If Cart is Empty i build a empty board 
    const currentCart = JSON.parse(localStorage.getItem(cartName)) ?? [];

    // Catching the Index of the product who have the Id and the color of the product to add
    const itemIndex = currentCart.findIndex((item) =>
            item.id === productToAdd.id && item.color === productToAdd.color
    );

    // if product not found that return -1
    if (itemIndex !== -1) {
      
      /* I Update my cart by adding the qte to add to the quantity of the product who   **
      ** already exist in the cart                                                     **/
      const qty = parseInt(currentCart[itemIndex].quantity);

      const qtyAdd = parseInt(productToAdd.quantity);

      currentCart[itemIndex].quantity = qty + qtyAdd;
      popupConfirm ();

    } 
    
    else {
      // Adding of the product in the cart 
      currentCart.push(productToAdd);

      popupConfirm();
    }
    
    // Update of the Local Storage
    localStorage.setItem(cartName, JSON.stringify(currentCart));
  }

  addToCart();

  })
});
