function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
function showErrorMessage(message, element) {
  element.textContent = message;
  element.style.color = "red";
  element.style.display = "flex";
}
