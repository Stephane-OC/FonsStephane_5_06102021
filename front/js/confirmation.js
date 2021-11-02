function getOrderId() {
  const idLocation = document.querySelector("#orderId");
  const recupUrl = window.location.search;
  const recupOderId = new URLSearchParams(recupUrl);
  const orderIdInUrl = recupOderId.get("name");
  idLocation.textContent = orderIdInUrl;
}
getOrderId();