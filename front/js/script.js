fetch("http://localhost:3000/api/products")
  //Catch data i need from the api 
  .then(data =>data.json())
  .then(products =>{


  products.forEach(product => {
    
  
    createProductsCardName(product);

  
    //Create the loop to insert all the elements i need
  });
  })


  let listeProducts = document.getElementById('items');

/*This Function is here to create all the elements i need on my index page*/
/*All the JS elements have their own description to make the code more understandble*/
/*My Function call all i need from the API*/
function createProductsCardName (product) {
  
  let lien = document.createElement('a');
  lien.href = "./product.html?id=" + product['_id'];
  //create constant link i need 

  let article = document.createElement('article');
  //Create constant article who gonna contein all my elements 


  let productsImg = document.createElement('img');
  productsImg.setAttribute('src', product ["imageUrl"]);
  productsImg.setAttribute('alt', product["altText"]);
  /*Gave the attribute src to my image, to indicated the image URL*/
  /*Create contant productsImg who gonna return the img*/
  /*Gave an alt attribute, who gonna contein the description of pictures*/


  let productsName = document.createElement('h3');
  productsName.classList.add('productsName');
  productsName.textContent = product["name"];
  /*Create the constant H3 i need in my article*/
  /*Add a class to my H3*/
  /*Ask to go find the article name in "name"*/

  
  let productsDescription = document.createElement('p');
  productsDescription.classList.add('productDescription');
  productsDescription.textContent = product["description"];
  /*Create constant P element i need to make description*/
  /*Add a class to my P element*/
  /*and catch her in "description"*/


  article.appendChild(productsImg);

  article.appendChild(productsName);

  article.appendChild(productsDescription);

  lien.appendChild(article);

  listeProducts.appendChild(lien);
  //Create all the elements

}






