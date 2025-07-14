const togglePassword =document.querySelector("#eye");
const password = document.querySelector("#loginPassword");

  togglePassword.addEventListener("click", function(){
    this.classList.toggle("fa-eye-slash");
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
  })


document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();

  const enteredPassword = document.getElementById("loginPassword").value;
  
  const user = JSON.parse(localStorage.getItem(email));
  if (!user || user.password !== enteredPassword) {
    alert("Invalid credentials");
    return;
  }
  localStorage.setItem("loggedInUser", email);
  window.location.href = "dashboard.html";
}); 