/* Function to catch all the informations return by the API   **
** then i catch my ID and i make it appear in my DOM          */


function getOrderId() {
  const idLocation = document.querySelector("#orderId");
  const recupUrl = window.location.search;
  const recupOrderId = new URLSearchParams(recupUrl);
  const orderIdInUrl = recupOrderId.get("name");
  idLocation.textContent = orderIdInUrl;
}
getOrderId();