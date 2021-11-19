// The local Storage and all the rules i need to make it work the good way 
let productLocalStorage = JSON.parse(localStorage.getItem("products"));

  let cartItems = document.getElementById('cart__items');


  /*This Function is here because of the unknown number of products in the cart       **
  **so i can reuse the creation of all elements if i need                             **
  **All the JS elements have their own description to make the code more understandble*/
  const cartProducts = (productStorage, product) => {

    //------Create constant article who gonna contein all my elements------

    let article = document.createElement('article');
    article.classList.add('cart__item'); 
    article.setAttribute( "data-id", productStorage.id);

    let cartDivImg = document.createElement('div');
    cartDivImg.classList.add('cart__item__img');

    let cartImg = document.createElement('img');
    cartImg.setAttribute('src', product["imageUrl"]);
    cartImg.setAttribute('alt', product["altText"]);

    let cartDivContent = document.createElement('div');
    cartDivContent.classList.add('cart__item__content');

    let cartDivContentTitle = document.createElement('div');
    cartDivContentTitle.classList.add('cart__item__content__titlePrice');

    let cartName = document.createElement('h2');
    cartName.textContent = productStorage.name;

    let cartPrice = document.createElement('p');
    cartPrice.textContent = productStorage.price + " €";

    let cartDivSettings = document.createElement('div');
    cartDivSettings.classList.add('cart__item__content__settings');

    let cartDivQuantity = document.createElement('div');
    cartDivQuantity.classList.add('cart__item__content__settings__quantity');

    let cartQuantityP = document.createElement('p');
    cartQuantityP.textContent = "Qté : ";

    let cartQuantityInput = document.createElement('input');
    cartQuantityInput.setAttribute("type","number");
    cartQuantityInput.setAttribute("name","itemQuantity");
   
    cartQuantityInput.classList.add('itemQuantity');
    cartQuantityInput.setAttribute("min","1");
    cartQuantityInput.setAttribute("max","100");
    cartQuantityInput.setAttribute("value", productStorage.quantity);
  
    let cartItemDelete = document.createElement('div');
    cartItemDelete.classList.add('cart__item__content__settings__delete');
   
    let CartDeleteP = document.createElement('p');
    CartDeleteP.textContent = "Supprimer";
    CartDeleteP.classList.add('deleteItem');
    

    //Create all the elements
    article.appendChild(cartDivImg);
    cartDivImg.appendChild(cartImg);
    article.appendChild(cartDivContent);
    cartDivContent.appendChild(cartDivContentTitle);
    cartDivContentTitle.appendChild(cartName);
    cartDivContentTitle.appendChild(cartPrice);
    cartDivContent.appendChild(cartDivSettings);
    cartDivSettings.appendChild(cartDivQuantity);
    cartDivQuantity.appendChild(cartQuantityP);
    cartDivQuantity.appendChild(cartQuantityInput);
    cartDivSettings.appendChild(cartItemDelete);
    cartItemDelete.appendChild(CartDeleteP);
    cartItems.appendChild(article);


    emptyCart();
    qteChange();
    removeItem();
    qteChange();
 
  }

  //--------------------------------Elements off cart-----------------------------


  if (productLocalStorage === null){
    emptyCart();

  } 
  // Loop "forEach" who create all the elements i need in my cart
  else{

  productLocalStorage.forEach(productLocalStorage => {

    
    fetch("http://localhost:3000/api/products/" + productLocalStorage.id) 
      //Catch data i need from the api 

      .then(data =>data.json())
      .then(product=>{

      cartProducts(productLocalStorage, product);
     
    });
  });
}


function emptyCart() {
  if (localStorage.length == 0) {
    let cartEmpty = document.getElementById("cart__items");
    cartEmpty.textContent = "Votre panier est vide ! Pensez à y ajouter un Kanap !"

  }
}
    //--------------------------------Remove Function--------------------------------

  /*Remove Function here i cath up the element of the item i need          **
  **then i created a EventListener on Click                                ** 
  **after that, i use closest to indicated the parent i want to delete     **
  **for the local storage deleted i created another function, this function**
  **is here to pick up my selected element in my local storage by his index**
  **then i created an alert, this way, client have a feedback of deletion **/

  let products = JSON.parse(localStorage.getItem("products"));

  function removeItem() {

    let removeBtn = document.querySelectorAll(".deleteItem");

    for (let i = 0; i < removeBtn.length; i++) {
      removeBtn[i].addEventListener("click", (event) => {
        event.stopImmediatePropagation();

        let articleSupp = removeBtn[i].closest("article");
        
        articleSupp.remove();
        deleteItemSelected(i);
        alert("This Item will be remove from your cart");
        window.location.href = "cart.html";
  
        // Actualising the total amount of item in the cart    
      });
      //This Function 
      function deleteItemSelected(index) {
        products.splice(index, 1);
        localStorage.setItem("products", JSON.stringify(products));
        
      }
    }
  }
  

 
  // Function to send all the informations who are required on click on the button 
  function orderValid() {
    const validBtn = document.querySelector("#order");

    // the formular is send "on click" 
    validBtn.addEventListener("click", (valid) => {
      valid.preventDefault();
      formValid();

      // Sending the formular to the Local Storage, we only get an Order Id if the data are Ok
      if (formValid() == true) {
        getOrderId();
      }
    });
  }
  orderValid();

  //--------------------------------Total Price------------------------------------

  function calculateTotal() {
  let totalCart = [];                                

  //Catch all the prices i need in "totalCart"

  for (let i = 0; i < productLocalStorage.length; i++){
    let priceProductsCart= productLocalStorage[i].price * productLocalStorage[i].quantity;

    totalCart.push(priceProductsCart);

    console.log("Tous les prix stockés dans 'totalCart'", totalCart);
  }

  //Const who make the total off all the prices who are conteins in "totalCart"
  
  const reducer = (accumulator, curentValue) => accumulator + curentValue;

  //If there is no products in the cart, the valor return is "0"
  const totalCartPrice = totalCart.reduce(reducer,0);
  
  console.log("Total Prix Panier", totalCartPrice);

  let totalPrice = document.getElementById('totalPrice');
  totalPrice.textContent = totalCartPrice;
}
  calculateTotal();

  //--------------------------------Total Quantity------------------------------------

  function totalArtQte() {
    let total = 0;
    for (let index in productLocalStorage) {
      const quantity = parseInt(productLocalStorage[index].quantity, 10);
      total += quantity;
    }
    return total;
  }
  const totalQuantity = document.getElementById('totalQuantity');
  totalQuantity.textContent = totalArtQte();


  
    /** Function to decrease quantity of my cart products to a minimum of 1                **
    **  here the Function work "on change" so if the input number change, that will also   ** 
    **  update the number and the price                                                    **
    **  if the Indicated quantity Is less than 1 the product will be remove from the cart **/
    function qteChange() {

      let itemQuantity = document.getElementsByClassName("itemQuantity");

      for  (let item = 0; item < itemQuantity.length; item++) {

        itemQuantity[item].addEventListener("change", (event) => {

            event.stopImmediatePropagation();
            let qteUpdate = parseInt(itemQuantity[item].value);

            products[item].quantity = qteUpdate;
            localStorage.setItem("products", JSON.stringify(products));
            alert("Panier modifier");
            calculateTotal();
            location.reload();
          });
        }  
      }
      qteChange();

  //-------------- The btn with all the instructions for formular send --------------

  const btnSendFormular = document.querySelector(".cart__order__form__submit");
  console.log(btnSendFormular);


    
  function formValid() {  
    //Here is the const to catch all the data's from my formular
    const contact = {

      firstName: document.querySelector("#firstName").value,
      lastName: document.querySelector("#lastName").value,
      address: document.querySelector("#address").value,
      city: document.querySelector("#city").value,
      email: document.querySelector("#email").value

    }


    let products = [];
    for (r = 0; r < products.length; r++) {
      products.push(products[r]._id);
    }

  //--------------------------------Formular Validation--------------------------------    
  
  //First name check with regex
  function firstNameCheck() {

    const firstNameT = contact.firstName;
  
    if (/^[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*$/.test(firstNameT)) {

      return true;

      } else{

        let firstNameErrorMess = document.getElementById('firstNameErrorMsg'); 
        firstNameErrorMess.textContent = ("Le champs Prénom renseigné n'est pas correct !");
        return false;

    };
  };  

  //Last Name check with regex
  function lastNameCheck() {

    const lastNameT = contact.lastName;
  
    if(/^[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*$/.test(lastNameT)) {

      return true;

      } else{        

        let lastNameErrorMess = document.getElementById('lastNameErrorMsg'); 
        lastNameErrorMess.textContent = ("Le champs Nom renseigné n'est pas correct !");
        return false;
        
    };
  };

  //Adress check with regex
  function addressCheck(){

    const addressT = contact.address;
  
    if(/^[a-zA-Z0-9\s]{5,50}$/.test(addressT)) {
      return true;

      } else{
        let adressNameErrorMess = document.getElementById('addressErrorMsg'); 
        adressNameErrorMess.textContent = ("Le champs Adresse renseigné n'est pas correct !"); 
  
        return false;
               
    };
  };

  //City check with regex
  function cityCheck(){

    const cityT = contact.city;
  
    if(/^[a-zA-Z]{3,20}$/.test(cityT)) {
      return true;

      } else{
        let cityNameErrorMess = document.getElementById('cityErrorMsg'); 
        cityNameErrorMess.textContent = ("Le champs Ville renseigné n'est pas correct !"); 

        return false;
            
    };
  };

  //Email Check with regex
  function emailCheck(){

    const emailT = contact.email;
  
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailT)) {
      return true;

      } else{
        let emailNameErrorMess = document.getElementById('emailErrorMsg'); 
        emailNameErrorMess.textContent = ("Le champs Email renseigné n'est pas correct !"); 

        return false;   

      };
  };

  if (firstNameCheck() && lastNameCheck() && addressCheck() && emailCheck() && cityCheck() ){
    return true;
    
  }else {
    alert("Merci de vérifier le formulaire")
  };

}


  /* Function to get the Order Id by sending all the required informations **
  ** here i send the contact and products informations to the API         **/

  function getOrderId() {
    const contact = {
      firstName: document.querySelector("#firstName").value,
      lastName: document.querySelector("#lastName").value,
      address: document.querySelector("#address").value,
      city: document.querySelector("#city").value,
      email: document.querySelector("#email").value,
    };


    let products = [];
    for (r = 0; r < products.length; r++) {
      product.push(products[r]._id);
    }

    const formularSend = {
      contact,
      products,
    };


  /**  Function API POST this Function is here for request a Order ID      **
  **   then i have a responce from the API, who get me back a Order ID     **
  **   if the request is valid                                             **
  **   I use "window.location.href" so all the informations i need will    **
  **   be send to my search bar in my "confirmation" page                 **/

  function sendServer(formularSend) {
    localStorage.setItem("contact", JSON.stringify(contact));

    return fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formularSend),
    })

      .then((response) => response.json())
      .then((order) => {
        localStorage.setItem("orderId", order.orderId);
        window.location.href = "confirmation.html" + "?" + "name" + "=" + order.orderId;
        localStorage.clear();
      })

      .catch((err) => alert("Il y a un problème: ", err));
  }
  sendServer(formularSend);
}
