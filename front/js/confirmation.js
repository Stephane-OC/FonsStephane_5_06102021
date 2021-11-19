function getOrderId() {
  const idLocation = document.querySelector("#orderId");
  const recupUrl = window.location.search;
  const recupOrderId = new URLSearchParams(recupUrl);
  const orderIdInUrl = recupOrderId.get("name");
  idLocation.textContent = orderIdInUrl;
}
getOrderId();